import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createUser } from "@/fetchers/fetchUser/createUser"

export function useCreateUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success("User created successfully")
    },
    onError: (error) => {
      toast.error(`Failed to create user: ${error instanceof Error ? error.message : "Unknown error"}`)
    },
  })
}
