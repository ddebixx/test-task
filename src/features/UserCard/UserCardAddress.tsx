import type { User } from "@/types/types"
import { MapPin, Navigation } from "lucide-react"

interface UserCardAddressProps {
  user: User
}

export const UserCardAddress = ({ user }: UserCardAddressProps) => {
  return (
    <section aria-labelledby="address-heading">
      <h3 id="address-heading" className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
        Address
      </h3>
      <dl className="space-y-3">
        <div className="flex items-start gap-3">
          <dt className="flex items-center justify-center size-10 rounded-lg bg-muted shrink-0" aria-hidden="true">
            <MapPin className="size-5 text-muted-foreground" />
          </dt>
          <dd className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="text-sm font-medium">{user.address.city}</p>
            <p className="text-sm text-muted-foreground">
              {user.address.street}, {user.address.suite}
            </p>
            <p className="text-sm text-muted-foreground">
              {user.address.zipcode}
            </p>
          </dd>
        </div>

        <div className="flex items-center gap-3">
          <dt className="flex items-center justify-center size-10 rounded-lg bg-muted" aria-hidden="true">
            <Navigation className="size-5 text-muted-foreground" />
          </dt>
          <dd className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">Coordinates</p>
            <p className="text-sm font-medium">
              {user.address.geo.lat}, {user.address.geo.lng}
            </p>
          </dd>
        </div>
      </dl>
    </section>
  )
}
