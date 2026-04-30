"use client"

import * as React from "react"

import { tenants } from "@/lib/mock/tenants"

const STORAGE_KEY = "onda.active-workspace-id"
const DEFAULT_WORKSPACE = tenants[0]

function readWorkspaceId() {
  if (typeof window === "undefined") return DEFAULT_WORKSPACE.id
  return window.localStorage.getItem(STORAGE_KEY) ?? DEFAULT_WORKSPACE.id
}

function resolveWorkspace(workspaceId: string) {
  return tenants.find((tenant) => tenant.id === workspaceId) ?? DEFAULT_WORKSPACE
}

export function useActiveWorkspace() {
  const [workspaceId, setWorkspaceId] = React.useState(DEFAULT_WORKSPACE.id)

  React.useEffect(() => {
    const next = readWorkspaceId()
    setWorkspaceId(next)

    function handleStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY && event.newValue) {
        setWorkspaceId(event.newValue)
      }
    }

    function handleCustomEvent(event: Event) {
      const detail = (event as CustomEvent<{ workspaceId: string }>).detail
      if (detail?.workspaceId) setWorkspaceId(detail.workspaceId)
    }

    window.addEventListener("storage", handleStorage)
    window.addEventListener("workspace-change", handleCustomEvent as EventListener)
    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener("workspace-change", handleCustomEvent as EventListener)
    }
  }, [])

  const setActiveWorkspaceId = React.useCallback((nextId: string) => {
    const valid = resolveWorkspace(nextId)
    window.localStorage.setItem(STORAGE_KEY, valid.id)
    setWorkspaceId(valid.id)
    window.dispatchEvent(new CustomEvent("workspace-change", { detail: { workspaceId: valid.id } }))
  }, [])

  return {
    activeWorkspace: resolveWorkspace(workspaceId),
    setActiveWorkspaceId,
  }
}
