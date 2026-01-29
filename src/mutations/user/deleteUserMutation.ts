import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteUser } from "@/fetchers/fetchUser/deleteUser"
import { usersQueryKey } from "@/queries/usersQueryOptions"

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersQueryKey })
      toast.success("User deleted successfully")
    },
    onError: (error) => {
      toast.error(`Failed to delete user: ${error instanceof Error ? error.message : "Unknown error"}`)
    },
  })
}
