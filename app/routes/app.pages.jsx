import {
  Page,
  Layout,
  Card,
  BlockStack,
  InlineStack,
  Text,
  Badge,
  List,
  Link,
  Box,
  Divider,
  Banner,
} from "@shopify/polaris";

export default function PagesPage() {
  return (
    <Page
      title="Storefront Pages"
      subtitle="Generate and manage content for your Shopify storefront pages"
      backAction={{ content: "Dashboard", url: "/app" }}
    >
      <Layout>
        <Layout.Section>
          <BlockStack gap="400">
            <Banner tone="info">
              <p>
                Page content generation is coming soon! Configure your AI API keys on the{" "}
                <Link url="/app">Dashboard</Link> to be ready.
              </p>
            </Banner>

            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between" blockAlign="center">
                  <Text variant="headingMd" as="h2">AI Page Content Generator</Text>
                  <Badge tone="attention">Coming Soon</Badge>
                </InlineStack>
                <Text variant="bodyMd" tone="subdued">
                  Generate and manage content for your Shopify storefront pages — including About Us,
                  Contact, FAQs, and landing pages — with AI-powered copy tailored to your brand voice.
                </Text>
                <Divider />
                <BlockStack gap="300">
                  <Text variant="headingSm" as="h3">Planned Features</Text>
                  <List type="bullet">
                    <List.Item>Generate full page content from a brief description or keywords</List.Item>
                    <List.Item>Rewrite or improve existing page content</List.Item>
                    <List.Item>SEO-optimized meta titles and descriptions for every page</List.Item>
                    <List.Item>Multiple writing tones and 180+ languages</List.Item>
                    <List.Item>Bulk updates across all storefront pages</List.Item>
                    <List.Item>Brand voice consistency across all pages</List.Item>
                  </List>
                </BlockStack>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <BlockStack gap="400">
            <Card>
              <BlockStack gap="300">
                <Text variant="headingSm" as="h3">Quick Tips</Text>
                <Text variant="bodySm" tone="subdued">
                  Configure your AI API keys on the Dashboard to enable content generation when this feature launches.
                </Text>
                <BlockStack gap="200">
                  <Link url="/app" removeUnderline>
                    ← Go to Dashboard
                  </Link>
                </BlockStack>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="300">
                <Text variant="headingSm" as="h3">Resources</Text>
                <List type="bullet">
                  <List.Item>
                    <Link url="https://help.shopify.com/en/manual/online-store/pages" external>
                      Shopify Pages documentation
                    </Link>
                  </List.Item>
                  <List.Item>
                    <Link url="https://shopify.dev/docs/api/admin-graphql/latest/mutations/pageCreate" external>
                      Pages GraphQL API
                    </Link>
                  </List.Item>
                </List>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
      <Box paddingBlockEnd="800" />
    </Page>
  );
}
