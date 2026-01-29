import { queryOptions } from "@tanstack/react-query"
import { fetchUserById } from "@/fetchers/fetchUser/fetchUserById"

export const userQueryKey = (slug: string) => {
  return ["user", slug] as const
}

export const userQueryOptions = (slug: string) => {
  return queryOptions({
    queryKey: userQueryKey(slug),
    queryFn: () => fetchUserById(slug),
  })
}
