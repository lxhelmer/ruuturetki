import dotenv from 'dotenv'
dotenv.config()
import { createEnv } from "@t3-oss/env-core";
import { z } from 'zod'

export const env = createEnv({
    server: {
      MONGODB_URI: z.string().url(),
      PORT: z.string(),
      DB_NAME: z.string(),
      JWT_SECRET: z.string(),
    },
    runtimeEnv: process.env
})

