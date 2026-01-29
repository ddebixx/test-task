import { queryOptions } from "@tanstack/react-query"
import { fetchUserPostsByUserId } from "@/fetchers/fetchUserPosts/fetchUserPostsByUserId"

export const userPostsQueryKey = (userId: string) => {
  return ["userPosts", userId] as const
}

export const userPostsQueryOptions = (userId: string) => {
  return queryOptions({
    queryKey: userPostsQueryKey(userId),
    queryFn: () => fetchUserPostsByUserId(userId),
  })
}