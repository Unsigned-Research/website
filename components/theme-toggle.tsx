"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="h-8 w-20 animate-pulse rounded-full bg-black/5 dark:bg-white/10"
      />
    )
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme
  const isDark = currentTheme === "dark"

  return (
    <div className="flex shrink-0 items-center gap-3 text-[var(--text-muted)]">
      <Sun
        className={cn(
          "h-4 w-4 transition-colors",
          isDark ? "text-[var(--text-muted)]" : "text-[var(--accent)]",
        )}
        aria-hidden="true"
      />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle dark mode"
        className="data-[state=checked]:bg-[var(--accent)]"
      />
      <Moon
        className={cn(
          "h-4 w-4 transition-colors",
          isDark ? "text-[var(--accent)]" : "text-[var(--text-muted)]",
        )}
        aria-hidden="true"
      />
    </div>
  )
}

