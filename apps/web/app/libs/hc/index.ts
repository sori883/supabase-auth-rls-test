import type { AppType } from "@acme/api";
import type { AppLoadContext } from "@remix-run/cloudflare";
import { hc } from "hono/client";

export function createHC(
  c:AppLoadContext,
  token: string | undefined,
) {
  const url = "http://127.0.0.1:3100/";

  return hc<AppType>(url, token ? {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } : {});
}