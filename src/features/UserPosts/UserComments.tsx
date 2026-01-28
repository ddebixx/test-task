import { useState } from "react"
import { useQuery, useQueryClient, onlineManager, useIsRestoring } from "@tanstack/react-query"
import { fetchCommentsByPostId } from "@/fetchers/fetchUserPosts/fetchCommentsByPostId"
import type { Comment } from "@/types/types"
import { Button } from "@/components/ui/Button/Button"
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
        className="w-full justify-between px-0 h-auto font-normal hover:bg-transparent"
      >
        <div className="flex items-center gap-1.5">
          <MessageSquare className="size-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {isExpanded ? "Hide" : "View"} comments
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="size-3.5 text-muted-foreground" />
        ) : (
          <ChevronDown className="size-3.5 text-muted-foreground" />
        )}
      </Button>

      {isExpanded && (
        <div className="mt-3 space-y-2 pt-3 border-t">
          {isPaused && !data && (
            <div className="flex flex-col items-center justify-center p-3 gap-2 rounded-md bg-muted/50">
              <p className="text-xs text-muted-foreground">
                We're offline and have no data to show :(
              </p>
            </div>
          )}

          {isLoading && !cachedData && (
            <div className="space-y-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="p-3 rounded-md bg-muted/50 space-y-2">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
              ))}
            </div>
          )}

          {hasError && (
            <div className="flex flex-col items-center justify-center p-3 gap-2 rounded-md bg-muted/50">
              <p className="text-xs text-destructive">
                Failed to load comments
              </p>
              <Button variant="outline" size="sm" onClick={handleRetry}>
                Retry
              </Button>
            </div>
          )}

          {!isLoading && !hasError && (!data || data.length === 0) && (
            <div className="flex flex-col items-center justify-center p-4 rounded-md bg-muted/50">
              <MessageSquare className="size-6 text-muted-foreground mb-1.5" />
              <p className="text-xs text-muted-foreground">No comments yet</p>
            </div>
          )}

          {!isLoading && !hasError && data && data.length > 0 && (
            <div className="space-y-2">
              {data.map((comment: Comment) => (
                <div key={comment.id} className="p-3 rounded-md bg-muted/50 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium line-clamp-1">
                        {comment.name}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Mail className="size-3 text-muted-foreground shrink-0" />
                        <p className="text-sm text-muted-foreground truncate lowercase">
                          {comment.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {comment.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}