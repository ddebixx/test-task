import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateUser } from "@/fetchers/fetchUser/updateUser"
import type { CreateUser } from "@/types/types"

export function useUpdateUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: CreateUser }) => updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success("User updated successfully")
    },
    onError: (error) => {
      toast.error(`Failed to update user: ${error instanceof Error ? error.message : "Unknown error"}`)
    },
  })
}
