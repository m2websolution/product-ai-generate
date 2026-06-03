import { generateDynamicLlmsTxt, resolveShopFromRequest } from "../lib/llmsTxt.server";
import db from "../db.server";

const PLAIN_TEXT = { "Content-Type": "text/plain; charset=utf-8" };
const CACHEABLE_PLAIN_TEXT = { ...PLAIN_TEXT, "Cache-Control": "public, max-age=300, stale-while-revalidate=3600" };

export async function loader({ request }) {
  const shop = await resolveShopFromRequest(request);

  if (!shop) {
    return new Response("Missing shop parameter", { status: 400, headers: PLAIN_TEXT });
  }

  try {
    // Serve stored/generated content when available so Generate overrides this URL
    const stored = await db.aiVisibilityLlmsTxt.findUnique({
      where: { shop },
      select: { content: true },
    });
    if (stored?.content) {
      return new Response(stored.content, { status: 200, headers: CACHEABLE_PLAIN_TEXT });
    }
    // Fallback: dynamic generation for shops that haven't generated yet
    const content = await generateDynamicLlmsTxt(shop);
    return new Response(content, { status: 200, headers: CACHEABLE_PLAIN_TEXT });
  } catch {
    return new Response("Not found", { status: 404, headers: PLAIN_TEXT });
  }
}
