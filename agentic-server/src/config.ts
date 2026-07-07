function requireEnv(name: string): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(
      `Missing required environment variable: ${name}. Check your .env${
        process.env.NODE_ENV !== "production" ? ".test" : ""
      } file.`,
    );
  }
  return value;
}

export const AGENT_BASE_URL = requireEnv("AGENT_BASE_URL");
export const AGENT_CHAT = requireEnv("AGENT_CHAT");
export const MODEL = requireEnv("MODEL");
// Allowed to be an empty string: local LM Studio instances don't always require auth.
export const LMS_API_KEY = requireEnv("LMS_API_KEY");

// Optional: fall back to sane defaults so existing .env/.env.test files don't need updating.
export const RATE_LIMIT_MAX = Number(process.env["RATE_LIMIT_MAX"] ?? 5);
export const RATE_LIMIT_WINDOW_MS = Number(
  process.env["RATE_LIMIT_WINDOW_MS"] ?? 10_000,
);
