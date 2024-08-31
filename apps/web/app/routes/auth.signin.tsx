import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { signInWithGoogle } from "~/libs/supabase/auth.supabase.server";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const data =  await signInWithGoogle(request, context);
  // 自動でリダイレクトはしてくれないので、リダイレクトする
  // headerは付与しないとログイン出来ない
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