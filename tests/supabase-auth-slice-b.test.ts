import { describe, expect, it } from "vitest"

describe("supabase auth slice B contracts", () => {
  it("publishes dedicated public routes for login, signup and password recovery", async () => {
    const login = await import("@/app/login/page")
    const signup = await import("@/app/signup/page")
    const recovery = await import("@/app/recover/page")

    expect(login.metadata).toMatchObject({ title: "Login | NexxaLife" })
    expect(signup.metadata).toMatchObject({ title: "Cadastro | NexxaLife" })
    expect(recovery.metadata).toMatchObject({ title: "Recuperar acesso | NexxaLife" })
  })

  it("contains real client auth surfaces for login, signup and recovery", async () => {
    const login = await import("@/app/login/page")
    const signup = await import("@/app/signup/page")
    const recovery = await import("@/app/recover/page")
    const loginForm = await import("@/components/auth/login-form")
    const signupForm = await import("@/components/auth/signup-form")
    const recoveryForm = await import("@/components/auth/recovery-form")

    expect(login.default.toString()).toContain("LoginForm")
    expect(signup.default.toString()).toContain("SignupForm")
    expect(recovery.default.toString()).toContain("RecoveryForm")

    expect(typeof loginForm.LoginForm).toBe("function")
    expect(typeof signupForm.SignupForm).toBe("function")
    expect(typeof recoveryForm.RecoveryForm).toBe("function")
  })

  it("exports client auth helpers for email login, signup and password recovery", async () => {
    const authClient = await import("@/lib/client/auth")

    expect(typeof authClient.signInWithPassword).toBe("function")
    expect(typeof authClient.signUpWithPassword).toBe("function")
    expect(typeof authClient.sendPasswordRecovery).toBe("function")
  })
})
