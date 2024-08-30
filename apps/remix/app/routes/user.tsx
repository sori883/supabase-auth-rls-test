import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { getUser, signOut } from "~/supabase/auth.supabase.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const user = await getUser(request, context);
  return json(user);
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const data =  await signOut(request, context);

  return redirect(data.data.url, { headers: data.headers });
};

export default function User() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
    {data?.aud}
    <Form method="post">
        <button type="submit">Sign Out</button>
      </Form>
    </>
  );
}