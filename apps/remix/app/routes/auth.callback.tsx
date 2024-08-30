import { json, redirect  } from "@remix-run/cloudflare";
import type {LoaderFunctionArgs} from "@remix-run/cloudflare";
import { createSupabaseServerClient } from "~/supabase/supabase.server";

/**
 * 参考
 * https://supabase.com/docs/guides/auth/social-login/auth-google?queryGroups=framework&framework=remix&queryGroups=environment&environment=server#application-code
 */
export async function loader({ request, context }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/";

  const supabase = createSupabaseServerClient(request, context);
  const headers = supabase.headers;

  if (code) {
    const { error } = await supabase.client.auth.exchangeCodeForSession(code);

    if (!error) {
      return redirect(next, { headers });
    }
    return json(error);
  }

  // return the user to an error page with instructions
  return redirect("/", { headers });
};
