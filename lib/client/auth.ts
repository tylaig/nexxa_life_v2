"use client"

import { getSupabaseBrowserClient } from "@/lib/client/supabase"

export async function signInWithPassword(input: { email: string; password: string }) {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  })

  if (error) {
    throw error
  }

  return data
}

export async function signUpWithPassword(input: {
  email: string
  password: string
  fullName: string
  nickname?: string
  phone?: string
}) {
  const supabase = getSupabaseBrowserClient()
  const emailRedirectTo = new URL("/auth/callback", window.location.origin)
  emailRedirectTo.searchParams.set("next", "/onboarding")

  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      emailRedirectTo: emailRedirectTo.toString(),
      data: {
        full_name: input.fullName,
        nickname: input.nickname || undefined,
        phone: input.phone || undefined,
      },
    },
  })

  if (error) {
    throw error
  }

  return data
}

export async function sendPasswordRecovery(input: { email: string }) {
  const supabase = getSupabaseBrowserClient()
  const redirectTo = new URL("/login", window.location.origin)
  redirectTo.searchParams.set("recovered", "1")

  const { data, error } = await supabase.auth.resetPasswordForEmail(input.email, {
    redirectTo: redirectTo.toString(),
  })

  if (error) {
    throw error
  }

  return data
}
