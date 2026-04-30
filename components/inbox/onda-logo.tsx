import { cn } from "@/lib/utils"

export function OndaLogo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground",
        className
      )}
      aria-label="Onda"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
        aria-hidden="true"
      >
        <path
          d="M3 14.5C5 14.5 5 11 7 11C9 11 9 14.5 11 14.5C13 14.5 13 11 15 11C17 11 17 14.5 19 14.5C20 14.5 20.5 14 21 13.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M3 18.5C5 18.5 5 15 7 15C9 15 9 18.5 11 18.5C13 18.5 13 15 15 15C17 15 17 18.5 19 18.5C20 18.5 20.5 18 21 17.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    </div>
  )
}
