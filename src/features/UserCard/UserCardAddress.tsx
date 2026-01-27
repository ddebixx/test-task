import type { User } from "@/types/types"
import { MapPin, Navigation } from "lucide-react"

interface UserCardAddressProps {
  user: User
}

export const UserCardAddress = ({ user }: UserCardAddressProps) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
        Address
      </h3>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-muted shrink-0">
            <MapPin className="size-5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="text-sm font-medium">{user.address.city}</p>
            <p className="text-sm text-muted-foreground">
              {user.address.street}, {user.address.suite}
            </p>
            <p className="text-sm text-muted-foreground">
              {user.address.zipcode}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-muted">
            <Navigation className="size-5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">Coordinates</p>
            <p className="text-sm font-medium">
              {user.address.geo.lat}, {user.address.geo.lng}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
