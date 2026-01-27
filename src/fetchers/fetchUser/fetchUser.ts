import { API_ENDPOINT } from "@/consts/consts"
import { userSchema } from "@/types/types"
import type { User } from "@/types/types"

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${API_ENDPOINT}/users`)

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`)
  }

  const data = await response.json()
  
  try {
    return userSchema.array().parse(data)
  } catch (error) {
    throw new Error(`Invalid user data format: ${error instanceof Error ? error.message : String(error)}`)
  }
}