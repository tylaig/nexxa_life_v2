import type { CrmContact } from "@/lib/mock/contacts"

export async function listContacts(): Promise<CrmContact[]> {
  const response = await fetch("/api/v1/contacts", {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to load contacts")
  }

  const payload = (await response.json()) as { items: CrmContact[] }
  return payload.items
}
