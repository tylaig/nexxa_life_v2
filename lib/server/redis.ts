import IORedis from "ioredis"

import { getAppEnv } from "@/lib/server/env"

declare global {
  // eslint-disable-next-line no-var
  var __chatMeusuperRedis: IORedis | undefined
}

export function getRedisConnection() {
  const env = getAppEnv()

  if (!env.REDIS_URL || env.APP_DISABLE_QUEUE) {
    return null
  }

  if (!global.__chatMeusuperRedis) {
    global.__chatMeusuperRedis = new IORedis(env.REDIS_URL, {
      maxRetriesPerRequest: null,
      enableReadyCheck: true,
      lazyConnect: true,
    })
  }

  return global.__chatMeusuperRedis
}

export async function pingRedis() {
  const redis = getRedisConnection()

  if (!redis) {
    return null
  }

  if (redis.status === "wait") {
    await redis.connect()
  }

  return redis.ping()
}
