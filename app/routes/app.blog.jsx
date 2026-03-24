export default function BlogPage() {
  return (
    <s-page heading="Blog Posts">
      <s-section heading="AI Blog Generator">
        <s-paragraph>
          Generate engaging, SEO-optimized blog posts for your Shopify store using AI.
          Create product reviews, how-to guides, and lifestyle content in 180+ languages.
        </s-paragraph>
        <s-paragraph>
          <strong>Coming Features:</strong>
        </s-paragraph>
        <s-unordered-list>
          <s-list-item>Auto-generate full blog articles from product titles or topics</s-list-item>
          <s-list-item>SEO-optimized meta titles and descriptions</s-list-item>
          <s-list-item>Multiple tone options — Professional, Friendly, Playful, Neutral</s-list-item>
          <s-list-item>Support for 180+ languages</s-list-item>
          <s-list-item>Bulk generation across all blog posts</s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section slot="aside" heading="Quick Tips">
        <s-paragraph>
          For best results, configure your AI API keys on the{" "}
          <s-link href="/app">Dashboard</s-link> before generating content.
        </s-paragraph>
        <s-unordered-list>
          <s-list-item>
            <s-link href="https://help.shopify.com/en/manual/online-store/blogs" target="_blank">
              Shopify Blog documentation
            </s-link>
          </s-list-item>
          <s-list-item>
            <s-link href="https://shopify.dev/docs/api/admin-graphql/latest/mutations/blogCreate" target="_blank">
              Blog GraphQL API
            </s-link>
          </s-list-item>
        </s-unordered-list>
      </s-section>
    </s-page>
  );
}
