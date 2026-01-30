import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateUser } from "@/fetchers/fetchUser/updateUser"
import { usersQueryKey } from "@/queries/usersQueryOptions"
import type { UpdateUser } from "@/types/types"

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: UpdateUser }) => updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersQueryKey })
      toast.success("User updated successfully")
    }
  })
}
