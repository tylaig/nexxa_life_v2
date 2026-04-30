import { describe, expect, it } from "vitest"

describe("nexxa_life auth and route adaptation contracts", () => {
  it("publishes the planned auth route inventory in the root app", async () => {
    const login = await import("@/app/login/page")
    const signup = await import("@/app/signup/page")
    const onboarding = await import("@/app/onboarding/page")

    expect(login.metadata).toMatchObject({
      title: "Login | nexxa_life",
    })
    expect(signup.metadata).toMatchObject({
      title: "Cadastro | nexxa_life",
    })
    expect(onboarding.metadata).toMatchObject({
      title: "Onboarding | nexxa_life",
    })
  })
})
