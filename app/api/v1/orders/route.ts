import { NextResponse } from "next/server"

import { listOrders } from "@/modules/orders/repository"

export async function GET() {
  return NextResponse.json({
    items: await listOrders(),
  })
}
