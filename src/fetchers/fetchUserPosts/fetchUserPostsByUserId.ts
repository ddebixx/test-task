import { API_ENDPOINT } from "@/consts/consts"
import { postSchema } from "@/types/types"
import type { Post } from "@/types/types"

export async function fetchUserPostsByUserId(userId: string): Promise<Post[]> {
  const response = await fetch(`${API_ENDPOINT}/posts?userId=${userId}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`)
  }

  const data = await response.json()

  try {
    return postSchema.array().parse(data)
  } catch (error) {
    throw new Error(
      `Invalid posts data format: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}