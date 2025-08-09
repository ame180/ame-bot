import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const fileSchema = z.object({
  minXpPerMessage: z.number().int().positive(),
  maxXpPerMessage: z.number().int().positive(),
  xpCooldown: z.number().int().nonnegative(),
});

const envSchema = z.object({
  APP_HOST: z.string(),
  APP_PROTOCOL: z.string(),
  DISCORD_API_VERSION: z.string().default('10'),
  DISCORD_TOKEN: z.string(),
  DISCORD_CLIENT_ID: z.string(),
  API_KEY: z.string().optional(),
  MYSQL_DATABASE: z.string(),
  MYSQL_USER: z.string(),
  MYSQL_PASSWORD: z.string(),
});

export type AppFileConfig = z.infer<typeof fileSchema>;
export type AppEnvConfig = z.infer<typeof envSchema>;
export type AppConfig = AppFileConfig & AppEnvConfig;

function readConfigJson(): any {
  const filePath = path.join(process.cwd(), 'config.json');
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (e) {
    console.error('Failed reading config.json:', e);
  }
  return {};
}

function loadConfig(): AppConfig {
  const fileRaw = readConfigJson();
  const fileParsed = fileSchema.parse(fileRaw);
  const envParsed = envSchema.parse(process.env);
  return Object.freeze({ ...envParsed, ...fileParsed });
}

export const config: AppConfig = loadConfig();
