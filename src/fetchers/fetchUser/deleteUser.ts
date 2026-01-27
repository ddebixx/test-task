import { API_ENDPOINT } from "@/consts/consts"

export async function deleteUser(userId: number): Promise<void> {
  const response = await fetch(`${API_ENDPOINT}/users/${userId}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(`Failed to delete user: ${response.statusText}`)
  }
}
