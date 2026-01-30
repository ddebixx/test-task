import { twMerge } from "tailwind-merge"
import type { ReactNode } from "react"

interface QueryEmptyStateProps {
  message: string
  ariaLabel?: string
  icon?: ReactNode
  className?: string
  messageClassName?: string
  as?: "section" | "div"
}

const containerClass = "flex flex-col items-center justify-center p-6"

export const QueryEmptyState = ({
  message,
  ariaLabel = "No content",
  icon,
  className,
  messageClassName,
  as: Wrapper = "section",
}: QueryEmptyStateProps) => (
  <Wrapper
    className={twMerge(containerClass, className)}
    aria-label={ariaLabel}
    {...(Wrapper === "div" ? { role: "region" as const } : {})}
  >
    {icon}
    <p className={twMerge("text-muted-foreground", icon && "mt-3", messageClassName)}>{message}</p>
  </Wrapper>
)
