import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { usersQueryKey, usersQueryOptions } from "@/queries/usersQueryOptions"
import { useCreateUserMutation } from "@/mutations/user/createUserMutation"
import { useUpdateUserMutation } from "@/mutations/user/updateUserMutation"
import { useDeleteUserMutation } from "@/mutations/user/deleteUserMutation"
import { UserForm } from "@/features/UserManagement/UserForm"
import { DeleteUserDialog } from "@/features/UserManagement/DeleteUserDialog"
import { UserManagementSkeleton } from "@/features/UserManagement/UserManagementSkeleton"
import { QueryErrorState } from "@/components/QueryStates/QueryErrorState"
import { QueryEmptyState } from "@/components/QueryStates/QueryEmptyState"
import { USER_MANAGEMENT } from "@/consts/messages"
import { Button } from "@/components/ui/Button/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card/Card"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar/Avatar"
import { Dialog, DialogContent } from "@/components/ui/Dialog/Dialog"
import { getInitials } from "@/helpers/helpers"
import { Mail, MapPin, Building2, Plus, Edit, Trash2 } from "lucide-react"
import type { UpdateUser, User } from "@/types/types"
import type { CreateUser } from "@/types/types"
import { PaginationWrapper } from "@/components/PaginationWrapper/PaginationWrapper"
import { usePaginatedData } from "@/hooks/usePaginatedData"

export default function UserManagement() {
  const queryClient = useQueryClient()
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  const { data: users, isLoading, error } = useQuery(usersQueryOptions())

  const { paginatedItems: paginatedUsers, paginationProps } = usePaginatedData<User>({ data: users })

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
      useDeleteUserMutation().mutate(userToDelete.id, {
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

  const handleFormSubmit = (data: UpdateUser | CreateUser) => {
    if (editingUser) {
      useUpdateUserMutation().mutate(
        { userId: editingUser.id, data: data as UpdateUser },
        {
          onSuccess: () => {
            setIsFormDialogOpen(false)
            setEditingUser(null)
          },
        }
      )
    } else {
      useCreateUserMutation().mutate(data as CreateUser, {
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
    return <UserManagementSkeleton />
  }

  if (error) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <QueryErrorState
          message={USER_MANAGEMENT.ERROR}
          retryLabel={USER_MANAGEMENT.RETRY}
          ariaLabel="Error loading users"
          onRetry={() => queryClient.refetchQueries({ queryKey: usersQueryKey })}
        />
      </main>
    )
  }

  return (
    <main className="max-w-4xl w-full mx-auto p-6">
      <header className="mb-6 flex justify-end items-center">
        <Button onClick={handleCreateClick}>
          <Plus className="size-4" />
          Add User
        </Button>
      </header>

      {!users || users.length === 0 ? (
        <QueryEmptyState message={USER_MANAGEMENT.EMPTY} ariaLabel="No users" />
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Users list">
          {paginatedUsers.map((user) => (
            <article key={user.id}>
              <Card className="hover:shadow-md transition-shadow">
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
                      disabled={useDeleteUserMutation().isPending}
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            </article>
          ))}
        </section>
      )}

      <PaginationWrapper {...paginationProps} />

      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <UserForm
            user={editingUser || undefined}
            onSubmit={async (data) => await handleFormSubmit(data)}
            onCancel={handleFormCancel}
            isLoading={useCreateUserMutation().isPending || useUpdateUserMutation().isPending}
          />
        </DialogContent>
      </Dialog>

      <DeleteUserDialog
        open={isDeleteDialogOpen}
        onOpenChange={handleDeleteDialogChange}
        userName={userToDelete?.name || null}
        onConfirm={handleDeleteConfirm}
        isDeleting={useDeleteUserMutation().isPending}
      />
    </main>
  )
}
