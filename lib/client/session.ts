"use client"

import { getSupabaseBrowserClient } from "@/lib/client/supabase"

export async function syncAuthSessionFromBrowserSession() {
  const supabase = getSupabaseBrowserClient()
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    throw error
  }

  if (!session?.access_token || !session.refresh_token) {
    throw new Error("Nenhuma sessão ativa do Supabase foi encontrada no navegador")
  }

  const response = await fetch("/api/auth/session", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
      expiresIn: session.expires_in ?? 3600,
    }),
  })

  if (!response.ok) {
    throw new Error("Não foi possível sincronizar a sessão autenticada com o servidor")
  }

  return response.json()
}

export async function fetchAuthenticatedAppUser() {
  const response = await fetch("/api/auth/me", {
    method: "GET",
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Não foi possível carregar o estado autenticado atual")
  }

  return response.json()
}

export async function signOutAppSession() {
  const supabase = getSupabaseBrowserClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }

  const response = await fetch("/api/auth/logout", {
    method: "POST",
  })

  if (!response.ok) {
    throw new Error("Não foi possível encerrar a sessão atual")
  }

  return response.json()
}
