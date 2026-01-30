import { API_ENDPOINT } from "@/consts/consts"
import { commentSchema } from "@/types/types"
import type { Comment } from "@/types/types"

export const fetchCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  const response = await fetch(`${API_ENDPOINT}/posts/${postId}/comments`)

  if (!response.ok) {
    throw new Error(`Failed to fetch comments: ${response.statusText}`)
  }

  const data = await response.json()

  const result = commentSchema.array().safeParse(data)

  if (!result.success) {
    throw new Error(`Invalid comment data format: ${result.error.message}`)
  } else {
    return result.data
  }
}

