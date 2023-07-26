import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "PUBLIC_",
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["production", "development", "test"]),
  },
  client: {
    PUBLIC_KEY: z.string(),
  },
  runtimeEnv: process.env,
});
