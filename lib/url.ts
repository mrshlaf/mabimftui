export function safeExternalUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;
  try {
    const parsed = new URL(trimmed);
    if (
      parsed.protocol === "http:" ||
      parsed.protocol === "https:" ||
      parsed.protocol === "line:" ||
      parsed.protocol === "tel:"
    ) {
      return trimmed;
    }
  } catch {
    return null;
  }
  return null;
}

function toInternational(noTelp: string): string {
  const digits = noTelp.replace(/\D/g, "");
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return "62" + digits.slice(1);
  return "62" + digits;
}

export function phoneToTel(noTelp: string): string {
  return `tel:+${toInternational(noTelp)}`;
}

export function phoneToWa(noTelp: string): string {
  return `https://wa.me/${toInternational(noTelp)}`;
}
