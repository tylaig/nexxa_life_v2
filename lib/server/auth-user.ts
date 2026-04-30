import { cookies } from "next/headers"

import { AUTH_ACCESS_COOKIE } from "@/lib/server/auth-cookies"
import { getSupabaseAdminClient } from "@/lib/server/supabase"
import { ensureAppUserProfile, getAppUserProfile } from "@/modules/auth-profile/repository"

export async function getAuthenticatedAppUser() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(AUTH_ACCESS_COOKIE)?.value

  if (!accessToken) {
    return null
  }

  const supabase = getSupabaseAdminClient()
  const { data, error } = await supabase.auth.getUser(accessToken)

  if (error || !data.user) {
    return null
  }

  const metadata = (data.user.user_metadata ?? {}) as Record<string, unknown>
  const email = data.user.email ?? `${data.user.id}@example.local`

  const existingProfile = await getAppUserProfile(data.user.id)
  const profile =
    existingProfile ??
    (await ensureAppUserProfile({
      userId: data.user.id,
      email,
      fullName: typeof metadata.full_name === "string" ? metadata.full_name : email,
      nickname: typeof metadata.nickname === "string" ? metadata.nickname : undefined,
      phone: typeof metadata.phone === "string" ? metadata.phone : undefined,
    }))

  return {
    user: {
      id: data.user.id,
      email,
      fullName: profile.fullName,
      nickname: profile.nickname,
      phone: profile.phone,
    },
    profile,
  }
}
