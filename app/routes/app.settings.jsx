import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import {
  Page,
  Card,
  BlockStack,
  Text,
  Button,
  Select,
  TextField,
  Divider,
  Box,
} from "@shopify/polaris";
import { readGlobalSettings, writeGlobalSettings } from "../lib/globalSettings";

const LANGUAGE_OPTIONS = [
  "English", "English (British)", "English (US)", "Arabic", "Bengali", "Bulgarian",
  "Chinese", "Chinese (Simplified)", "Chinese (Traditional)", "Croatian", "Czech",
  "Danish", "Dutch", "Finnish", "French", "German", "Greek", "Hebrew", "Hindi",
  "Hungarian", "Indonesian", "Italian", "Japanese", "Korean", "Malay", "Norwegian",
  "Polish", "Portuguese", "Romanian", "Russian", "Spanish", "Swedish", "Tamil",
  "Telugu", "Thai", "Turkish", "Ukrainian", "Urdu", "Vietnamese",
].map((l) => ({ label: l, value: l }));


function SectionLabel({ children }) {
  return (
    <Text as="h3" variant="headingSm" fontWeight="semibold">
      {children}
    </Text>
  );
}

export default function SettingsPage() {
  const shopify = useAppBridge();
  const navigate = useNavigate();
  const [settings, setSettings] = useState(() => readGlobalSettings());
  const [saved, setSaved] = useState(false);

  function update(key) {
    return (value) => setSettings((s) => ({ ...s, [key]: value }));
  }

  function handleSave() {
    writeGlobalSettings(settings);
    setSaved(true);
    shopify.toast.show("Settings saved successfully.");
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <Page
      fullWidth
      title="Settings"
      subtitle="Configure global defaults for AI content generation."
      primaryAction={{ content: saved ? "Saved!" : "Save Settings", onAction: handleSave }}
      secondaryActions={[{ content: "Back", onAction: () => navigate("/app") }]}
    >
      <BlockStack gap="600">

        {/* Generation Settings */}
        <Card>
          <BlockStack gap="400">
            <SectionLabel>Generation Settings</SectionLabel>
            <Text as="p" variant="bodySm" tone="subdued">
              These defaults are applied across all pages. Individual pages use these values automatically.
            </Text>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Select
                label="Output Language"
                options={LANGUAGE_OPTIONS}
                value={settings.language}
                onChange={update("language")}
                helpText="Default language for all AI-generated content."
              />
              <Select
                label="Tone"
                options={[
                  { label: "Professional", value: "professional" },
                  { label: "Casual", value: "casual" },
                  { label: "Friendly", value: "friendly" },
                  { label: "Persuasive", value: "persuasive" },
                  { label: "Informative", value: "informative" },
                  { label: "Luxury", value: "luxury" },
                  { label: "Playful", value: "playful" },
                  { label: "Urgent", value: "urgent" },
                ]}
                value={settings.tone}
                onChange={update("tone")}
              />
            </div>
          </BlockStack>
        </Card>

        {/* Context Keywords */}
        <Card>
          <BlockStack gap="500">
            <div>
              <SectionLabel>Context Keywords</SectionLabel>
              <Text as="p" variant="bodySm" tone="subdued">Specific keywords sent to the AI for each content type. Separate with commas.</Text>
            </div>

            {/* Product */}
            <BlockStack gap="200">
              <Text as="p" variant="bodyMd" fontWeight="semibold">Product</Text>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <TextField
                  label="Description Keywords"
                  value={settings.productDescKeywords}
                  onChange={update("productDescKeywords")}
                  placeholder="e.g. eco-friendly, premium"
                  autoComplete="off"
                />
                <TextField
                  label="Meta Title Keywords"
                  value={settings.productMetaTitleKeywords}
                  onChange={update("productMetaTitleKeywords")}
                  placeholder="e.g. buy, shop, best"
                  autoComplete="off"
                />
                <TextField
                  label="Meta Desc Keywords"
                  value={settings.productMetaDescKeywords}
                  onChange={update("productMetaDescKeywords")}
                  placeholder="e.g. fast shipping, handmade"
                  autoComplete="off"
                />
              </div>
            </BlockStack>

            <Divider />

            {/* Collections */}
            <BlockStack gap="200">
              <Text as="p" variant="bodyMd" fontWeight="semibold">Collections</Text>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <TextField
                  label="Description Keywords"
                  value={settings.collectionDescKeywords}
                  onChange={update("collectionDescKeywords")}
                  placeholder="e.g. curated, seasonal"
                  autoComplete="off"
                />
                <TextField
                  label="Meta Title Keywords"
                  value={settings.collectionMetaTitleKeywords}
                  onChange={update("collectionMetaTitleKeywords")}
                  placeholder="e.g. shop, explore"
                  autoComplete="off"
                />
                <TextField
                  label="Meta Desc Keywords"
                  value={settings.collectionMetaDescKeywords}
                  onChange={update("collectionMetaDescKeywords")}
                  placeholder="e.g. wide selection, quality"
                  autoComplete="off"
                />
              </div>
            </BlockStack>

            <Divider />

            {/* Pages */}
            <BlockStack gap="200">
              <Text as="p" variant="bodyMd" fontWeight="semibold">Pages</Text>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <TextField
                  label="Content Keywords"
                  value={settings.pageContentKeywords}
                  onChange={update("pageContentKeywords")}
                  placeholder="e.g. about us, mission"
                  autoComplete="off"
                />
                <TextField
                  label="Meta Title Keywords"
                  value={settings.pageMetaTitleKeywords}
                  onChange={update("pageMetaTitleKeywords")}
                  placeholder="e.g. official, store"
                  autoComplete="off"
                />
                <TextField
                  label="Meta Desc Keywords"
                  value={settings.pageMetaDescKeywords}
                  onChange={update("pageMetaDescKeywords")}
                  placeholder="e.g. learn more, discover"
                  autoComplete="off"
                />
              </div>
            </BlockStack>

            <Divider />

            {/* Blog */}
            <BlockStack gap="200">
              <Text as="p" variant="bodyMd" fontWeight="semibold">Blog</Text>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <TextField
                  label="Content Keywords"
                  value={settings.blogContentKeywords}
                  onChange={update("blogContentKeywords")}
                  placeholder="e.g. tips, guide, how-to"
                  autoComplete="off"
                />
                <TextField
                  label="Meta Title Keywords"
                  value={settings.blogMetaTitleKeywords}
                  onChange={update("blogMetaTitleKeywords")}
                  placeholder="e.g. best, top, ultimate"
                  autoComplete="off"
                />
                <TextField
                  label="Meta Desc Keywords"
                  value={settings.blogMetaDescKeywords}
                  onChange={update("blogMetaDescKeywords")}
                  placeholder="e.g. read more, in-depth"
                  autoComplete="off"
                />
              </div>
            </BlockStack>
          </BlockStack>
        </Card>

        {/* Word Count Limits */}
        <Card>
          <BlockStack gap="500">
            <SectionLabel>Word Count Limits</SectionLabel>
            <Text as="p" variant="bodySm" tone="subdued">
              Set approximate word targets for each content type. These guide the AI output length.
            </Text>

            {/* Product */}
            <BlockStack gap="300">
              <Text as="p" variant="bodyMd" fontWeight="semibold">Product</Text>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <TextField label="Description words" type="number" value={settings.productDescWords} onChange={update("productDescWords")} autoComplete="off" />
                <TextField label="Meta Title words" type="number" value={settings.productMetaTitleWords} onChange={update("productMetaTitleWords")} autoComplete="off" />
                <TextField label="Meta Description words" type="number" value={settings.productMetaDescWords} onChange={update("productMetaDescWords")} autoComplete="off" />
              </div>
            </BlockStack>

            <Divider />

            {/* Collections */}
            <BlockStack gap="300">
              <Text as="p" variant="bodyMd" fontWeight="semibold">Collections</Text>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <TextField label="Description words" type="number" value={settings.collectionDescWords} onChange={update("collectionDescWords")} autoComplete="off" />
                <TextField label="Meta Title words" type="number" value={settings.collectionMetaTitleWords} onChange={update("collectionMetaTitleWords")} autoComplete="off" />
                <TextField label="Meta Description words" type="number" value={settings.collectionMetaDescWords} onChange={update("collectionMetaDescWords")} autoComplete="off" />
              </div>
            </BlockStack>

            <Divider />

            {/* Pages */}
            <BlockStack gap="300">
              <Text as="p" variant="bodyMd" fontWeight="semibold">Pages</Text>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <TextField label="Content words" type="number" value={settings.pageContentWords} onChange={update("pageContentWords")} autoComplete="off" />
                <TextField label="Meta Title words" type="number" value={settings.pageMetaTitleWords} onChange={update("pageMetaTitleWords")} autoComplete="off" />
                <TextField label="Meta Description words" type="number" value={settings.pageMetaDescWords} onChange={update("pageMetaDescWords")} autoComplete="off" />
              </div>
            </BlockStack>

            <Divider />

            {/* Blog */}
            <BlockStack gap="300">
              <Text as="p" variant="bodyMd" fontWeight="semibold">Blog</Text>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <TextField label="Content words" type="number" value={settings.blogContentWords} onChange={update("blogContentWords")} autoComplete="off" />
                <TextField label="Meta Title words" type="number" value={settings.blogMetaTitleWords} onChange={update("blogMetaTitleWords")} autoComplete="off" />
                <TextField label="Meta Description words" type="number" value={settings.blogMetaDescWords} onChange={update("blogMetaDescWords")} autoComplete="off" />
              </div>
            </BlockStack>
          </BlockStack>
        </Card>

        <Box paddingBlockEnd="800" />
      </BlockStack>
    </Page>
  );
}
