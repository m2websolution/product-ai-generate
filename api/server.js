import { createRequestListener } from "@react-router/node";
import * as serverBuild from "../build/server/index.js";

const requestListener = createRequestListener({
  build: serverBuild,
  mode: process.env.NODE_ENV || "production",
});

export default async function handler(request) {
  let url;
  try {
    url = new URL(request.url);
  } catch {
    const forwardedProto = request.headers.get("x-forwarded-proto");
    const forwardedHost = request.headers.get("x-forwarded-host");
    const host = request.headers.get("host");
    const base = `${forwardedProto || "https"}://${forwardedHost || host || "localhost"}`;
    url = new URL(request.url, base);
  }

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
