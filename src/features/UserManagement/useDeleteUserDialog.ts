import { useState, useCallback } from "react"
import { useDeleteUserMutation } from "@/mutations/user/deleteUserMutation"
import type { User } from "@/types/types"

interface UseDeleteUserDialogProps {
  isOpen: boolean
  userToDelete: User | null
  openDialog: (user: User) => void
  closeDialog: () => void
  handleOpenChange: (open: boolean) => void
  confirmDelete: () => void
  isDeleting: boolean
}

export const useDeleteUserDialog = (): UseDeleteUserDialogProps => {
  const [isOpen, setIsOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const deleteMutation = useDeleteUserMutation()

  const openDialog = useCallback((user: User) => {
    setUserToDelete(user)
    setIsOpen(true)
  }, [])

  const closeDialog = useCallback(() => {
    setIsOpen(false)
    setUserToDelete(null)
  }, [])

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) closeDialog()
    },
    [closeDialog]
  )

  const confirmDelete = useCallback(() => {
    if (!userToDelete) return
    deleteMutation.mutate(userToDelete.id, {
      onSuccess: () => {
        closeDialog()
      },
    })
  }, [userToDelete, deleteMutation, closeDialog])

  return {
    isOpen,
    userToDelete,
    openDialog,
    closeDialog,
    handleOpenChange,
    confirmDelete,
    isDeleting: deleteMutation.isPending,
  }
}
