import { useQuery, useQueryClient } from "@tanstack/react-query"
import { userPostsQueryKey, userPostsQueryOptions } from "@/queries/userPostsQueryOptions"
import { useQueryFetchState } from "@/hooks/useQueryFetchState"
import { useParams } from "react-router-dom"
import type { Post } from "@/types/types"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card/Card"
import { toast } from "sonner"
import { UserComments } from "./UserComments"
import { PostListSkeleton } from "./PostListSkeleton"
import { PostsSectionHeader } from "./PostsSectionHeader"
import { PostsErrorState } from "./PostsErrorState"
import { PostsEmptyState } from "./PostsEmptyState"
import { PaginationWrapper } from "@/components/PaginationWrapper/PaginationWrapper"
import { usePaginatedData } from "@/hooks/usePaginatedData"
import { POSTS } from "@/consts/messages"

export const UserPosts = () => {
    const { slug } = useParams<{ slug: string }>()
    const userId = slug!
    const queryClient = useQueryClient()
    const { cachedData, shouldFetch } = useQueryFetchState<Post[]>(userPostsQueryKey(userId))

    const { data, isLoading, error } = useQuery({
        ...userPostsQueryOptions(userId),
        enabled: !!userId && (!!cachedData || shouldFetch),
    })

    const { paginatedItems: paginatedPosts, paginationProps } = usePaginatedData<Post>({ data })


    if (isLoading && !cachedData) {
        return <PostListSkeleton />
    }

    if (error) {
        toast.error(POSTS.ERROR)
        return (
            <PostsErrorState
                onRetry={() => queryClient.refetchQueries({ queryKey: userPostsQueryKey(userId) })}
            />
        )
    }

    if (!data || data.length === 0) {
        return <PostsEmptyState />
    }

    return (
        <section className="space-y-4" aria-labelledby="posts-heading">
            <PostsSectionHeader postCount={data.length} id="posts-heading" />
            <div className="space-y-3">
                {paginatedPosts.map((post: Post) => (
                    <article key={post.id}>
                        <Card className="hover:shadow-sm transition-all">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base line-clamp-2 leading-snug">{post.title}</CardTitle>
                            <CardDescription className="text-xs">Post #{post.id}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-3">
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                {post.body}
                            </p>
                        </CardContent>
                        <CardFooter className="pt-0">
                            <UserComments postId={post.id} />
                        </CardFooter>
                    </Card>
                    </article>
                ))}
            </div>

            <div className="pt-2">
                <PaginationWrapper {...paginationProps} />
            </div>
        </section>
    )
}