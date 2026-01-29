import { queryOptions } from "@tanstack/react-query"
import { fetchUsers } from "@/fetchers/fetchUser/fetchUser"

export const usersQueryKey = ["users"] as const

export const usersQueryOptions = () => {
  return queryOptions({
    queryKey: usersQueryKey,
    queryFn: fetchUsers,
  })
}
