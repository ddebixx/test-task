import { Button } from "@/components/ui/Button/Button"
import { twMerge } from "tailwind-merge"

interface QueryErrorStateProps {
  message: string
  onRetry: () => void
  ariaLabel?: string
  retryLabel?: string
  className?: string
  as?: "section" | "div"
}

const containerClass =
  "flex flex-col items-center justify-center gap-4 p-6"

export const QueryErrorState = ({
  message,
  onRetry,
  ariaLabel = "Error loading content",
  retryLabel = "Retry",
  className,
  as: Wrapper = "section",
}: QueryErrorStateProps) => (
  <Wrapper
    className={twMerge(containerClass, className)}
    aria-label={ariaLabel}
    {...(Wrapper === "div" ? { role: "region" as const } : {})}
  >
    <p className="text-destructive">{message}</p>
    <Button variant="outline" onClick={onRetry}>
      {retryLabel}
    </Button>
  </Wrapper>
)
