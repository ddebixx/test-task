import { useState } from "react"
import { useQuery, useQueryClient, onlineManager, useIsRestoring } from "@tanstack/react-query"
import { fetchCommentsByPostId } from "@/fetchers/fetchUserPosts/fetchCommentsByPostId"
import type { Comment } from "@/types/types"
import { Button } from "@/components/ui/Button/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card/Card"
import { Skeleton } from "@/components/ui/Skeleton/Skeleton"
import { MessageSquare, ChevronDown, ChevronUp, Mail } from "lucide-react"

interface UserCommentsProps {
  postId: number
}

export const UserComments = ({ postId }: UserCommentsProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const queryClient = useQueryClient()
  const isRestoring = useIsRestoring()

  // For this task purposes I decided to fetch comments separately 
  // when user opens the comments section
  // to reduce loading time of the page

  const cachedData = queryClient.getQueryData(['comments', postId])
  const shouldFetch = onlineManager.isOnline() && !isRestoring

  const { data, isLoading, error, isPaused } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchCommentsByPostId(postId),
    enabled: isExpanded && (!!cachedData || shouldFetch),
  })

  const hasError = !!error

  function handleToggle() {
    setIsExpanded(!isExpanded)
  }

  function handleRetry() {
    queryClient.refetchQueries({ queryKey: ['comments', postId] })
  }

  return (
    <div className="w-full">
      <Button
        variant="ghost"
        onClick={handleToggle}
        className="w-full justify-between p-0 h-auto font-normal"
      >
        <div className="flex items-center gap-2">
          <MessageSquare className="size-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {isExpanded ? "Hide" : "Show"} comments
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="size-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="size-4 text-muted-foreground" />
        )}
      </Button>

      {isExpanded && (
        <div className="mt-4 space-y-3 pt-4 border-t">
          {isPaused && !data && (
            <div className="flex flex-col items-center justify-center p-4 gap-3 border rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground">
                We're offline and have no data to show :(
              </p>
            </div>
          )}

          {isLoading && !cachedData && (
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-5/6" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {hasError && (
            <div className="flex flex-col items-center justify-center p-4 gap-3 border rounded-lg bg-muted/30">
              <p className="text-sm text-destructive">
                Failed to load comments
              </p>
              <Button variant="outline" size="sm" onClick={handleRetry}>
                Retry
              </Button>
            </div>
          )}

          {!isLoading && !hasError && (!data || data.length === 0) && (
            <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-muted/30">
              <MessageSquare className="size-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No comments yet</p>
            </div>
          )}

          {!isLoading && !hasError && data && data.length > 0 && (
            <div className="space-y-3">
              {data.map((comment: Comment) => (
                <Card key={comment.id} className="bg-muted/30 gap-0">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm font-semibold line-clamp-1">
                          {comment.name}
                        </CardTitle>
                        <div className="flex items-center gap-1 mt-1">
                          <Mail className="size-3 text-muted-foreground shrink-0" />
                          <p className="text-xs text-muted-foreground truncate lowercase">
                            {comment.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                      {comment.body}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}