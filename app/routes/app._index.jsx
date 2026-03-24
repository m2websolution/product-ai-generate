import { useState } from "react";
import { useLoaderData, useActionData, Form, useNavigation } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import styles from "../styles/app-home.module.css";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  const shopData = await db.shop.findUnique({
    where: { shop },
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

const featureCards = [
  {
    id: "products",
    title: "Product Descriptions",
    description: "Generate SEO-optimized product descriptions and meta tags",
    href: "/app/products",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6.5h6v3H4v-3Zm0 4.5h16v2H4v-2Zm0 3.5h16v2H4v-2Zm8-8.5h8v3h-8v-3Z" />
      </svg>
    ),
  },
  {
    id: "blog",
    title: "Blog Posts",
    description: "Create engaging blog content for your store",
    href: "/app/blog",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 5.5h8.5a4.5 4.5 0 0 1 0 9H10v3.5a1.5 1.5 0 0 1-3 0V7A1.5 1.5 0 0 1 7 5.5Zm3 3v3h5.5a1.5 1.5 0 0 0 0-3H10Z" />
      </svg>
    ),
  },
  {
    id: "collections",
    title: "Collection Descriptions",
    description: "Auto-generate descriptions for your product collections",
    href: "/app/collections",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 13h6v7H4v-7Zm5-9h11v11H9V4Zm-5 2h3v3H4V6Zm9 2h5v2h-5V8Z" />
      </svg>
    ),
  },
  {
    id: "pages",
    title: "Page Content",
    description: "Generate and optimize storefront page content",
    href: "/app/pages",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2.5A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5Z" />
      </svg>
    ),
  },
];

