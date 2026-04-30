export type AppContext = {
  tenantId: string
  workspaceId: string
}

export function toIso(value: unknown): string | undefined {
  if (!value) return undefined
  if (value instanceof Date) return value.toISOString()
  if (typeof value === "string") return value
  return new Date(String(value)).toISOString()
}
