import { z } from "zod"

export const sendMessageSchema = z.object({
  content: z.string().trim().min(1, "content is required"),
  mode: z.enum(["reply", "note"]),
  senderName: z.string().trim().min(1).optional(),
})

export const statusUpdateSchema = z.object({
  status: z.enum([
    "open",
    "pending_customer",
    "pending_internal",
    "in_automation",
    "escalated",
    "resolved",
    "snoozed",
  ]),
})

export function parseSendMessageInput(payload: unknown) {
  return sendMessageSchema.parse(payload)
}

export function parseStatusUpdateInput(payload: unknown) {
  return statusUpdateSchema.parse(payload)
}
