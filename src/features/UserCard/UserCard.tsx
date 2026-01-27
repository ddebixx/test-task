import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button/button"
import { CardContent } from "@/components/ui/Card/card"
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

  function handleNavigate() {
    navigate(`/users/${user.id}`)
  }

  return (
    <div className="space-y-6">
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
          <div className="pt-4 border-t">
            <Button onClick={handleNavigate} className="w-full" size="lg">
              View User Page
            </Button>
          </div>
        )}
      </CardContent>
    </div>
  )
}
