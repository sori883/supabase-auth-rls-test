import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { isUserLoggedIn, signInWithGoogle } from "~/supabase/auth.supabase.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  // 認証済みならuserにリダイレクトする
  if (await isUserLoggedIn(request, context)) {
    return redirect("/user");
  }
  return null;
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const data =  await signInWithGoogle(request, context);

  // googleへのリダイレクトURLはdata.urlに格納されているみたい
  // 自動でリダイレクトはしてくれないので、リダイレクトする
  return redirect(data.data.url!, { headers: data.headers });
};

export default function SignIn() {
  return (
    <>
      <Form method="post">
        <button type="submit">Sign In</button>
      </Form>
    </>
  );
}