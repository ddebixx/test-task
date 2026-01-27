import type { User } from "@/types/types"
import { Building2, User as UserIcon } from "lucide-react"

interface UserCardCompanyProps {
  user: User
}

export const UserCardCompany = ({ user }: UserCardCompanyProps) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
        Company
      </h3>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-muted shrink-0">
            <Building2 className="size-5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">Company Name</p>
            <p className="text-sm font-medium">{user.company.name}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-muted shrink-0">
            <UserIcon className="size-5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">Catch Phrase</p>
            <p className="text-sm font-medium italic">
              "{user.company.catchPhrase}"
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-muted shrink-0">
            <Building2 className="size-5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">Business</p>
            <p className="text-sm font-medium">{user.company.bs}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
