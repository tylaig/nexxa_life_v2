import * as React from "react"
import { cn } from "@/lib/utils"

export const PageContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mx-auto w-full max-w-6xl p-4 md:p-6 lg:p-8 flex flex-col gap-8", className)}
        {...props}
      />
    )
  }
)
PageContainer.displayName = "PageContainer"
