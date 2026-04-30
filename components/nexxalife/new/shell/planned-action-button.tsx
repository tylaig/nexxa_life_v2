"use client"

import type { ButtonHTMLAttributes } from "react"

import { toast } from "sonner"

import { cn } from "@/lib/utils"

export function PlannedActionButton({
  label,
  message,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  message: string
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200",
        className,
      )}
      onClick={() => toast.info(message)}
      {...props}
    >
      {label}
    </button>
  )
}
