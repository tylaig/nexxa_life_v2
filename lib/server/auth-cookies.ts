const secure = process.env.NODE_ENV === "production"

export const AUTH_ACCESS_COOKIE = "sb-access-token"
export const AUTH_REFRESH_COOKIE = "sb-refresh-token"

type CookieStoreLike = {
  set: (name: string, value: string, options?: Record<string, unknown>) => void
  delete: (name: string) => void
}

export function setAuthSessionCookies(
  cookieStore: CookieStoreLike,
  input: {
    accessToken: string
    refreshToken: string
    expiresIn: number
  }
) {
  cookieStore.set(AUTH_ACCESS_COOKIE, input.accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: input.expiresIn,
  })

  cookieStore.set(AUTH_REFRESH_COOKIE, input.refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })
}

export function clearAuthSessionCookies(cookieStore: CookieStoreLike) {
  cookieStore.delete(AUTH_ACCESS_COOKIE)
  cookieStore.delete(AUTH_REFRESH_COOKIE)
}
