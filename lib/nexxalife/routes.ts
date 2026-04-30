import type { NexxaLifeRouteDefinition } from "./contracts"

export const nexxaLifeRoutes: NexxaLifeRouteDefinition[] = [
  { key: "overview", path: "/nexxalife", label: "Dashboard", wave: "phase1", domain: "dashboard" },
  { key: "onboarding", path: "/nexxalife/onboarding", label: "Onboarding", wave: "phase1", domain: "onboarding" },
  { key: "goals", path: "/nexxalife/goals", label: "Objetivos & Metas", wave: "phase1", domain: "goals" },
  { key: "checklist", path: "/nexxalife/checklist", label: "Checklist", wave: "phase1", domain: "checklist" },
  { key: "diagnostic", path: "/nexxalife/diagnostic", label: "Diagnóstico", wave: "phase2", domain: "diagnostic" },
  { key: "agenda", path: "/nexxalife/agenda", label: "Agenda", wave: "phase3", domain: "agenda" },
  { key: "diary", path: "/nexxalife/diary", label: "Diário", wave: "phase3", domain: "diary" },
  { key: "reports", path: "/nexxalife/reports", label: "Relatórios", wave: "phase3", domain: "reports" },
  { key: "admin", path: "/nexxalife/admin", label: "Framework/Admin", wave: "phase2", domain: "framework" },
]
