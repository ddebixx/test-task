import { Avatar, AvatarFallback } from "@/components/ui/Avatar/avatar"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/Card/card"
import { getInitials } from "@/helpers/helpers"
import type { User } from "@/types/types"

interface UserCardHeaderProps {
  user: User
}

export const UserCardHeader = ({ user }: UserCardHeaderProps) => {
  return (
    <CardHeader>
      <div className="flex items-center gap-4">
        <Avatar size="lg">
          <AvatarFallback className="text-lg">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <CardDescription className="text-base">@{user.username}</CardDescription>
        </div>
      </div>
    </CardHeader>
  )
}
