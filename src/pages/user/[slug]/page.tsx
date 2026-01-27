import { useParams, useNavigate } from "react-router-dom"
import { useQuery, useQueryClient, onlineManager, useIsRestoring } from "@tanstack/react-query"
import { fetchUserById } from "@/fetchers/fetchUser/fetchUserById"
import { Skeleton } from "@/components/ui/Skeleton/Skeleton"
import { Button } from "@/components/ui/Button/Button"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { UserCardHeader } from "@/features/UserCard/UserCardHeader"
import { UserPosts } from "@/features/UserPosts/UserPosts"

// I decided to use a separate page for the user details, posts and comments
// so it will be easier to manage the data and keep UI more organized

export default function UserPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isRestoring = useIsRestoring()

  const cachedData = queryClient.getQueryData(['user', slug])
  const shouldFetch = onlineManager.isOnline() && !isRestoring

  const { data, isLoading, error, isPaused } = useQuery({
    queryKey: ['user', slug],
    queryFn: () => fetchUserById(slug!),
    enabled: !!slug && (!!cachedData || shouldFetch),
  })

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    )
  }

  if (isPaused && !data) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back
        </Button>
        <div className="flex flex-col items-center justify-center p-6 gap-4">
          <p className="text-muted-foreground">We're offline and have no data to show :(</p>
        </div>
      </div>
    )
  }

  if (error && !data) {
    toast.error("Failed to load user")
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back
        </Button>
        <div className="flex flex-col items-center justify-center p-6 gap-4">
          <p className="text-destructive">Failed to load user</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center justify-center p-6">
          <p className="text-muted-foreground">User not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl w-full mx-auto mt-6 flex flex-col gap-6">
      <div className="flex items-center justify-start gap-2">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back
        </Button>
      </div>
      <div className="flex flex-col gap-6">
        <UserCardHeader user={data} />
        <UserPosts />
      </div>
    </div>
  )
}