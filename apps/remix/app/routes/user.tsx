import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { getSession, getUser, isUserLoggedIn, signOut } from "~/supabase/auth.supabase.server";
import { createHC } from "~/lib/rpc";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  if (!(await isUserLoggedIn(request, context))) {
    return redirect("/user");
  }

  const session = await getSession(request, context);
  const client = createHC(context, session?.access_token);
  const res = await client.authmiddleware.authin.$get();
  console.log(await res.json());

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