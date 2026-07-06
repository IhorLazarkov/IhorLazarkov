import { randomUUID } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";

const SESSION_COOKIE_NAME = "agentic_session";
const SESSION_MAX_AGE_S = 60 * 60; // 1 hour

export function readSessionId(req: IncomingMessage): string | undefined {
  const header = req.headers.cookie;
  if (!header) return undefined;
  const entry = header
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE_NAME}=`));
  return entry?.slice(SESSION_COOKIE_NAME.length + 1) || undefined;
}

export function issueSessionId(res: ServerResponse): string {
  const sessionId = randomUUID();
  // Secure+SameSite=None is required for the real cross-site HTTPS deployment
  // (github.io -> agentic.ihorlazarkov-swe.in), but browsers drop Secure cookies
  // entirely over plain HTTP, which local/QA backends use.
  const isProduction = process.env.NODE_ENV === "production";
  const attributes = isProduction
    ? "Secure; SameSite=None"
    : "SameSite=Lax";
  res.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE_NAME}=${sessionId}; Max-Age=${SESSION_MAX_AGE_S}; Path=/; HttpOnly; ${attributes}`,
  );
  return sessionId;
}
