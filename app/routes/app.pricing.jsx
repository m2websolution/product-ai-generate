import { useEffect, useState } from "react";
import { Form, useActionData, useLoaderData, useNavigation, useRouteLoaderData } from "react-router";
import {
  Badge,
  Banner,
  BlockStack,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  InlineStack,
  Page,
  Text,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import { AppPageHeader } from "../components/AppPageHeader";
import {
  BILLING_CURRENCY,
  YEARLY_DISCOUNT_MONTHS,
  getExtraCreditPackages,
  getExtraCreditPackage,
  getSubscriptionPlans,
  getSubscriptionPlan,
} from "../lib/billingPlans";
import {
  createExtraCreditPurchase,
  createRecurringSubscription,
  getBillingTestMode,
} from "../lib/billing.server";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const shopData = await db.shop.findUnique({
    where: { shop: session.shop },
    select: {
      credits: true,
      billingPlanKey: true,
      billingPlanName: true,
      billingSubscriptionStatus: true,
    },
  });

  const url = new URL(request.url);
  return {
    credits: shopData?.credits ?? 150,
    currentPlanKey: shopData?.billingPlanKey || "free",
    currentPlanName: shopData?.billingPlanName || "Free",
    billingSubscriptionStatus: shopData?.billingSubscriptionStatus || null,
    billingMessage: url.searchParams.get("message") || "",
    billingSuccess: url.searchParams.get("success") || "",
    subscriptionPlans: getSubscriptionPlans(process.env),
    extraCreditPackages: getExtraCreditPackages(process.env),
    billingTestMode: getBillingTestMode(),
  };
};

export const action = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  const formData = await request.formData();
  const intent = String(formData.get("intent") || "");

  try {
    if (intent === "subscribe") {
      const planKey = String(formData.get("planKey") || "");
      const interval = String(formData.get("interval") || "monthly");
      const plan = getSubscriptionPlan(planKey, process.env);
      if (!plan || plan.price <= 0) {
        return { success: false, message: "Please select a paid subscription plan." };
      }

      const confirmationUrl = await createRecurringSubscription({
        admin,
        request,
        shop: session.shop,
        plan,
        interval,
      });

      if (!confirmationUrl) {
        return { success: false, message: "Shopify did not return a billing approval URL." };
      }
      return { success: true, confirmationUrl };
    }

    if (intent === "buy_credits") {
      const packageKey = String(formData.get("packageKey") || "");
      const creditPackage = getExtraCreditPackage(packageKey, process.env);
      if (!creditPackage) {
        return { success: false, message: "Please select a valid extra credit package." };
      }

      const confirmationUrl = await createExtraCreditPurchase({
        admin,
        request,
        shop: session.shop,
        creditPackage,
      });

      if (!confirmationUrl) {
        return { success: false, message: "Shopify did not return a credit approval URL." };
      }
      return { success: true, confirmationUrl };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Billing request failed.",
    };
  }

  return { success: false, message: "Unknown billing action." };
};

