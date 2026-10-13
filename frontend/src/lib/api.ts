const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  company: string | null;
  status: string;
  source: string;
  last_interaction_at: string | null;
  created_at: string;
};

export type Interaction = {
  id: string;
  lead_id: string;
  channel: string;
  direction: "inbound" | "outbound";
  content: string;
  created_at: string;
};

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}/api/v1${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    cache: "no-store",
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.detail ?? `Falha na API (${response.status})`);
  }
  return response.json() as Promise<T>;
}
