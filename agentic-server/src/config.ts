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
