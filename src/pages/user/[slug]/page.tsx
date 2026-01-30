import { Suspense } from "react"
import { useParams } from "react-router-dom"
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query"
import { userQueryOptions } from "@/queries/userQueryOptions"
import { userPostsQueryKey } from "@/queries/userPostsQueryOptions"
import { parseUserSlugParams } from "@/utils/userSlugParams"
import { QueryEmptyState } from "@/components/QueryStates/QueryEmptyState"
import { BackNav } from "@/components/BackNav/BackNav"
import { UserCardHeader } from "@/features/UserCard/UserCardHeader"
import { UserPosts } from "@/features/UserPosts/UserPosts"
import { PostListSkeleton } from "@/features/UserPosts/PostListSkeleton"
import { USER_PAGE } from "@/consts/messages"
import { QueryErrorBoundary } from "@/components/QueryErrorBoundary/QueryErrorBoundary"
import { POSTS } from "@/consts/messages"

export default function UserPage() {
  const slug = parseUserSlugParams(useParams())
  const queryClient = useQueryClient()
  if (slug === undefined) {
    return null
  }
  const { data } = useSuspenseQuery(userQueryOptions(slug))

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
        <QueryErrorBoundary
          message={POSTS.ERROR}
          retryLabel={POSTS.RETRY}
          ariaLabel="Error loading posts"
          onRetry={() => queryClient.refetchQueries({ queryKey: userPostsQueryKey(slug) })}
        >
          <Suspense fallback={<PostListSkeleton />}>
            <UserPosts slug={slug} />
          </Suspense>
        </QueryErrorBoundary>
      </section>
    </main>
  )
}