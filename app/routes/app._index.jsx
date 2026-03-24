import { useState } from "react";
import { useLoaderData, useActionData, Form, useNavigation } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import {
  Page,
  Layout,
  Card,
  BlockStack,
  InlineStack,
  Text,
  Button,
  TextField,
  Banner,
  Badge,
  Divider,
  Box,
  CalloutCard,
  Grid,
} from "@shopify/polaris";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const shopData = await db.shop.findUnique({
    where: { shop: session.shop },
    select: { openaiApiKey: true, anthropicApiKey: true },
  });
  return {
    hasOpenaiKey: !!shopData?.openaiApiKey,
    hasAnthropicKey: !!shopData?.anthropicApiKey,
  };
};

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "save_api_keys") {
    const openaiApiKey = formData.get("openaiApiKey")?.trim();
    const anthropicApiKey = formData.get("anthropicApiKey")?.trim();
    const updateData = {};
    if (openaiApiKey) updateData.openaiApiKey = openaiApiKey;
    if (anthropicApiKey) updateData.anthropicApiKey = anthropicApiKey;
    if (Object.keys(updateData).length === 0) {
      return { success: false, message: "Please enter at least one API key." };
    }
    await db.shop.upsert({
      where: { shop },
      update: updateData,
      create: { shop, installed: true, ...updateData },
    });
    return { success: true, message: "API keys saved successfully!" };
  }

  if (intent === "clear_openai_key") {
    await db.shop.upsert({
      where: { shop },
      update: { openaiApiKey: null },
      create: { shop, installed: true },
    });
    return { success: true, message: "OpenAI API key removed." };
  }

  if (intent === "clear_anthropic_key") {
    await db.shop.upsert({
      where: { shop },
      update: { anthropicApiKey: null },
      create: { shop, installed: true },
    });
    return { success: true, message: "Anthropic API key removed." };
  }

  return { success: false, message: "Unknown action." };
};

export default function Index() {
  const { hasOpenaiKey, hasAnthropicKey } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSaving = navigation.state === "submitting";

  const [openaiKey, setOpenaiKey] = useState("");
  const [anthropicKey, setAnthropicKey] = useState("");

  return (
    <Page
      title="Proxy AI Content Generator"
      subtitle="Generate high-quality, SEO-optimized content for your Shopify store in seconds"
    >
      <BlockStack gap="600">
        {/* Feature Cards */}
        <Layout>
          <Layout.Section>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">Features</Text>
              <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                  <CalloutCard
                    title="Product Descriptions"
                    illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f210d9d.svg"
                    primaryAction={{ content: "Generate", url: "/app/products" }}
                  >
                    <p>Generate SEO-optimized product descriptions and meta tags powered by GPT-4o.</p>
                  </CalloutCard>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                  <CalloutCard
                    title="Blog Posts"
                    illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f210d9d.svg"
                    primaryAction={{ content: "Generate", url: "/app/blog" }}
                  >
                    <p>Create engaging blog content and articles for your store in 180+ languages.</p>
                  </CalloutCard>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                  <CalloutCard
                    title="Collection Descriptions"
                    illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f210d9d.svg"
                    primaryAction={{ content: "Generate", url: "/app/collections" }}
                  >
                    <p>Auto-generate descriptions for your product collections with AI.</p>
                  </CalloutCard>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                  <CalloutCard
                    title="Page Content"
                    illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f210d9d.svg"
                    primaryAction={{ content: "Generate", url: "/app/pages" }}
                  >
                    <p>Generate and optimize storefront page content for About, FAQ, and more.</p>
                  </CalloutCard>
                </Grid.Cell>
              </Grid>
            </BlockStack>
          </Layout.Section>
        </Layout>

        <Divider />

        {/* AI API Keys Settings */}
        <Layout>
          <Layout.Section variant="oneThird">
            <BlockStack gap="200">
              <Text variant="headingMd" as="h2">AI Provider Keys</Text>
              <Text variant="bodyMd" tone="subdued">
                Configure your API keys to enable AI content generation. Keys are stored securely per shop.
              </Text>
            </BlockStack>
          </Layout.Section>

          <Layout.Section>
            <BlockStack gap="400">
              {actionData && (
                <Banner
                  tone={actionData.success ? "success" : "critical"}
                  onDismiss={() => {}}
                >
                  <p>{actionData.message}</p>
                </Banner>
              )}

              <Form method="post">
                <input type="hidden" name="intent" value="save_api_keys" />
                <Card>
                  <BlockStack gap="400">
                    {/* OpenAI / ChatGPT */}
                    <BlockStack gap="300">
                      <InlineStack align="space-between" blockAlign="center">
                        <InlineStack gap="200" blockAlign="center">
                          <Text variant="headingSm" as="h3">ChatGPT / OpenAI</Text>
                          {hasOpenaiKey && <Badge tone="success">Configured</Badge>}
                        </InlineStack>
                        {hasOpenaiKey && (
                          <Form method="post">
                            <input type="hidden" name="intent" value="clear_openai_key" />
                            <Button variant="plain" tone="critical" submit size="slim">
                              Remove key
                            </Button>
                          </Form>
                        )}
                      </InlineStack>
                      <Text variant="bodySm" tone="subdued">
                        Used for GPT-4o-mini. Get your key from{" "}
                        <a
                          href="https://platform.openai.com/api-keys"
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: "var(--p-color-text-emphasis)" }}
                        >
                          platform.openai.com
                        </a>
                      </Text>
                      <TextField
                        label="OpenAI API Key"
                        labelHidden
                        type="password"
                        name="openaiApiKey"
                        value={openaiKey}
                        onChange={setOpenaiKey}
                        placeholder={hasOpenaiKey ? "••••••••••••  (saved)" : "sk-proj-..."}
                        autoComplete="off"
                        prefix="sk-"
                      />
                    </BlockStack>

                    <Divider />

                    {/* Anthropic / Claude */}
                    <BlockStack gap="300">
                      <InlineStack align="space-between" blockAlign="center">
                        <InlineStack gap="200" blockAlign="center">
                          <Text variant="headingSm" as="h3">Claude AI / Anthropic</Text>
                          {hasAnthropicKey && <Badge tone="success">Configured</Badge>}
                        </InlineStack>
                        {hasAnthropicKey && (
                          <Form method="post">
                            <input type="hidden" name="intent" value="clear_anthropic_key" />
                            <Button variant="plain" tone="critical" submit size="slim">
                              Remove key
                            </Button>
                          </Form>
                        )}
                      </InlineStack>
                      <Text variant="bodySm" tone="subdued">
                        Used for Claude 3 and newer models. Get your key from{" "}
                        <a
                          href="https://console.anthropic.com/settings/keys"
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: "var(--p-color-text-emphasis)" }}
                        >
                          console.anthropic.com
                        </a>
                      </Text>
                      <TextField
                        label="Anthropic API Key"
                        labelHidden
                        type="password"
                        name="anthropicApiKey"
                        value={anthropicKey}
                        onChange={setAnthropicKey}
                        placeholder={hasAnthropicKey ? "••••••••••••  (saved)" : "sk-ant-..."}
                        autoComplete="off"
                        prefix="sk-ant-"
                      />
                    </BlockStack>

                    <InlineStack align="end">
                      <Button
                        variant="primary"
                        submit
                        loading={isSaving}
                        disabled={isSaving}
                      >
                        Save API Keys
                      </Button>
                    </InlineStack>
                  </BlockStack>
                </Card>
              </Form>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>

      <Box paddingBlockEnd="800" />
    </Page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
