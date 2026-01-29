import { queryOptions } from "@tanstack/react-query"
import { fetchCommentsByPostId } from "@/fetchers/fetchUserPosts/fetchCommentsByPostId"

export const commentsQueryKey = (postId: number) => {
  return ["comments", postId] as const
}

export const commentsQueryOptions = (postId: number) => {
  return queryOptions({
    queryKey: commentsQueryKey(postId),
    queryFn: () => fetchCommentsByPostId(postId),
  })
}
