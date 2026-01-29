import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { userQueryKey, userQueryOptions } from "@/queries/userQueryOptions"
import { useQueryFetchState } from "@/hooks/useQueryFetchState"
import { Skeleton } from "@/components/ui/Skeleton/Skeleton"
import { Button } from "@/components/ui/Button/Button"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { UserCardHeader } from "@/features/UserCard/UserCardHeader"
import { UserPosts } from "@/features/UserPosts/UserPosts"
import type { User } from "@/types/types"

// I decided to use a separate page for the user details, posts and comments
// so it will be easier to manage the data and keep UI more organized

export default function UserPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { cachedData, shouldFetch } = useQueryFetchState<User>(userQueryKey(slug!))

  const { data, isLoading, error, isPaused } = useQuery({
    ...userQueryOptions(slug!),
    enabled: !!slug && (!!cachedData || shouldFetch),
    initialData: cachedData,
  })

  if (isLoading) {
    return (
      <main className="max-w-4xl mx-auto p-6" aria-busy="true">
        <header className="mb-6" aria-hidden="true">
          <Skeleton className="h-10 w-32" />
        </header>
        <section className="space-y-6" aria-label="User details loading">
          <Skeleton className="h-64 w-full" />
        </section>
      </main>
    )
  }

  if (isPaused && !data) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <nav aria-label="Back">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back
          </Button>
        </nav>
        <section className="flex flex-col items-center justify-center p-6 gap-4" aria-label="Offline">
          <p className="text-muted-foreground">We're offline and have no data to show :(</p>
        </section>
      </main>
    )
  }

  if (error && !data) {
    toast.error("Failed to load user")
    return (
      <main className="max-w-4xl mx-auto p-6">
        <nav aria-label="Back">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back
          </Button>
        </nav>
        <section className="flex flex-col items-center justify-center p-6 gap-4" aria-label="Error loading user">
          <p className="text-destructive">Failed to load user</p>
        </section>
      </main>
    )
  }

  if (!data) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <nav aria-label="Back">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back
          </Button>
        </nav>
        <section className="flex items-center justify-center p-6" aria-label="User not found">
          <p className="text-muted-foreground">User not found</p>
        </section>
      </main>
    )
  }

  return (
    <main className="max-w-4xl w-full mx-auto px-4 py-6 flex flex-col gap-4">
      <nav aria-label="Back">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="w-fit -ml-2"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back
        </Button>
      </nav>
      <section className="flex flex-col gap-6" aria-label="User profile">
        <UserCardHeader user={data} />
        <UserPosts />
      </section>
    </main>
  )
}