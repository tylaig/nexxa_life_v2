"use client"

import * as React from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

type ButtonProps = React.ComponentProps<typeof Button>

type PlannedActionButtonProps = ButtonProps & {
  message: string
}

export function PlannedActionButton({ message, onClick, children, ...props }: PlannedActionButtonProps) {
  return (
    <Button
      {...props}
      onClick={(event) => {
        onClick?.(event)
        toast.success(`${message} registrado no frontend-first. Persistência administrativa entra na próxima rodada.`)
      }}
    >
      {children}
    </Button>
  )
}
