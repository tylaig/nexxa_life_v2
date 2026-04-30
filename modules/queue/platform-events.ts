import { Queue, Worker } from "bullmq"

import { getAppEnv } from "@/lib/server/env"
import { getRedisConnection } from "@/lib/server/redis"

export type PlatformEventJob = {
  type: "conversation.message.sent" | "conversation.status.updated"
  tenantId: string
  workspaceId: string
  conversationId: string
  payload: Record<string, unknown>
}

const QUEUE_NAME = "platform-events"

let queueInstance: Queue<PlatformEventJob> | null | undefined

function getQueue() {
  if (queueInstance !== undefined) {
    return queueInstance
  }

  const connection = getRedisConnection()

  if (!connection) {
    queueInstance = null
    return queueInstance
  }

  queueInstance = new Queue<PlatformEventJob>(QUEUE_NAME, {
    connection,
    defaultJobOptions: {
      attempts: 5,
      removeOnComplete: 100,
      removeOnFail: 200,
      backoff: {
        type: "exponential",
        delay: 2_000,
      },
    },
  })

  return queueInstance
}

export async function enqueuePlatformEvent(job: PlatformEventJob) {
  const queue = getQueue()

  if (!queue) {
    return { queued: false }
  }

  await queue.add(job.type, job, {
    jobId: `${job.type}:${job.conversationId}:${Date.now()}`,
  })

  return { queued: true }
}

export function startPlatformWorker() {
  const connection = getRedisConnection()

  if (!connection) {
    throw new Error("REDIS_URL is not configured for worker execution")
  }

  const env = getAppEnv()
  return new Worker<PlatformEventJob>(
    QUEUE_NAME,
    async (job) => {
      console.log(
        JSON.stringify({
          service: env.APP_SERVICE_NAME,
          queue: QUEUE_NAME,
          jobId: job.id,
          jobName: job.name,
          conversationId: job.data.conversationId,
          type: job.data.type,
          timestamp: new Date().toISOString(),
        })
      )
    },
    {
      connection,
      concurrency: 5,
    }
  )
}
