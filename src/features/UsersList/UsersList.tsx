import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card/Card"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar/Avatar"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Mail, MapPin, Building2 } from "lucide-react"
import { UserCard } from "@/features/UserCard/UserCard"
import { UserListSkeleton } from "@/features/UsersList/UserListSkeleton"
import type { User } from "@/types/types"
import { getInitials } from "@/helpers/helpers"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/Dialog/Dialog"
import { PaginationWrapper } from "@/components/PaginationWrapper/PaginationWrapper"
import { usePaginatedData } from "@/hooks/usePaginatedData"
import { useQueryFetchState } from "@/hooks/useQueryFetchState"
import { usersQueryKey, usersQueryOptions } from "@/queries/usersQueryOptions"
import { USERS_LIST } from "@/consts/messages"
import { QueryErrorState } from "@/components/QueryStates/QueryErrorState"
import { QueryEmptyState } from "@/components/QueryStates/QueryEmptyState"

export const UsersList = () => {
  const queryClient = useQueryClient()
  const { cachedData, shouldFetch } = useQueryFetchState<User[]>(usersQueryKey)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { data, isLoading, error } = useQuery({
    ...usersQueryOptions(),
    enabled: !!cachedData || shouldFetch,
  })

  const { paginatedItems: paginatedUsers, paginationProps } = usePaginatedData<User>({ data })

  const handleUserClick = (user: User) => {
    setSelectedUser(user)
    setIsDialogOpen(true)
  }


  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setSelectedUser(null)
  }

  if (isLoading && !cachedData) {
    return <UserListSkeleton />
  }

  if (error && !data) {
    toast.error(USERS_LIST.ERROR)
    return (
      <QueryErrorState
        message={USERS_LIST.ERROR}
        retryLabel={USERS_LIST.RETRY}
        ariaLabel="Error loading users"
        onRetry={() => queryClient.refetchQueries({ queryKey: usersQueryKey })}
      />
    )
  }

  if (!data || data.length === 0) {
    return <QueryEmptyState message={USERS_LIST.EMPTY} ariaLabel="No users" />
  }

  return (
    <>
      <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6" aria-label="Users list">
        {paginatedUsers.map((user) => (
          <article key={user.id}>
            <Card
              className="hover:shadow-md/10 transition-shadow cursor-pointer"
              onClick={() => handleUserClick(user)}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{user.name}</CardTitle>
                  <CardDescription className="truncate">@{user.username}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="size-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground truncate lowercase">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="size-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{user.address.city}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="size-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground truncate">{user.company.name}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          </article>
        ))}
      </section>

      <div className="pb-6">
        <PaginationWrapper {...paginationProps} />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
          </DialogHeader>
          {selectedUser && <UserCard user={selectedUser} />}
        </DialogContent>
      </Dialog>
    </>
  )
}