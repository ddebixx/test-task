import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateUser } from "@/fetchers/fetchUser/updateUser"
import { usersQueryKey } from "@/queries/usersQueryOptions"
import type { CreateUser } from "@/types/types"

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: CreateUser }) => updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersQueryKey })
      toast.success("User updated successfully")
    },
    onError: (error) => {
      toast.error(`Failed to update user: ${error instanceof Error ? error.message : "Unknown error"}`)
    },
  })
}