export default function Index() {
  const { hasOpenaiKey, hasAnthropicKey } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSaving = navigation.state === "submitting";

  const [openaiKey, setOpenaiKey] = useState("");
  const [anthropicKey, setAnthropicKey] = useState("");
  const [showOpenaiKey, setShowOpenaiKey] = useState(false);
  const [showAnthropicKey, setShowAnthropicKey] = useState(false);

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>AI-Powered</div>
          <h1 className={styles.heroTitle}>Proxy AI Content Generator</h1>
          <p className={styles.heroSubtitle}>
            Generate high-quality, SEO-optimized content for your Shopify store in seconds using the latest AI models.
          </p>
        </div>
      </section>

      <div className={styles.container}>
        {/* Stats Row */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>180+</span>
            <span className={styles.statLabel}>Languages</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>4</span>
            <span className={styles.statLabel}>Content Types</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>GPT-4o</span>
            <span className={styles.statLabel}>AI Model</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>SEO</span>
            <span className={styles.statLabel}>Optimized</span>
          </div>
        </div>

        {/* Feature Cards */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Features</h2>
          <p className={styles.sectionDesc}>Choose a content type to get started</p>
        </div>

        <div className={styles.grid}>
          {featureCards.map((card, index) => (
            <a
              key={card.id}
              href={card.href}
              className={styles.card}
              style={{ "--card-delay": `${index * 60}ms` }}
            >
              <div className={styles.cardIcon}>{card.icon}</div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.description}</p>
              </div>
              <div className={styles.cardArrow}>
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* AI API Keys Settings */}
        <div className={styles.settingsCard}>
          <div className={styles.settingsHeader}>
            <div className={styles.settingsIconWrap}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h2 className={styles.settingsTitle}>AI Provider API Keys</h2>
              <p className={styles.settingsSubtitle}>Configure your API keys to enable AI content generation</p>
            </div>
          </div>

          {actionData && (
            <div className={actionData.success ? styles.bannerSuccess : styles.bannerError}>
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                {actionData.success
                  ? <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  : <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                }
              </svg>
              <span>{actionData.message}</span>
            </div>
          )}

          <Form method="post" className={styles.settingsForm}>
            <input type="hidden" name="intent" value="save_api_keys" />

            {/* OpenAI / ChatGPT Key */}
            <div className={styles.keyField}>
              <div className={styles.keyFieldHeader}>
                <div className={styles.keyProviderBadge} data-provider="openai">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
                  </svg>
                  ChatGPT / OpenAI
                </div>
                {hasOpenaiKey && (
                  <div className={styles.keyStatus}>
                    <span className={styles.keyStatusDot} />
                    Key configured
                  </div>
                )}
              </div>
              <p className={styles.keyDescription}>
                Used for GPT-4o-mini and other OpenAI models. Get your key from{" "}
                <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer" className={styles.keyLink}>
                  platform.openai.com
                </a>
              </p>
              <div className={styles.keyInputRow}>
                <div className={styles.keyInputWrap}>
                  <input
                    type={showOpenaiKey ? "text" : "password"}
                    name="openaiApiKey"
                    className={styles.keyInput}
                    placeholder={hasOpenaiKey ? "••••••••••••••••••••  (saved)" : "sk-proj-..."}
                    value={openaiKey}
                    onChange={(e) => setOpenaiKey(e.target.value)}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    className={styles.keyToggle}
                    onClick={() => setShowOpenaiKey((v) => !v)}
                    aria-label={showOpenaiKey ? "Hide key" : "Show key"}
                  >
                    {showOpenaiKey ? (
                      <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" /><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" /></svg>
                    ) : (
                      <svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                    )}
                  </button>
                </div>
                {hasOpenaiKey && (
                  <Form method="post" style={{ display: "inline" }}>
                    <input type="hidden" name="intent" value="clear_openai_key" />
                    <button type="submit" className={styles.keyClearBtn} title="Remove key">
                      <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    </button>
                  </Form>
                )}
              </div>
            </div>

            {/* Anthropic / Claude Key */}
            <div className={styles.keyField}>
              <div className={styles.keyFieldHeader}>
                <div className={styles.keyProviderBadge} data-provider="anthropic">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017L3.674 20H0L6.569 3.52zm4.132 9.959L8.453 7.687 6.205 13.479h4.496z" />
                  </svg>
                  Claude AI / Anthropic
                </div>
                {hasAnthropicKey && (
                  <div className={styles.keyStatus}>
                    <span className={styles.keyStatusDot} />
                    Key configured
                  </div>
                )}
              </div>
              <p className={styles.keyDescription}>
                Used for Claude 3 and other Anthropic models. Get your key from{" "}
                <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer" className={styles.keyLink}>
                  console.anthropic.com
                </a>
              </p>
              <div className={styles.keyInputRow}>
                <div className={styles.keyInputWrap}>
                  <input
                    type={showAnthropicKey ? "text" : "password"}
                    name="anthropicApiKey"
                    className={styles.keyInput}
                    placeholder={hasAnthropicKey ? "••••••••••••••••••••  (saved)" : "sk-ant-..."}
                    value={anthropicKey}
                    onChange={(e) => setAnthropicKey(e.target.value)}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    className={styles.keyToggle}
                    onClick={() => setShowAnthropicKey((v) => !v)}
                    aria-label={showAnthropicKey ? "Hide key" : "Show key"}
                  >
                    {showAnthropicKey ? (
                      <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" /><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" /></svg>
                    ) : (
                      <svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                    )}
                  </button>
                </div>
                {hasAnthropicKey && (
                  <Form method="post" style={{ display: "inline" }}>
                    <input type="hidden" name="intent" value="clear_anthropic_key" />
                    <button type="submit" className={styles.keyClearBtn} title="Remove key">
                      <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    </button>
                  </Form>
                )}
              </div>
            </div>

            <div className={styles.settingsActions}>
              <button
                type="submit"
                className={styles.saveBtn}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <svg className={styles.spinner} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                    Saving…
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" /></svg>
                    Save API Keys
                  </>
                )}
              </button>
              <p className={styles.settingsNote}>
                Keys are stored securely per shop and never shared.
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
