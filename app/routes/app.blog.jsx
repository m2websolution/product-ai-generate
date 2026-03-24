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

export default function BlogPage() {
  return (
    <Page
      title="Blog Posts"
      subtitle="AI-powered blog content generation for your Shopify store"
      backAction={{ content: "Dashboard", url: "/app" }}
    >
      <Layout>
        <Layout.Section>
          <BlockStack gap="400">
            <Banner tone="info">
              <p>
                Blog generation is coming soon! Configure your AI API keys on the{" "}
                <Link url="/app">Dashboard</Link> to be ready.
              </p>
            </Banner>

            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between" blockAlign="center">
                  <Text variant="headingMd" as="h2">AI Blog Generator</Text>
                  <Badge tone="attention">Coming Soon</Badge>
                </InlineStack>
                <Text variant="bodyMd" tone="subdued">
                  Generate engaging, SEO-optimized blog posts for your Shopify store using AI.
                  Create product reviews, how-to guides, and lifestyle content in 180+ languages.
                </Text>
                <Divider />
                <BlockStack gap="300">
                  <Text variant="headingSm" as="h3">Planned Features</Text>
                  <List type="bullet">
                    <List.Item>Auto-generate full blog articles from product titles or topics</List.Item>
                    <List.Item>SEO-optimized meta titles and descriptions</List.Item>
                    <List.Item>Multiple tone options — Professional, Friendly, Playful, Neutral</List.Item>
                    <List.Item>Support for 180+ languages</List.Item>
                    <List.Item>Bulk generation across all blog posts</List.Item>
                    <List.Item>Custom keyword targeting and brand voice</List.Item>
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
                  For best results, set up your AI API keys on the Dashboard before generating content.
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
                    <Link url="https://help.shopify.com/en/manual/online-store/blogs" external>
                      Shopify Blog documentation
                    </Link>
                  </List.Item>
                  <List.Item>
                    <Link url="https://shopify.dev/docs/api/admin-graphql/latest/mutations/blogCreate" external>
                      Blog GraphQL API
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
