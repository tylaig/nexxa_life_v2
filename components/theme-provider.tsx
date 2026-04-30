"use client"

import * as React from "react"

type Theme = "light" | "dark" | "system"
type ResolvedTheme = "light" | "dark"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  enableSystem?: boolean
  attribute?: "class" | `data-${string}`
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = React.createContext<ThemeProviderState | null>(null)
const STORAGE_KEY = "onda-theme"

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function applyTheme(attribute: ThemeProviderProps["attribute"], resolvedTheme: ResolvedTheme) {
  const root = document.documentElement

  if (attribute === "class") {
    root.classList.remove("light", "dark")
    root.classList.add(resolvedTheme)
    return
  }

  root.setAttribute(attribute ?? "data-theme", resolvedTheme)
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
  attribute = "class",
  disableTransitionOnChange,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>("dark")

  const setTheme = React.useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, nextTheme)
    }
  }, [])

  React.useEffect(() => {
    const storedTheme = typeof window !== "undefined" ? (window.localStorage.getItem(STORAGE_KEY) as Theme | null) : null
    const initialTheme = storedTheme ?? defaultTheme
    setThemeState(initialTheme)
  }, [defaultTheme])

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")

    const updateResolvedTheme = () => {
      const nextResolvedTheme = theme === "system" && enableSystem ? getSystemTheme() : (theme as ResolvedTheme)
      setResolvedTheme(nextResolvedTheme)

      if (disableTransitionOnChange) {
        document.documentElement.classList.add("[&_*]:!transition-none")
        window.setTimeout(() => {
          document.documentElement.classList.remove("[&_*]:!transition-none")
        }, 0)
      }

      applyTheme(attribute, nextResolvedTheme)
    }

    updateResolvedTheme()
    media.addEventListener("change", updateResolvedTheme)
    return () => media.removeEventListener("change", updateResolvedTheme)
  }, [attribute, disableTransitionOnChange, enableSystem, theme])

  return (
    <ThemeProviderContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeProviderContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }

  return context
}