function formatPrice(price) {
  if (Number(price) === 0) return "Free";
  return `$${Number(price).toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(Number(price)) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatCredits(credits) {
  return Number(credits || 0).toLocaleString("en-US");
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="10" cy="10" r="10" fill="#008060" />
      <path d="M6 10.5l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PricingPage() {
  const {
    currentPlanKey,
    currentPlanName,
    billingSubscriptionStatus,
    billingMessage,
    billingSuccess,
    subscriptionPlans,
    extraCreditPackages,
    billingTestMode,
  } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const appData = useRouteLoaderData("routes/app");
  const isSubmitting = navigation.state === "submitting";
  const activeFormData = navigation.formData;
  const activePlanKey = String(activeFormData?.get("planKey") || "");
  const activePackageKey = String(activeFormData?.get("packageKey") || "");
  const bannerMessage = actionData?.message || billingMessage;
  const bannerSuccess =
    typeof actionData?.success === "boolean"
      ? actionData.success
      : billingSuccess === "true"
        ? true
        : billingSuccess === "false"
          ? false
          : null;

  const [billingInterval, setBillingInterval] = useState("monthly");
  const isYearly = billingInterval === "yearly";

  useEffect(() => {
    if (!actionData?.confirmationUrl) return;
    window.open(actionData.confirmationUrl, "_top");
  }, [actionData?.confirmationUrl]);

  return (
    <Page title="Pricing" fullWidth>
      <BlockStack gap="600">
        <AppPageHeader
          title="Pricing"
          description="Choose a plan or top up with one-time credits. Credits renew every 30 days on paid plans."
        />

        {bannerMessage ? (
          <Banner tone={bannerSuccess ? "success" : "critical"}>
            <p>{bannerMessage}</p>
          </Banner>
        ) : null}

        {/* Current balance */}
        <Card>
          <InlineStack align="space-between" blockAlign="center" gap="300" wrap>
            <BlockStack gap="100">
              <Text as="h2" variant="headingMd">Current balance</Text>
              <Text as="p" variant="bodySm" tone="subdued">
                Credits reset every 30 days on paid plans. Manual edits never cost credits.
              </Text>
            </BlockStack>
            <InlineStack gap="200" blockAlign="center">
              <Badge tone="info">{currentPlanName}</Badge>
              {billingSubscriptionStatus ? <Badge>{billingSubscriptionStatus}</Badge> : null}
              <Text as="span" variant="headingLg">
                {formatCredits(appData?.credits)} credits
              </Text>
            </InlineStack>
          </InlineStack>
        </Card>

        {/* Monthly / Yearly toggle */}
        <BlockStack gap="400">
          <BlockStack gap="300">
            <InlineStack align="center" gap="0">
              <div className="pricing-interval-toggle">
                <button
                  type="button"
                  className={`pricing-interval-btn${!isYearly ? " is-active" : ""}`}
                  onClick={() => setBillingInterval("monthly")}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  className={`pricing-interval-btn${isYearly ? " is-active" : ""}`}
                  onClick={() => setBillingInterval("yearly")}
                >
                  Yearly
                  <span className="pricing-interval-save">Save {YEARLY_DISCOUNT_MONTHS} months</span>
                </button>
              </div>
            </InlineStack>

            {billingTestMode ? (
              <InlineStack align="center">
                <Badge tone="attention">Test mode</Badge>
              </InlineStack>
            ) : null}
          </BlockStack>

          {/* Plan cards */}
          <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 5 }}>
            {subscriptionPlans.map((plan) => {
              const isCurrent = plan.key === currentPlanKey;
              const isFree = plan.price <= 0;
              const loading = isSubmitting && activePlanKey === plan.key;
              const displayPrice = isYearly && !isFree
                ? plan.yearlyPrice / 10       // monthly equivalent for yearly
                : plan.price;
              const billedNote = isYearly && !isFree
                ? `$${plan.yearlyPrice}/year`
                : isFree ? "Included after install" : "per month";

              return (
                <Grid.Cell key={plan.key}>
                  <div className={`pricing-plan-card${plan.popular ? " pricing-plan-card--popular" : ""}`}>
                    <Card>
                      <div className="pricing-plan-card__inner">
                        <BlockStack gap="300">

                          {/* Header */}
                          <InlineStack align="space-between" blockAlign="start">
                            <Text as="h3" variant="headingMd">{plan.name}</Text>
                            <InlineStack gap="100">
                              {billingTestMode && !isFree ? <Badge tone="attention">Test</Badge> : null}
                              {plan.popular ? <Badge tone="success">Popular</Badge> : null}
                            </InlineStack>
                          </InlineStack>

                          {/* Price */}
                          <BlockStack gap="050">
                            <InlineStack gap="100" blockAlign="end">
                              <Text as="p" variant="heading2xl">
                                {isFree ? "Free" : `$${Number(displayPrice).toFixed(2)}`}
                              </Text>
                              {!isFree && (
                                <Text as="span" variant="bodySm" tone="subdued">/mo</Text>
                              )}
                            </InlineStack>
                            <Text as="p" variant="bodySm" tone="subdued">{billedNote}</Text>
                            {isYearly && !isFree && (
                              <div className="pricing-save-badge">
                                Save {YEARLY_DISCOUNT_MONTHS} months free
                              </div>
                            )}
                          </BlockStack>

                          <Divider />

                          {/* Features */}
                          <BlockStack gap="150">
                            <Text as="p" variant="headingSm">
                              {formatCredits(plan.credits)} credits{!isFree ? " / month" : ""}
                            </Text>
                            <Text as="p" variant="bodySm" tone="subdued">
                              ≈ {formatCredits(Math.floor(plan.credits / 3))} product generations
                            </Text>
                            {plan.features.slice(1).map((feature) => (
                              <InlineStack key={feature} gap="150" blockAlign="start" wrap={false}>
                                <CheckIcon />
                                <Text as="p" variant="bodySm">{feature}</Text>
                              </InlineStack>
                            ))}
                          </BlockStack>

                        </BlockStack>

                        {/* CTA button */}
                        <div className="pricing-plan-card__action">
                          {isFree ? (
                            <Button fullWidth disabled={isCurrent}>
                              {isCurrent ? "Current plan" : "Get started free"}
                            </Button>
                          ) : (
                            <Form method="post">
                              <input type="hidden" name="intent" value="subscribe" />
                              <input type="hidden" name="planKey" value={plan.key} />
                              <input type="hidden" name="interval" value={billingInterval} />
                              <Button
                                fullWidth
                                submit
                                variant={plan.popular ? "primary" : "secondary"}
                                loading={loading}
                                disabled={isSubmitting || isCurrent}
                              >
                                {isCurrent ? "Current plan" : `Choose ${plan.name}`}
                              </Button>
                            </Form>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                </Grid.Cell>
              );
            })}
          </Grid>
        </BlockStack>

        {/* Extra credits */}
        <BlockStack gap="300">
          <InlineStack align="space-between" blockAlign="center">
            <BlockStack gap="100">
              <Text as="h2" variant="headingMd">Extra credits</Text>
              <Text as="p" variant="bodySm" tone="subdued">
                One-time top-up. Credits never expire and stack on top of your plan.
              </Text>
            </BlockStack>
            {billingTestMode ? <Badge tone="attention">Test mode</Badge> : null}
          </InlineStack>

          <Grid columns={{ xs: 1, sm: 1, md: 3, lg: 3, xl: 3 }}>
            {extraCreditPackages.map((creditPackage) => {
              const loading = isSubmitting && activePackageKey === creditPackage.key;
              const costPerCredit = (creditPackage.price / creditPackage.credits * 100).toFixed(2);
              return (
                <Grid.Cell key={creditPackage.key}>
                  <Card>
                    <BlockStack gap="300">
                      <BlockStack gap="100">
                        <Text as="h3" variant="headingMd">
                          {formatCredits(creditPackage.credits)} credits
                        </Text>
                        <Text as="p" variant="heading2xl">
                          {formatPrice(creditPackage.price)}
                        </Text>
                        <Text as="p" variant="bodySm" tone="subdued">
                          ${costPerCredit}¢ per credit · One-time · Never expire
                        </Text>
                        <Text as="p" variant="bodySm" tone="subdued">
                          ≈ {formatCredits(Math.floor(creditPackage.credits / 3))} product generations
                        </Text>
                      </BlockStack>

                      <Form method="post">
                        <input type="hidden" name="intent" value="buy_credits" />
                        <input type="hidden" name="packageKey" value={creditPackage.key} />
                        <Button fullWidth submit loading={loading} disabled={isSubmitting} variant="primary">
                          Buy credits
                        </Button>
                      </Form>
                    </BlockStack>
                  </Card>
                </Grid.Cell>
              );
            })}
          </Grid>
        </BlockStack>

        <Box paddingBlockEnd="800" />
      </BlockStack>

      <style>{`
        /* ── Plan cards ── */
        .pricing-plan-card,
        .pricing-plan-card > .Polaris-ShadowBevel {
          height: 100%;
        }
        .pricing-plan-card--popular > .Polaris-ShadowBevel,
        .pricing-plan-card--popular > div {
          outline: 2px solid #008060;
          border-radius: 13px;
        }
        .pricing-plan-card__inner {
          min-height: 360px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .pricing-plan-card__action {
          margin-top: auto;
          padding-top: 16px;
        }
        .pricing-plan-card__action form { margin: 0; }

        /* ── Save badge on yearly cards ── */
        .pricing-save-badge {
          display: inline-block;
          background: #e3f5e1;
          color: #008060;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 20px;
          width: fit-content;
        }

        /* ── Monthly / Yearly toggle ── */
        .pricing-interval-toggle {
          display: inline-flex;
          background: #f1f2f3;
          border-radius: 10px;
          padding: 4px;
          gap: 2px;
        }
        .pricing-interval-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 20px;
          border: none;
          border-radius: 8px;
          background: transparent;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: background 150ms ease, color 150ms ease;
          white-space: nowrap;
        }
        .pricing-interval-btn.is-active {
          background: #ffffff;
          color: #202223;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        }
        .pricing-interval-save {
          background: #008060;
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 20px;
        }
      `}</style>
    </Page>
  );
}
