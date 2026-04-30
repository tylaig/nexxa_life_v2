import { beforeEach, describe, expect, it, vi } from "vitest"

function clearEnv(keys: string[]) {
  for (const key of keys) {
    delete process.env[key]
  }
}

describe("supabase auth slice A contracts", () => {
  beforeEach(() => {
    vi.resetModules()
    vi.restoreAllMocks()
  })

  it("parses browser/public Supabase envs and app URL helpers", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co"
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_example"
    process.env.NEXT_PUBLIC_APP_URL = "https://app.example.com"
    process.env.SUPABASE_SERVICE_ROLE_KEY = "sb_secret_example"

    const env = await import("@/lib/server/env")

    expect(env.getSupabaseBrowserUrl()).toBe("https://example.supabase.co")
    expect(env.getSupabasePublishableKey()).toBe("sb_publishable_example")
    expect(env.hasSupabaseBrowserConfig()).toBe(true)
    expect(env.getAppBaseUrl()).toBe("https://app.example.com")
    expect(env.hasSupabaseConfig()).toBe(true)
  })

  it("falls back to SUPABASE_URL when NEXT_PUBLIC_SUPABASE_URL is absent", async () => {
    clearEnv(["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "NEXT_PUBLIC_APP_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"])

    process.env.SUPABASE_URL = "https://server-only.supabase.co"
    process.env.SUPABASE_SERVICE_ROLE_KEY = "sb_secret_example"

    const env = await import("@/lib/server/env")

    expect(env.getSupabaseBrowserUrl()).toBe("https://server-only.supabase.co")
    expect(env.getAppBaseUrl()).toBe("http://localhost:3000")
    expect(env.hasSupabaseBrowserConfig()).toBe(false)
  })

  it("publishes auth callback route and keeps public auth inventory in root app", async () => {
    const login = await import("@/app/login/page")
    const signup = await import("@/app/signup/page")
    const onboarding = await import("@/app/onboarding/page")
    const callback = await import("@/app/auth/callback/route")

    expect(login.metadata).toMatchObject({ title: "Login | NexxaLife" })
    expect(signup.metadata).toMatchObject({ title: "Cadastro | NexxaLife" })
    expect(onboarding.metadata).toMatchObject({ title: "Onboarding | NexxaLife" })
    expect(typeof callback.GET).toBe("function")
  })

  it("publishes proxy matcher for every protected top-level workspace route", async () => {
    const proxyModule = await import("../proxy")

    expect(proxyModule.config).toMatchObject({
      matcher: expect.arrayContaining([
        "/dashboard/:path*",
        "/diagnostic/:path*",
        "/checklist/:path*",
        "/agenda/:path*",
        "/goals/:path*",
        "/journal/:path*",
        "/reports/:path*",
        "/framework-admin/:path*",
        "/apps/:path*",
        "/(app)/:path*",
      ]),
    })

    expect(typeof proxyModule.proxy).toBe("function")
  })

  it("starts Google OAuth from the live browser origin and preserves the next path", async () => {
    const signOut = vi.fn().mockResolvedValue({ error: null })
    const signInWithOAuth = vi.fn().mockResolvedValue({ error: null })

    vi.doMock("@/lib/client/supabase", () => ({
      getSupabaseBrowserClient: () => ({
        auth: {
          signOut,
          signInWithOAuth,
        },
      }),
    }))

    vi.doMock("@/lib/server/env", () => ({
      hasSupabaseBrowserConfig: () => true,
      getAppBaseUrl: () => "https://configured.example.com",
    }))

    Object.defineProperty(globalThis, "window", {
      value: {
        location: {
          origin: "http://localhost:3001",
        },
      },
      configurable: true,
    })

    const { signInWithGoogle } = await import("@/lib/client/oauth")

    await signInWithGoogle("/reports?tab=weekly")

    expect(signOut).toHaveBeenCalledTimes(1)
    expect(signInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3001/auth/callback?next=%2Freports%3Ftab%3Dweekly",
      },
    })
  })
})
