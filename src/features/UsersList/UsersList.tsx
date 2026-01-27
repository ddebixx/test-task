import { useState } from "react"
import { Skeleton } from "@/components/ui/Skeleton/Skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card/Card"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar/Avatar"
import { fetchUsers } from "@/fetchers/fetchUser/fetchUser"
import { useQuery, useQueryClient, onlineManager, useIsRestoring } from "@tanstack/react-query"
import { toast } from "sonner"
import { Mail, MapPin, Building2 } from "lucide-react"
import { Button } from "@/components/ui/Button/Button"
import { UserCard } from "@/features/UserCard/UserCard"
import type { User } from "@/types/types"
import { getInitials } from "@/helpers/helpers"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/Dialog/Dialog"

export const UsersList = () => {
  const queryClient = useQueryClient()
  const isRestoring = useIsRestoring()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const cachedData = queryClient.getQueryData(['users'])
  const shouldFetch = onlineManager.isOnline() && !isRestoring

  const { data, isLoading, error, isPaused } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    enabled: !!cachedData || shouldFetch,
  })

  function handleUserClick(user: User) {
    setSelectedUser(user)
    setIsDialogOpen(true)
  }


  function handleDialogClose() {
    setIsDialogOpen(false)
    setSelectedUser(null)
  }

  if (isPaused && !data) {
    return (
      <div className="flex flex-col items-center justify-center p-6 gap-4">
        <p className="text-muted-foreground">We're offline and have no data to show :(</p>
      </div>
    )
  }

  if (isLoading && !cachedData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
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
    )
  }

  if (error && !data) {
    toast.error("Failed to load users")

    return (
      <div className="flex flex-col items-center justify-center p-6 gap-4">
        <p className="text-destructive">Failed to load users</p>
        <Button variant="outline" onClick={() => queryClient.refetchQueries({ queryKey: ['users'] })}>Retry</Button>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center p-6">
        <p className="text-muted-foreground">No users found</p>
      </div>
    )
  }

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {data.map((user) => (
          <Card
            key={user.id}
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
        ))}
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