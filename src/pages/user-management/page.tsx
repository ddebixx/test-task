import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchUsers } from "@/fetchers/fetchUser/fetchUser"
import { useCreateUserMutation } from "@/mutations/user/createUserMutation"
import { useUpdateUserMutation } from "@/mutations/user/updateUserMutation"
import { useDeleteUserMutation } from "@/mutations/user/deleteUserMutation"
import { UserForm } from "@/features/UserManagement/UserForm"
import { DeleteUserDialog } from "@/features/UserManagement/DeleteUserDialog"
import { Button } from "@/components/ui/Button/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card/Card"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar/Avatar"
import { Dialog, DialogContent } from "@/components/ui/Dialog/Dialog"
import { Skeleton } from "@/components/ui/Skeleton/Skeleton"
import { getInitials } from "@/helpers/helpers"
import { Mail, MapPin, Building2, Plus, Edit, Trash2 } from "lucide-react"
import type { User } from "@/types/types"
import type { CreateUser } from "@/types/types"
import { PaginationWrapper } from "@/components/PaginationWrapper/PaginationWrapper"
import { usePagination } from "@/hooks/usePagination"

export default function UserManagement() {
  const queryClient = useQueryClient()
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })

  const userList = users ?? []
  const {
    page,
    totalPages,
    paginatedItems: paginatedUsers,
    goToNextPage,
    goToPage,
    goToPreviousPage,
  } = usePagination<User>({ items: userList })

  const createMutation = useCreateUserMutation()
  const updateMutation = useUpdateUserMutation()
  const deleteMutation = useDeleteUserMutation()

  const handleCreateClick = () => {
    setEditingUser(null)
    setIsFormDialogOpen(true)
  }

  const handleEditClick = (user: User) => {
    setEditingUser(user)
    setIsFormDialogOpen(true)
  }

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      deleteMutation.mutate(userToDelete.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false)
          setUserToDelete(null)
        },
      })
    }
  }

  const handleDeleteDialogChange = (open: boolean) => {
    setIsDeleteDialogOpen(open)
    if (!open) {
      setUserToDelete(null)
    }
  }

  const handleFormSubmit = (data: CreateUser) => {
    if (editingUser) {
      updateMutation.mutate(
        { userId: editingUser.id, data },
        {
          onSuccess: () => {
            setIsFormDialogOpen(false)
            setEditingUser(null)
          },
        }
      )
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setIsFormDialogOpen(false)
        },
      })
    }
  }

  const handleFormCancel = () => {
    setIsFormDialogOpen(false)
    setEditingUser(null)
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Skeleton className="size-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-destructive">Failed to load users</p>
          <Button variant="outline" onClick={() => queryClient.refetchQueries({ queryKey: ["users"] })}>
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      <div className="mb-6 flex justify-end items-center">
        <Button onClick={handleCreateClick}>
          <Plus className="size-4" />
          Add User
        </Button>
      </div>

      {!users || users.length === 0 ? (
        <div className="flex items-center justify-center p-6">
          <p className="text-muted-foreground">No users found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 max-w-[160px]">
                    <CardTitle className="text-lg truncate max-w-[140px]">{user.name}</CardTitle>
                    <span className="text-sm text-muted-foreground truncate max-w-[160px]">@{user.username}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm min-w-0">
                    <Mail className="size-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground truncate lowercase min-w-0 max-w-[160px]">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm min-w-0">
                    <MapPin className="size-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground truncate min-w-0 max-w-[160px]">{user.address.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm min-w-0">
                    <Building2 className="size-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground truncate min-w-0 max-w-[160px]">{user.company.name}</span>
                  </div>
                  <div className="max-[480px]:flex-col flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(user)}
                      className="max-[480px]:w-full"
                    >
                      <Edit className="size-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteClick(user)}
                      className="max-[480px]:w-full"
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <PaginationWrapper
        currentPage={page}
        totalPages={totalPages}
        onPageChange={goToPage}
        onNextPage={goToNextPage}
        onPreviousPage={goToPreviousPage}
      />

      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <UserForm
            user={editingUser || undefined}
            onSubmit={async (data) => await handleFormSubmit(data)}
            onCancel={handleFormCancel}
            isLoading={createMutation.isPending || updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      <DeleteUserDialog
        open={isDeleteDialogOpen}
        onOpenChange={handleDeleteDialogChange}
        userName={userToDelete?.name || null}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  )
}
