import type { CampaignItem } from "./campaign-types"

export type StatusFilter = "all" | CampaignItem["status"]
export type ObjectiveFilter = "all" | string
export type ChannelFilter = "all" | string

export function estimateRecipients(item: CampaignItem) {
  const seed = [...item.id].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return 180 + (seed % 970)
}

export function estimateReadRate(item: CampaignItem) {
  const seed = [...item.name].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return 42 + (seed % 31)
}

export function estimateReplyRate(item: CampaignItem) {
  const seed = [...item.templateId].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return 8 + (seed % 16)
}

export function estimateConversionRate(item: CampaignItem) {
  const seed = [...item.audienceId].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return 2 + (seed % 8)
}

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  })
}

export function isAttentionCampaign(item: CampaignItem) {
  return item.status === "paused" || item.status === "draft"
}

export function filterCampaigns({
  items,
  status,
  objective,
  channel,
  query,
}: {
  items: CampaignItem[]
  status: StatusFilter
  objective: ObjectiveFilter
  channel: ChannelFilter
  query: string
}) {
  return items.filter((item) => {
    if (status !== "all" && item.status !== status) return false
    if (objective !== "all" && item.objective !== objective) return false
    if (channel !== "all" && item.channel !== channel) return false
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      const hay = [
        item.name,
        item.objective,
        item.channel,
        item.audienceId,
        item.templateId,
        item.createdBy,
      ]
        .join(" ")
        .toLowerCase()
      if (!hay.includes(q)) return false
    }
    return true
  })
}

export function campaignFilterSummary({
  status,
  objective,
  channel,
  query,
}: {
  status: StatusFilter
  objective: ObjectiveFilter
  channel: ChannelFilter
  query: string
}) {
  return [
    status !== "all" ? `Status: ${status}` : null,
    objective !== "all" ? `Objetivo: ${objective.replaceAll("_", " ")}` : null,
    channel !== "all" ? `Canal: ${channel.toUpperCase()}` : null,
    query.trim() ? `Busca: ${query.trim()}` : null,
  ].filter(Boolean) as string[]
}

export function uniqueObjectives(items: CampaignItem[]) {
  return Array.from(new Set(items.map((item) => item.objective)))
}

export function uniqueChannels(items: CampaignItem[]) {
  return Array.from(new Set(items.map((item) => item.channel)))
}
