import { createRequestListener } from "@react-router/node";
import * as serverBuild from "../build/server/index.js";

const requestListener = createRequestListener({
  build: serverBuild,
  mode: process.env.NODE_ENV || "production",
});

export default async function handler(request) {
  const url = new URL(request.url);

  // Avoid routing /assets/* through React Router when a stale hashed asset is requested.
  // This prevents noisy "No route matches URL /assets/..." server errors.
  if (url.pathname.startsWith("/assets/")) {
    return new Response("Not Found", {
      status: 404,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "public, max-age=60",
      },
    });
  }

  return requestListener(request);
}
