import { createSupabaseServerClient } from "~/supabase/supabase.server";
import type { AppLoadContext } from "@remix-run/cloudflare";

/**
 * ここら辺を参考
 * https://github.com/aburio/remix-supabase/blob/main/app/lib/supabase/auth.supabase.server.ts
 * https://supabase.com/docs/guides/auth/social-login/auth-google?queryGroups=framework&framework=remix#application-code
 */
export const signInWithGoogle = async (
  request: Request,
  c: AppLoadContext,
  successRedirectPath: string = "http://localhost:3000/auth/callback",
) => {
  const supabase = createSupabaseServerClient(request, c);
  const { data, error } = await supabase.client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: successRedirectPath,
    },
  });

  return { 
    ok: !error && data ? true : false,
    data: data,
    error: error && !data ? error.message : "",
    headers: supabase.headers,
  };
};

export const signOut = async (
  request: Request,
  c: AppLoadContext,
  successRedirectPath: string = "/",
) => {
  const supabase = createSupabaseServerClient(request, c);
  const { error } = await supabase.client.auth.signOut();

  return { 
    ok: !error ? true : false,
    data: { url: successRedirectPath }, 
    error: error ? error.message : "",
    headers: supabase.headers,
  };

};

export const getUser = async (
  request: Request,
  c: AppLoadContext,
) => {
  const supabase = createSupabaseServerClient(request, c);

  const {
    data: { session },
  } = await supabase.client.auth.getSession();
  
  return session?.user ?? null;
};

export const isUserLoggedIn = async (
  request: Request,
  c: AppLoadContext,
) => {
  const supabase = createSupabaseServerClient(request, c);

  const {
    data: { user },
  } = await supabase.client.auth.getUser();

  return !!user;
};