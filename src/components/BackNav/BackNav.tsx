import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button/Button"
import { ArrowLeft } from "lucide-react"
import { twMerge } from "tailwind-merge"

interface BackNavProps {
  variant?: "ghost" | "outline"
  className?: string
}

export const BackNav = ({ variant = "ghost", className }: BackNavProps) => {
  const navigate = useNavigate()

  return (
    <nav aria-label="Back">
      <Button
        variant={variant}
        onClick={() => navigate(-1)}
        className={twMerge("w-fit", className)}
      >
        <ArrowLeft className="size-4 mr-2" />
        Back
      </Button>
    </nav>
  )
}
