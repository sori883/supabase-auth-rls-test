import { Hono } from "hono";
import { cors } from "hono/cors";

import type { Bindings } from "./bindings";

const app = new Hono<{ Bindings: Bindings }>();

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

app.get("/", (c) => c.text(c.env.CORS_ORIGIN));

export default app;
