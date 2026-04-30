import type { OrderRow } from "@/lib/mock/orders"

export async function listOrders(): Promise<OrderRow[]> {
  const response = await fetch("/api/v1/orders", {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to load orders")
  }

  const payload = (await response.json()) as { items: OrderRow[] }
  return payload.items
}
