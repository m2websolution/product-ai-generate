export default function PagesPage() {
  return (
    <s-page heading="Storefront Pages">
      <s-section heading="AI Page Content Generator">
        <s-paragraph>
          Generate and manage content for your Shopify storefront pages — including About Us,
          Contact, FAQs, and landing pages — with AI-powered copy tailored to your brand voice.
        </s-paragraph>
        <s-paragraph>
          <strong>Coming Features:</strong>
        </s-paragraph>
        <s-unordered-list>
          <s-list-item>Generate full page content from a brief description or keywords</s-list-item>
          <s-list-item>Rewrite or improve existing page content</s-list-item>
          <s-list-item>SEO-optimized meta titles and descriptions for every page</s-list-item>
          <s-list-item>Multiple writing tones and 180+ languages</s-list-item>
          <s-list-item>Bulk updates across all storefront pages</s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section slot="aside" heading="Quick Tips">
        <s-paragraph>
          Configure your AI API keys on the{" "}
          <s-link href="/app">Dashboard</s-link> to enable content generation.
        </s-paragraph>
        <s-unordered-list>
          <s-list-item>
            <s-link href="https://help.shopify.com/en/manual/online-store/pages" target="_blank">
              Shopify Pages documentation
            </s-link>
          </s-list-item>
          <s-list-item>
            <s-link href="https://shopify.dev/docs/api/admin-graphql/latest/mutations/pageCreate" target="_blank">
              Pages GraphQL API
            </s-link>
          </s-list-item>
        </s-unordered-list>
      </s-section>
    </s-page>
  );
}
