import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createUser } from "@/fetchers/fetchUser/createUser"
import { usersQueryKey } from "@/queries/usersQueryOptions"

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersQueryKey })
      toast.success("User created successfully")
    }
  })
}
