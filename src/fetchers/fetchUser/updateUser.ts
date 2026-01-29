import { API_ENDPOINT } from "@/consts/consts"
import { userSchema } from "@/types/types"
import type { User } from "@/types/types"
import type { UpdateUser } from "@/types/types"

export const updateUser = async (userId: number, userData: UpdateUser): Promise<User> => {
  const response = await fetch(`${API_ENDPOINT}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...userData, id: userId }),
  })

  if (!response.ok) {
    throw new Error(`Failed to update user: ${response.statusText}`)
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
