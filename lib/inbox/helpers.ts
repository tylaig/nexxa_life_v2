import type { ConversationStatus, ConversationPriority } from "./types"

const NOW_REF = new Date("2026-04-27T15:32:00Z").getTime()

export function relativeTime(iso: string): string {
  if (!iso) return ""
  const then = new Date(iso).getTime()
  const diff = NOW_REF - then
  const abs = Math.abs(diff)
  const m = Math.round(abs / 60_000)
  const h = Math.round(abs / 3_600_000)
  const d = Math.round(abs / 86_400_000)
  const future = diff < 0
  let out: string
  if (abs < 60_000) out = "agora"
  else if (m < 60) out = `${m}min`
  else if (h < 24) out = `${h}h`
  else out = `${d}d`
  return future ? `em ${out}` : out
}

// Use a fixed timezone so server and client render identical strings
// (avoids hydration mismatch when the server runs in UTC and the client in another tz)
const TZ = "America/Sao_Paulo"

export function formatTime(iso: string): string {
  if (!iso) return ""
  const d = new Date(iso)
  return d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  })
}

export function formatDateTime(iso: string): string {
  if (!iso) return ""
  const d = new Date(iso)
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  })
}

function tzParts(iso: string) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: TZ,
  }).formatToParts(new Date(iso))
  const get = (t: string) => Number(fmt.find((p) => p.type === t)?.value)
  return { y: get("year"), m: get("month"), d: get("day") }
}

export function dayLabel(iso: string): string {
  if (!iso) return ""
  const target = tzParts(iso)
  const today = tzParts(new Date(NOW_REF).toISOString())
  const yest = tzParts(new Date(NOW_REF - 86_400_000).toISOString())
  if (target.y === today.y && target.m === today.m && target.d === today.d) return "Hoje"
  if (target.y === yest.y && target.m === yest.m && target.d === yest.d) return "Ontem"
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    timeZone: TZ,
  })
}

export function statusLabel(s: ConversationStatus): string {
  return {
    open: "Aberta",
    pending_customer: "Aguarda cliente",
    pending_internal: "Aguarda interno",
    in_automation: "Em automação",
    escalated: "Escalada",
    resolved: "Resolvida",
    snoozed: "Soneca",
  }[s]
}

export function statusToken(s: ConversationStatus): { fg: string; bg: string; dot: string } {
  return {
    open: {
      fg: "text-[var(--status-open)]",
      bg: "bg-[var(--status-open-bg)]",
      dot: "bg-[var(--status-open)]",
    },
    pending_customer: {
      fg: "text-[var(--status-pending)]",
      bg: "bg-[var(--status-pending-bg)]",
      dot: "bg-[var(--status-pending)]",
    },
    pending_internal: {
      fg: "text-[var(--status-pending)]",
      bg: "bg-[var(--status-pending-bg)]",
      dot: "bg-[var(--status-pending)]",
    },
    in_automation: {
      fg: "text-[var(--status-automation)]",
      bg: "bg-[var(--status-automation-bg)]",
      dot: "bg-[var(--status-automation)]",
    },
    escalated: {
      fg: "text-[var(--status-escalated)]",
      bg: "bg-[var(--status-escalated-bg)]",
      dot: "bg-[var(--status-escalated)]",
    },
    resolved: {
      fg: "text-[var(--status-resolved)]",
      bg: "bg-[var(--status-resolved-bg)]",
      dot: "bg-[var(--status-resolved)]",
    },
    snoozed: {
      fg: "text-[var(--status-snoozed)]",
      bg: "bg-[var(--status-snoozed-bg)]",
      dot: "bg-[var(--status-snoozed)]",
    },
  }[s]
}

export function priorityToken(p: ConversationPriority): { label: string; color: string } {
  return {
    urgent: { label: "Urgente", color: "text-[var(--status-escalated)]" },
    high: { label: "Alta", color: "text-[var(--status-pending)]" },
    normal: { label: "Normal", color: "text-muted-foreground" },
    low: { label: "Baixa", color: "text-muted-foreground" },
  }[p]
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// Stable color hash for avatars
export function avatarColor(seed: string): string {
  const palette = [
    "bg-[oklch(0.85_0.08_30)] text-[oklch(0.30_0.10_30)] dark:bg-[oklch(0.30_0.08_30)] dark:text-[oklch(0.90_0.08_30)]",
    "bg-[oklch(0.86_0.07_60)] text-[oklch(0.30_0.09_60)] dark:bg-[oklch(0.30_0.07_60)] dark:text-[oklch(0.92_0.08_60)]",
    "bg-[oklch(0.87_0.07_140)] text-[oklch(0.32_0.09_140)] dark:bg-[oklch(0.30_0.07_140)] dark:text-[oklch(0.90_0.08_140)]",
    "bg-[oklch(0.87_0.06_185)] text-[oklch(0.32_0.09_185)] dark:bg-[oklch(0.30_0.07_185)] dark:text-[oklch(0.92_0.08_185)]",
    "bg-[oklch(0.86_0.07_245)] text-[oklch(0.32_0.10_245)] dark:bg-[oklch(0.30_0.08_245)] dark:text-[oklch(0.90_0.08_245)]",
    "bg-[oklch(0.86_0.06_320)] text-[oklch(0.32_0.10_320)] dark:bg-[oklch(0.30_0.07_320)] dark:text-[oklch(0.90_0.07_320)]",
  ]
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return palette[h % palette.length]
}
