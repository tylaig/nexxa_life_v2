export type Tenant = {
  id: string
  name: string
  domain: string
  plan: "growth" | "scale" | "enterprise"
}

export const tenants: Tenant[] = [
  { id: "games-safari", name: "Games Safari", domain: "gamessafari.com.br", plan: "scale" },
  { id: "game-box", name: "Game Box", domain: "gamebox.com.br", plan: "growth" },
  { id: "luma-cosmetics", name: "Luma Cosmetics", domain: "lumacosmetics.com", plan: "enterprise" },
]
