import { API_ENDPOINT } from "@/consts/consts"
import { userSchema } from "@/types/types"
import type { User } from "@/types/types"
import type { CreateUser } from "@/types/types"

export const createUser = async (userData: CreateUser): Promise<User> => {
  const response = await fetch(`${API_ENDPOINT}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error(`Failed to create user: ${response.statusText}`)
  }

  const data = await response.json()

  try {
    return userSchema.parse(data)
  } catch (error) {
    throw new Error(
      `Invalid user data format: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}
