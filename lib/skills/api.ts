export async function listSkills<T = unknown[]>(): Promise<T> {
  const response = await fetch("/api/v1/skills", { cache: "no-store" })
  if (!response.ok) throw new Error("Failed to load skills")
  const payload = (await response.json()) as { items: T }
  return payload.items
}

export async function createSkill<T = unknown>(input: unknown): Promise<T> {
  const response = await fetch("/api/v1/skills", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  })
  if (!response.ok) throw new Error("Failed to create skill")
  const payload = (await response.json()) as { item: T }
  return payload.item
}
