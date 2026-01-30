import { useSuspenseQuery } from "@tanstack/react-query"
import { userPostsQueryOptions } from "@/queries/userPostsQueryOptions"
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
import { UserComments } from "./UserComments"
import { PostsSectionHeader } from "./PostsSectionHeader"
import { PostsEmptyState } from "./PostsEmptyState"
import { PaginationWrapper } from "@/components/PaginationWrapper/PaginationWrapper"
import { usePaginatedData } from "@/hooks/usePaginatedData"

export const UserPosts = () => {
  const { slug } = useParams<{ slug: string }>()
  const userId = slug!
  const { data } = useSuspenseQuery(userPostsQueryOptions(userId))
  const { paginatedItems: paginatedPosts, paginationProps } = usePaginatedData<Post>({ data })

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