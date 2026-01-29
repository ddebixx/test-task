import type { User } from "@/types/types"
import { Building2, User as UserIcon } from "lucide-react"

interface UserCardCompanyProps {
  user: User
}

export const UserCardCompany = ({ user }: UserCardCompanyProps) => {
  return (
    <section aria-labelledby="company-heading">
      <h3 id="company-heading" className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
        Company
      </h3>
      <dl className="space-y-3">
        <div className="flex items-start gap-3">
          <dt className="flex items-center justify-center size-10 rounded-lg bg-muted shrink-0" aria-hidden="true">
            <Building2 className="size-5 text-muted-foreground" />
          </dt>
          <dd className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">Company Name</p>
            <p className="text-sm font-medium">{user.company.name}</p>
          </dd>
        </div>

        <div className="flex items-start gap-3">
          <dt className="flex items-center justify-center size-10 rounded-lg bg-muted shrink-0" aria-hidden="true">
            <UserIcon className="size-5 text-muted-foreground" />
          </dt>
          <dd className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">Catch Phrase</p>
            <p className="text-sm font-medium italic">
              "{user.company.catchPhrase}"
            </p>
          </dd>
        </div>

        <div className="flex items-start gap-3">
          <dt className="flex items-center justify-center size-10 rounded-lg bg-muted shrink-0" aria-hidden="true">
            <Building2 className="size-5 text-muted-foreground" />
          </dt>
          <dd className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">Business</p>
            <p className="text-sm font-medium">{user.company.bs}</p>
          </dd>
        </div>
      </dl>
    </section>
  )
}
