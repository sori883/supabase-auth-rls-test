import baseConfig from "@acme/eslint-config/base";
import honoConfig from "@acme/eslint-config/hono";
import reactConfig from "@acme/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [...baseConfig, ...honoConfig, ...reactConfig];
