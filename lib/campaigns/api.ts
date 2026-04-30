export async function listCampaigns<T = unknown[]>(): Promise<T> {
  const response = await fetch("/api/v1/campaigns", { cache: "no-store" })
  if (!response.ok) throw new Error("Failed to load campaigns")
  const payload = (await response.json()) as { items: T }
  return payload.items
}

export async function getCampaign<T = unknown>(campaignId: string): Promise<T> {
  const response = await fetch(`/api/v1/campaigns/${campaignId}`, { cache: "no-store" })
  if (!response.ok) throw new Error("Failed to load campaign")
  const payload = (await response.json()) as { item: T }
  return payload.item
}

export async function createCampaign<T = unknown>(input: unknown): Promise<T> {
  const response = await fetch("/api/v1/campaigns", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  })
  if (!response.ok) throw new Error("Failed to create campaign")
  const payload = (await response.json()) as { item: T }
  return payload.item
}

export async function updateCampaign<T = unknown>(campaignId: string, input: unknown): Promise<T> {
  const response = await fetch(`/api/v1/campaigns/${campaignId}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  })
  if (!response.ok) throw new Error("Failed to update campaign")
  const payload = (await response.json()) as { item: T }
  return payload.item
}
