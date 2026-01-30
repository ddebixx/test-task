import { useSuspenseQuery } from "@tanstack/react-query"
import { usersQueryOptions } from "@/queries/usersQueryOptions"
import { UserForm } from "@/features/UserManagement/UserForm"
import { DeleteUserDialog } from "@/features/UserManagement/DeleteUserDialog"
import { useDeleteUserDialog } from "@/features/UserManagement/useDeleteUserDialog"
import { useUserFormDialog } from "@/features/UserManagement/useUserFormDialog"
import { QueryEmptyState } from "@/components/QueryStates/QueryEmptyState"
import { USER_MANAGEMENT } from "@/consts/messages"
import { Button } from "@/components/ui/Button/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card/Card"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar/Avatar"
import { Dialog, DialogContent } from "@/components/ui/Dialog/Dialog"
import { getInitials } from "@/helpers/helpers"
import { Mail, MapPin, Building2, Plus, Edit, Trash2 } from "lucide-react"
import type { User } from "@/types/types"
import { PaginationWrapper } from "@/components/PaginationWrapper/PaginationWrapper"
import { usePaginatedData } from "@/hooks/usePaginatedData"

export default function UserManagement() {
  const { data: users } = useSuspenseQuery(usersQueryOptions())
  const { paginatedItems: paginatedUsers, paginationProps } = usePaginatedData<User>({ data: users })

  const {
    isOpen: isDeleteDialogOpen,
    userToDelete,
    openDialog: openDeleteDialog,
    handleOpenChange: handleDeleteDialogChange,
    confirmDelete: handleDeleteConfirm,
    isDeleting,
  } = useDeleteUserDialog()

  const {
    isOpen: isFormDialogOpen,
    editingUser,
    openCreate: handleCreateClick,
    openEdit: handleEditClick,
    closeForm: handleFormCancel,
    submitForm: handleFormSubmit,
    isPending: isFormPending,
  } = useUserFormDialog()

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
                      onClick={() => openDeleteDialog(user)}
                      className="max-[480px]:w-full"
                      disabled={isDeleting}
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

      <Dialog open={isFormDialogOpen} onOpenChange={(open) => !open && handleFormCancel()}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <UserForm
            user={editingUser ?? undefined}
            onSubmit={async (data) => handleFormSubmit(data)}
            onCancel={handleFormCancel}
            isLoading={isFormPending}
          />
        </DialogContent>
      </Dialog>

      <DeleteUserDialog
        open={isDeleteDialogOpen}
        onOpenChange={handleDeleteDialogChange}
        userName={userToDelete?.name ?? null}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </main>
  )
}
