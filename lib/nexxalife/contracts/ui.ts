export type NavigationWave = "phase1" | "phase2" | "phase3" | "phase4"

export type NexxaLifeRouteDefinition = {
  key: string
  path: string
  label: string
  wave: NavigationWave
  domain: string
}

export type NexxaLifePageAction = {
  label: string
  href?: string
  tone?: "primary" | "secondary" | "ghost"
}

export type NexxaLifePageState = "ready" | "loading" | "empty" | "error" | "blocked"
