import crypto from "crypto";

const SECRET = process.env.ADMIN_SECRET ?? "mabim-admin-secret-key-2026";
const MAX_AGE = 60 * 60 * 8;

export function sign(payload: string) {
  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(payload);
  return hmac.digest("hex");
}

export function createToken(): string {
  const ts = Date.now();
  const payload = `admin:${ts}`;
  const signature = sign(payload);
  return `${ts}.${signature}`;
}

export function validateSession(token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [tsStr, signature] = parts;
  const ts = Number(tsStr);
  if (Number.isNaN(ts)) return false;

  const payload = `admin:${ts}`;
  const expected = sign(payload);

  const sigBuf = Buffer.from(signature, "hex");
  const expBuf = Buffer.from(expected, "hex");
  if (sigBuf.length !== expBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return false;

  if (Date.now() - ts > MAX_AGE * 1000) return false;

  return true;
}
