import baseConfig from "@acme/eslint-config/base";
import honoConfig from "@acme/eslint-config/hono";

/** @type {import('typescript-eslint').Config} */
export default [...baseConfig, ...honoConfig];
