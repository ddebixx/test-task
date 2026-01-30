import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button/Button"
import { CardContent } from "@/components/ui/Card/Card"
import type { User } from "@/types/types"
import { UserCardHeader } from "./UserCardHeader"
import { UserCardContact } from "./UserCardContact"
import { UserCardAddress } from "./UserCardAddress"
import { UserCardCompany } from "./UserCardCompany"

interface UserCardProps {
  user: User
  showNavigateButton?: boolean
  showContact?: boolean
  showAddress?: boolean
  showCompany?: boolean
}

export const UserCard = ({
  user,
  showNavigateButton = true,
  showContact = true,
  showAddress = true,
  showCompany = true,
}: UserCardProps) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/users/${user.id}`)
  }

  return (
    <article className="space-y-6" aria-label={`User profile: ${user.name}`}>
      <UserCardHeader user={user} />

    {/* User card is separated into multiple components for better readability and reusability
    This will allow us to reuse individaual parts of it in other components if needed
    Without any need to rewrite the entire component */}

      <CardContent className="space-y-6">
        <div className="space-y-4">
          {showContact && <UserCardContact user={user} />}
          {showAddress && <UserCardAddress user={user} />}
          {showCompany && <UserCardCompany user={user} />}
        </div>

        {showNavigateButton && (
          <footer className="pt-4 border-t">
            <Button onClick={handleNavigate} className="w-full" size="lg">
              View User Page
            </Button>
          </footer>
        )}
      </CardContent>
    </article>
  )
}
