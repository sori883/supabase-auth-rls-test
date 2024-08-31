import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import {  json } from "@remix-run/react";
import { createDBClient } from "@acme/db";
import { schema } from "@acme/db/schema";
import { getSession } from "~/libs/supabase/auth.supabase.server";
import { createHC } from "~/libs/hc";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const session = await getSession(request, context);
  const client = createHC(context, session?.access_token);

  await client.auth.manual.$get();
  await client.auth.middleware.$get();
  return null;
};

export default function SignIn() {
  return (
    <>
      test jwt page
    </>
  );
}