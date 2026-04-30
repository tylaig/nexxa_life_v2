import { startPlatformWorker } from "../modules/queue/platform-events"

const worker = startPlatformWorker()

worker.on("completed", (job) => {
  console.log(`completed ${job?.id ?? "unknown"}`)
})

worker.on("failed", (job, error) => {
  console.error(`failed ${job?.id ?? "unknown"}: ${error.message}`)
})

console.log("platform worker listening")
