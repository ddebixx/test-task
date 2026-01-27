import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteUser } from "@/fetchers/fetchUser/deleteUser"

export function useDeleteUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success("User deleted successfully")
    },
    onError: (error) => {
      toast.error(`Failed to delete user: ${error instanceof Error ? error.message : "Unknown error"}`)
    },
  })
}
