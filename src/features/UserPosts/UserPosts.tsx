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
import { Button } from "@/components/ui/Button/Button"
import { MessageSquare } from "lucide-react"
import { UserComments } from "./UserComments"
import { PostListSkeleton } from "./PostListSkeleton"
import { PostsSectionHeader } from "./PostsSectionHeader"
import { PaginationWrapper } from "@/components/PaginationWrapper/PaginationWrapper"
import { usePaginatedData } from "@/hooks/usePaginatedData"
import { OFFLINE_MESSAGE, POSTS } from "@/consts/messages"

export const UserPosts = () => {
    const { slug } = useParams<{ slug: string }>()
    const userId = slug!
    const queryClient = useQueryClient()
    const { cachedData, shouldFetch } = useQueryFetchState<Post[]>(userPostsQueryKey(userId))

    const { data, isLoading, error, isPaused } = useQuery({
        ...userPostsQueryOptions(userId),
        enabled: !!userId && (!!cachedData || shouldFetch),
    })

    const { paginatedItems: paginatedPosts, paginationProps } = usePaginatedData<Post>({ data })

    if (isPaused && !data) {
        return (
            <section className="space-y-4" aria-label="Posts">
                <PostsSectionHeader />
                <div className="flex flex-col items-center justify-center p-6 gap-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">{OFFLINE_MESSAGE}</p>
                </div>
            </section>
        )
    }

    if (isLoading && !cachedData) {
        return <PostListSkeleton />
    }

    if (error) {
        toast.error(POSTS.ERROR)
        return (
            <section className="space-y-4" aria-label="Posts error">
                <PostsSectionHeader />
                <div className="flex flex-col items-center justify-center p-6 gap-4 border rounded-lg">
                    <p className="text-sm text-destructive">{POSTS.ERROR}</p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => queryClient.refetchQueries({ queryKey: userPostsQueryKey(userId) })}
                    >
                        {POSTS.RETRY}
                    </Button>
                </div>
            </section>
        )
    }

    if (!data || data.length === 0) {
        return (
            <section className="space-y-4" aria-label="Posts">
                <PostsSectionHeader />
                <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-muted/30">
                    <MessageSquare className="size-10 text-muted-foreground mb-3" aria-hidden="true" />
                    <p className="text-sm text-muted-foreground">{POSTS.EMPTY}</p>
                </div>
            </section>
        )
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