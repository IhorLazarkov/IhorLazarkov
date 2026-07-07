type TRateLimiterOptions = {
  limit: number;
  windowMs: number;
  clock?: () => number;
};

type TRateLimitResult = {
  allowed: boolean;
  retryAfterMs: number;
};

type TEntry = {
  count: number;
  resetAt: number;
};

export default class RateLimiter {
  private limit: number;
  private windowMs: number;
  private clock: () => number;
  private entries: Map<string, TEntry> = new Map();

  constructor({ limit, windowMs, clock = Date.now }: TRateLimiterOptions) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.clock = clock;
  }

  check(key: string): TRateLimitResult {
    const now = this.clock();
    this.evictExpired(now);

    const entry = this.entries.get(key);
    if (!entry) {
      this.entries.set(key, { count: 1, resetAt: now + this.windowMs });
      return { allowed: true, retryAfterMs: 0 };
    }

    if (entry.count < this.limit) {
      entry.count += 1;
      return { allowed: true, retryAfterMs: 0 };
    }

    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  size(): number {
    return this.entries.size;
  }

  remainAwait(session: string): number {
    const entry = this.entries.get(session)
    if (!entry) return -1;
    const now = this.clock();
    return entry.resetAt - now;
  }

  private evictExpired(now: number): void {
    for (const [key, entry] of this.entries) {
      if (entry.resetAt <= now) {
        this.entries.delete(key);
      }
    }
  }
}
