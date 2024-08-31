import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import {  json } from "@remix-run/react";
import { createDBClient } from "@acme/db";
import { schema } from "@acme/db/schema";
import { getUser } from "~/libs/supabase/auth.supabase.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const env = context.cloudflare.env;
  // DBクライアント作成
  const client = createDBClient(env.DATABASE_USER, env.DATABASE_PASSWORD, env.DATABASE_URL);
  // ユーザ取得
  const user = await getUser(request, context);
  if (user === null) { return json({ error: "Not logged in" });}

  // RLSをしてみる
   await client(user.id, async (tx) => {
    return tx.insert(schema.example).values({
      todoName: "wao",
      userId: user.id,
    });
  });

  const data = await client(user.id, async (tx) => {
    return tx.select().from(schema.example);
  });

  console.log(data);
  return json(data);
};

export default function SignIn() {
  return (
    <>
      test rls page
    </>
  );
}