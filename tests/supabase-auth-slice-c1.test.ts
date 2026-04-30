import { beforeEach, describe, expect, it, vi } from "vitest"

describe("supabase auth slice C1 contracts", () => {
  beforeEach(() => {
    vi.resetModules()
    vi.restoreAllMocks()
  })

  it("exports cookie helpers that set and clear both auth cookies", async () => {
    const authCookies = await import("@/lib/server/auth-cookies")
    const set = vi.fn()
    const del = vi.fn()

    authCookies.setAuthSessionCookies(
      { set } as any,
      {
        accessToken: "access-token",
        refreshToken: "refresh-token",
        expiresIn: 3600,
      }
    )

    expect(authCookies.AUTH_ACCESS_COOKIE).toBe("sb-access-token")
    expect(authCookies.AUTH_REFRESH_COOKIE).toBe("sb-refresh-token")
    expect(set).toHaveBeenCalledWith(
      "sb-access-token",
      "access-token",
      expect.objectContaining({ httpOnly: true, sameSite: "lax", path: "/", maxAge: 3600 })
    )
    expect(set).toHaveBeenCalledWith(
      "sb-refresh-token",
      "refresh-token",
      expect.objectContaining({ httpOnly: true, sameSite: "lax", path: "/" })
    )

    authCookies.clearAuthSessionCookies({ delete: del } as any)

    expect(del).toHaveBeenCalledWith("sb-access-token")
    expect(del).toHaveBeenCalledWith("sb-refresh-token")
  })

  it("persists a minimal app user profile in fallback mode and can mark onboarding complete", async () => {
    const repository = await import("@/modules/auth-profile/repository")

    await repository.resetAppUserProfileStore()

    const created = await repository.ensureAppUserProfile({
      userId: "user_123",
      email: "ana@example.com",
      fullName: "Ana Example",
      nickname: "Ana",
      phone: "+5511999999999",
    })

    expect(created).toMatchObject({
      userId: "user_123",
      email: "ana@example.com",
      fullName: "Ana Example",
      nickname: "Ana",
      phone: "+5511999999999",
      onboarded: false,
      onboardingStep: "profile",
    })

    const updated = await repository.upsertAppUserProfile({
      userId: "user_123",
      onboarded: true,
      onboardingStep: "dashboard",
    })

    expect(updated).toMatchObject({
      userId: "user_123",
      onboarded: true,
      onboardingStep: "dashboard",
    })

    const loaded = await repository.getAppUserProfile("user_123")

    expect(loaded).toMatchObject({
      userId: "user_123",
      onboarded: true,
      onboardingStep: "dashboard",
    })
  })

  it("publishes session, me and logout auth routes for server-side session orchestration", async () => {
    const sessionRoute = await import("@/app/api/auth/session/route")
    const meRoute = await import("@/app/api/auth/me/route")
    const logoutRoute = await import("@/app/api/auth/logout/route")

    expect(typeof sessionRoute.POST).toBe("function")
    expect(typeof meRoute.GET).toBe("function")
    expect(typeof logoutRoute.POST).toBe("function")
  })

  it("exports client session helpers for syncing password login and performing logout", async () => {
    const sessionClient = await import("@/lib/client/session")

    expect(typeof sessionClient.syncAuthSessionFromBrowserSession).toBe("function")
    expect(typeof sessionClient.signOutAppSession).toBe("function")
    expect(typeof sessionClient.fetchAuthenticatedAppUser).toBe("function")
  })
})
