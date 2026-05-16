import { getMerchantById } from "./merchants";
import type { QrMerchant } from "./merchants";

export function parseQrPayload(raw: string): QrMerchant | null {
  const text = raw.trim();

  // ACBECO:v1|merchantId
  if (text.startsWith("ACBECO:")) {
    const parts = text.split("|");
    if (parts.length >= 2) {
      const id = parts[1].trim();
      return getMerchantById(id) ?? null;
    }
  }

  // URL dạng https://domain/scan?m=vinbus
  try {
    const url = new URL(text);
    const id =
      url.searchParams.get("m") ??
      url.searchParams.get("merchant") ??
      url.pathname.split("/").filter(Boolean).pop();
    if (id) return getMerchantById(id) ?? null;
  } catch {
    /* not a URL */
  }

  // JSON
  try {
    const data = JSON.parse(text) as { id?: string; merchantId?: string };
    const id = data.id ?? data.merchantId;
    if (id) return getMerchantById(id) ?? null;
  } catch {
    /* not JSON */
  }

  return null;
}
