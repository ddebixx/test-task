import type { User } from "@/types/types"
import { Mail, Phone, Globe } from "lucide-react"

interface UserCardContactProps {
  user: User
}

export const UserCardContact = ({ user }: UserCardContactProps) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
        Contact Information
      </h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-muted">
            <Mail className="size-5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-sm font-medium truncate">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-muted">
            <Phone className="size-5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="text-sm font-medium">{user.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-muted">
            <Globe className="size-5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">Website</p>
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline truncate block"
            >
              {user.website}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
