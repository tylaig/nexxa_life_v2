import type { PoolClient, QueryResult } from "pg"
import { Pool } from "pg"

import { getAppEnv } from "@/lib/server/env"

declare global {
  // eslint-disable-next-line no-var
  var __nexxaLifePool: Pool | undefined
}

export function getDbPool() {
  const env = getAppEnv()

  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured")
  }

  if (!global.__nexxaLifePool) {
    global.__nexxaLifePool = new Pool({
      connectionString: env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30_000,
    })
  }

  return global.__nexxaLifePool
}

import type { QueryResultRow } from "pg"

export async function dbQuery<T extends QueryResultRow = any>(text: string, params: unknown[] = []) {
  return getDbPool().query<T>(text, params)
}

export async function withDbClient<T>(
  handler: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await getDbPool().connect()

  try {
    return await handler(client)
  } finally {
    client.release()
  }
}

export async function runHealthQuery(): Promise<QueryResult<{ ok: number }>> {
  return dbQuery<{ ok: number }>("select 1 as ok")
}
