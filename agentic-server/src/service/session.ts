import { randomUUID } from "node:crypto";
import type { IncomingMessage } from "node:http";
import { URL } from "node:url";

const SESSION_HEADER_NAME = "x-session-id";
const SESSION_QUERY_PARAM = "session";

// Cookies can't be used here: the frontend (ihorlazarkov.github.io) and this
// server (agentic.ihorlazarkov-swe.in) are different sites, so a session
// cookie is a third-party cookie and gets blocked/partitioned by Safari ITP,
// Firefox ETP, and Chrome's third-party cookie policies regardless of
// SameSite=None/Secure. Instead the session id travels as plain data: issued
// in the /api/version response body, echoed back by the client as the
// X-Session-Id header (POST /api/generate) or a ?session= query param
// (GET /api/countdown, since EventSource can't set custom headers).
export function readSessionId(req: IncomingMessage): string | undefined {
  const header = req.headers[SESSION_HEADER_NAME];
  if (typeof header === "string" && header) return header;

  const url = new URL(req.url ?? "", "http://placeholder");
  return url.searchParams.get(SESSION_QUERY_PARAM) ?? undefined;
}

export function issueSessionId(): string {
  return randomUUID();
}
