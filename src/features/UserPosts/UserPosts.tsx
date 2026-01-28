import { useQuery, useQueryClient, onlineManager, useIsRestoring } from "@tanstack/react-query"
import { fetchUserPostsByUserId } from "@/fetchers/fetchUserPosts/fetchUserPostsByUserId"
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
import { Skeleton } from "@/components/ui/Skeleton/Skeleton"
import { toast } from "sonner"
import { Button } from "@/components/ui/Button/Button"
import { FileText, MessageSquare } from "lucide-react"
import { UserComments } from "./UserComments"
import { PaginationWrapper } from "@/components/PaginationWrapper/PaginationWrapper"
import { usePagination } from "@/hooks/usePagination"

export const UserPosts = () => {
    const { slug } = useParams<{ slug: string }>()
    const userId = slug!
    const queryClient = useQueryClient()

    const isRestoring = useIsRestoring()

    const cachedData = queryClient.getQueryData(['userPosts', userId])
    const shouldFetch = onlineManager.isOnline() && !isRestoring

    const { data, isLoading, error, isPaused } = useQuery({
        queryKey: ['userPosts', userId],
        queryFn: () => fetchUserPostsByUserId(userId),
        enabled: !!userId && (!!cachedData || shouldFetch),
    })

    const posts = data ?? []
    const {
      page,
      totalPages,
      paginatedItems: paginatedPosts,
      goToNextPage,
      goToPage,
      goToPreviousPage,
    } = usePagination<Post>({ items: posts })

    if (isPaused && !data) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <FileText className="size-5 text-muted-foreground" />
                    <h2 className="text-xl font-semibold">Posts</h2>
                </div>
                <div className="flex flex-col items-center justify-center p-6 gap-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">We're offline and have no data to show :(</p>
                </div>
            </div>
        )
    }

    if (isLoading && !cachedData) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <FileText className="size-5 text-muted-foreground" />
                    <h2 className="text-xl font-semibold">Posts</h2>
                </div>
                <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Card key={i}>
                            <CardHeader className="pb-3">
                                <Skeleton className="h-5 w-3/4 mb-2" />
                                <Skeleton className="h-3 w-1/4" />
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        toast.error("Failed to load posts")

        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <FileText className="size-5 text-muted-foreground" />
                    <h2 className="text-xl font-semibold">Posts</h2>
                </div>
                <div className="flex flex-col items-center justify-center p-6 gap-4 border rounded-lg">
                    <p className="text-sm text-destructive">Failed to load posts</p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            queryClient.refetchQueries({ queryKey: ['userPosts', userId] })
                        }
                    >
                        Retry
                    </Button>
                </div>
            </div>
        )
    }

    if (!data || data.length === 0) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <FileText className="size-5 text-muted-foreground" />
                    <h2 className="text-xl font-semibold">Posts</h2>
                </div>
                <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-muted/30">
                    <MessageSquare className="size-10 text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground">This user has no posts</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <FileText className="size-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Posts</h2>
                <span className="text-sm text-muted-foreground">({data.length})</span>
            </div>
            <div className="space-y-3">
                {paginatedPosts.map((post: Post) => (
                    <Card
                        key={post.id}
                        className="hover:shadow-sm transition-all"
                    >
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
                ))}
            </div>

            <div className="pt-2">
                <PaginationWrapper
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                    onNextPage={goToNextPage}
                    onPreviousPage={goToPreviousPage}
                />
            </div>
        </div>
    )
}