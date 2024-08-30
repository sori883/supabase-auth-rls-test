import { Hono } from "hono";
import { cors } from "hono/cors";
import type { Bindings } from "./bindings";
import { jwt, verify  } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";

type Variables = JwtVariables;

const app = new Hono<{ 
  Bindings: Bindings,
  Variables: Variables,
}>();

app.use(
  "*",
  cors({
    // eslint-disable-next-line
    origin: (_origin, c) => c.env.CORS_ORIGIN,
    allowHeaders: [
      "X-Custom-Header",
      "Upgrade-Insecure-Requests",
      "Content-Type",
    ],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
  }),
);

app.use(
  "/authmiddleware/*",
  async (c, next) => {
    const middleware = jwt({
      secret: c.env.SUPABASE_SECRET_KEY
    });
    return middleware(c, next);
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const route = app
  .get("/", (c) => c.json(c.env.GREETING))
  .get("/authin", async (c) => {
    const token = c.req.header("Authorization")?.split(" ")[1];
    // 取り合えずはいい感じ
    const decodedPayload = await verify(token!, c.env.SUPABASE_SECRET_KEY);
    console.log(decodedPayload);
    return c.json("hoge");
  })
  .get("/authmiddleware/authin", (c) => {
    console.log(c.var.jwtPayload);
    return c.json("foo");
  });

/**
 * Hono RRC type definition of API
 */
export type AppType = typeof route;

export default app;