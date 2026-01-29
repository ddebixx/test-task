import type { User } from "@/types/types"
import { Mail, Phone, Globe } from "lucide-react"

interface UserCardContactProps {
  user: User
}

export const UserCardContact = ({ user }: UserCardContactProps) => {
  return (
    <section aria-labelledby="contact-heading">
      <h3 id="contact-heading" className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
        Contact Information
      </h3>
      <dl className="space-y-3">
        <div className="flex items-center gap-3">
          <dt className="flex items-center justify-center size-10 rounded-lg bg-muted" aria-hidden="true">
            <Mail className="size-5 text-muted-foreground" />
          </dt>
          <dd className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-sm font-medium truncate">{user.email}</p>
          </dd>
        </div>

        <div className="flex items-center gap-3">
          <dt className="flex items-center justify-center size-10 rounded-lg bg-muted" aria-hidden="true">
            <Phone className="size-5 text-muted-foreground" />
          </dt>
          <dd className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="text-sm font-medium">{user.phone}</p>
          </dd>
        </div>

        <div className="flex items-center gap-3">
          <dt className="flex items-center justify-center size-10 rounded-lg bg-muted" aria-hidden="true">
            <Globe className="size-5 text-muted-foreground" />
          </dt>
          <dd className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">Website</p>
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline truncate block"
            >
              {user.website}
            </a>
          </dd>
        </div>
      </dl>
    </section>
  )
}
