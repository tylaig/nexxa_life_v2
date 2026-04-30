export async function listIntegrations<T = unknown[]>(): Promise<T> {
  const response = await fetch("/api/v1/integrations", { cache: "no-store" })
  if (!response.ok) throw new Error("Failed to load integrations")
  const payload = (await response.json()) as { items: T }
  return payload.items
}

export async function createIntegration<T = unknown>(input: unknown): Promise<T> {
  const response = await fetch("/api/v1/integrations", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  })
  if (!response.ok) throw new Error("Failed to create integration")
  const payload = (await response.json()) as { item: T }
  return payload.item
}

export async function getIntegration<T = unknown>(integrationId: string): Promise<T> {
  const response = await fetch(`/api/v1/integrations/${integrationId}`, { cache: "no-store" })
  if (!response.ok) throw new Error("Failed to load integration")
  const payload = (await response.json()) as { item: T }
  return payload.item
}

export async function updateIntegration<T = unknown>(integrationId: string, input: unknown): Promise<T> {
  const response = await fetch(`/api/v1/integrations/${integrationId}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  })
  if (!response.ok) throw new Error("Failed to update integration")
  const payload = (await response.json()) as { item: T }
  return payload.item
}

export async function runIntegrationHealthCheck<T = unknown>(input: unknown): Promise<T> {
  const response = await fetch("/api/v1/integrations/health", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  })
  if (!response.ok) throw new Error("Failed to validate integration")
  const payload = (await response.json()) as { item: T }
  return payload.item
}
