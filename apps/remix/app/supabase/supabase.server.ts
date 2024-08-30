import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";

import type { AppLoadContext } from "@remix-run/cloudflare";

/**
 * 参考：https://github.com/aburio/remix-supabase/blob/main/app/lib/supabase/supabase.server.ts
 * 参考：https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=remix&queryGroups=package-manager&package-manager=pnpm&queryGroups=environment&environment=remix-loader
 */
export function createSupabaseServerClient(request: Request, c:AppLoadContext) {
  const headers = new Headers();

  const client = createServerClient(
      c.cloudflare.env.SUPABASE_URL,
      c.cloudflare.env.SUPABASE_ANON_KEY,
    {
      auth: {
        detectSessionInUrl: true,
        flowType: "pkce",
      },
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "");
        },
        setAll(cookiesToSet) {
					for (const cookie of cookiesToSet) {
						const { name, value, options } = cookie;
						headers.append(
							"Set-Cookie",
							serializeCookieHeader(name, value, options),
						);
					}
        },
      },
      cookieOptions: {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      },
  });

  return { 
    client,
    headers,
  };
}

