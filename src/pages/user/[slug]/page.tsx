import { useParams } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { userQueryKey, userQueryOptions } from "@/queries/userQueryOptions"
import { useQueryFetchState } from "@/hooks/useQueryFetchState"
import { QueryErrorState } from "@/components/QueryStates/QueryErrorState"
import { QueryEmptyState } from "@/components/QueryStates/QueryEmptyState"
import { BackNav } from "@/components/BackNav/BackNav"
import { UserPageSkeleton } from "@/features/UserCard/UserPageSkeleton"
import { USER_PAGE } from "@/consts/messages"
import { toast } from "sonner"
import { UserCardHeader } from "@/features/UserCard/UserCardHeader"
import { UserPosts } from "@/features/UserPosts/UserPosts"
import type { User } from "@/types/types"

// I decided to use a separate page for the user details, posts and comments
// so it will be easier to manage the data and keep UI more organized

export default function UserPage() {
  const { slug } = useParams<{ slug: string }>()
  const queryClient = useQueryClient()
  const { cachedData, shouldFetch } = useQueryFetchState<User>(userQueryKey(slug!))

  const { data, isLoading, error } = useQuery({
    ...userQueryOptions(slug!),
    enabled: !!slug && (!!cachedData || shouldFetch),
    initialData: cachedData,
  })

  if (isLoading) {
    return <UserPageSkeleton />
  }

  if (error && !data) {
    toast.error(USER_PAGE.ERROR)
    return (
      <main className="max-w-4xl mx-auto p-6">
        <BackNav variant="outline" className="mb-6" />
        <QueryErrorState
          message={USER_PAGE.ERROR}
          retryLabel={USER_PAGE.RETRY}
          ariaLabel="Error loading user"
          onRetry={() => queryClient.refetchQueries({ queryKey: userQueryKey(slug!) })}
        />
      </main>
    )
  }

  if (!data) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <BackNav variant="outline" className="mb-6" />
        <QueryEmptyState message={USER_PAGE.EMPTY} ariaLabel="User not found" />
      </main>
    )
  }

  return (
    <main className="max-w-4xl w-full mx-auto px-4 py-6 flex flex-col gap-4">
      <BackNav className="-ml-2" />
      <section className="flex flex-col gap-6" aria-label="User profile">
        <UserCardHeader user={data} />
        <UserPosts />
      </section>
    </main>
  )
}