import type { CreateUser, User } from "@/types/types"

export function userToCreateUserDefaults(user: User): CreateUser {
  return {
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    website: user.website,
    address: {
      street: user.address.street,
      suite: user.address.suite,
      city: user.address.city,
      zipcode: user.address.zipcode,
      geo: {
        lat: user.address.geo.lat,
        lng: user.address.geo.lng,
      },
    },
    company: {
      name: user.company.name,
      catchPhrase: user.company.catchPhrase,
      bs: user.company.bs,
    },
  }
}
