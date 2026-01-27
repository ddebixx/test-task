import { useQuery, useQueryClient } from "@tanstack/react-query"
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
} from "@/components/ui/Card/card"
import { Skeleton } from "@/components/ui/Skeleton/skeleton"
import { toast } from "sonner"
import { Button } from "@/components/ui/Button/button"
import { FileText, MessageSquare } from "lucide-react"
import { UserComments } from "./UserComments"

export const UserPosts = () => {
  const { slug } = useParams<{ slug: string }>()
  const userId = slug!
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['userPosts', userId],
    queryFn: () => fetchUserPostsByUserId(userId),
    enabled: !!userId,
  })

  if (isLoading) {
    return (
      <div className="space-y-6 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="size-5 text-muted-foreground" />
          <h2 className="text-2xl font-semibold">Posts</h2>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/4" />
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
      <div className="space-y-6 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="size-5 text-muted-foreground" />
          <h2 className="text-2xl font-semibold">Posts</h2>
        </div>
        <div className="flex flex-col items-center justify-center p-6 gap-4 border rounded-lg">
          <p className="text-destructive">Failed to load posts</p>
          <Button
            variant="outline"
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
      <div className="space-y-6 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="size-5 text-muted-foreground" />
          <h2 className="text-2xl font-semibold">Posts</h2>
        </div>
        <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-muted/30">
          <MessageSquare className="size-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-lg">This user has no posts</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="size-5 text-muted-foreground" />
        <h2 className="text-2xl font-semibold">Posts</h2>
        <span className="text-sm text-muted-foreground">({data.length})</span>
      </div>
      <div className="space-y-4">
        {data.map((post: Post) => (
          <Card
            key={post.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardHeader>
              <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
              <CardDescription>Post #{post.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {post.body}
              </p>
            </CardContent>
            <CardFooter>
              <UserComments postId={post.id} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}