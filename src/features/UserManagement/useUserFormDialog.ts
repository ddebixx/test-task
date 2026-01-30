import { useState, useCallback } from "react"
import { useCreateUserMutation } from "@/mutations/user/createUserMutation"
import { useUpdateUserMutation } from "@/mutations/user/updateUserMutation"
import type { User } from "@/types/types"
import type { CreateUser, UpdateUser } from "@/types/types"

interface UseUserFormDialogProps {
  isOpen: boolean
  editingUser: User | null
  openCreate: () => void
  openEdit: (user: User) => void
  closeForm: () => void
  submitForm: (data: CreateUser | UpdateUser) => void
  isPending: boolean
}

export const useUserFormDialog = (): UseUserFormDialogProps => {
  const [isOpen, setIsOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const createMutation = useCreateUserMutation()
  const updateMutation = useUpdateUserMutation()

  const openCreate = useCallback(() => {
    setEditingUser(null)
    setIsOpen(true)
  }, [])

  const openEdit = useCallback((user: User) => {
    setEditingUser(user)
    setIsOpen(true)
  }, [])

  const closeForm = useCallback(() => {
    setIsOpen(false)
    setEditingUser(null)
  }, [])

  const submitForm = useCallback(
    (data: CreateUser | UpdateUser) => {
      if (editingUser) {
        updateMutation.mutate(
          { userId: editingUser.id, data: data as UpdateUser },
          {
            onSuccess: () => {
              closeForm()
            },
          }
        )
      } else {
        createMutation.mutate(data as CreateUser, {
          onSuccess: () => {
            closeForm()
          },
        })
      }
    },
    [editingUser, createMutation, updateMutation, closeForm]
  )

  const isPending = createMutation.isPending || updateMutation.isPending

  return {
    isOpen,
    editingUser,
    openCreate,
    openEdit,
    closeForm,
    submitForm,
    isPending,
  }
}
