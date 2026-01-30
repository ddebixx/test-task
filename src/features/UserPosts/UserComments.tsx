import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { commentsQueryKey, commentsQueryOptions } from "@/queries/commentsQueryOptions"
import { useQueryFetchState } from "@/hooks/useQueryFetchState"
import { CommentItem } from "./CommentItem"
import { CommentsSkeleton } from "./CommentsSkeleton"
import type { Comment } from "@/types/types"
import { Button } from "@/components/ui/Button/Button"
import { MessageSquare, ChevronDown, ChevronUp } from "lucide-react"
import { COMMENTS } from "@/consts/messages"

interface UserCommentsProps {
  postId: number
}

export const UserComments = ({ postId }: UserCommentsProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const queryClient = useQueryClient()
  const { cachedData, shouldFetch } = useQueryFetchState<Comment[]>(commentsQueryKey(postId))

  const { data, isLoading, error } = useQuery({
    ...commentsQueryOptions(postId),
    enabled: isExpanded && (!!cachedData || shouldFetch),
  })

  const hasError = !!error

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  const handleRetry = () => {
    queryClient.refetchQueries({ queryKey: commentsQueryKey(postId) })
  }

  return (
    <section className="w-full" aria-label="Comments">
      <Button
        variant="ghost"
        onClick={handleToggle}
        className="w-full justify-between px-0 h-auto font-normal hover:bg-transparent"
      >
        <div className="flex items-center gap-1.5">
          <MessageSquare className="size-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {isExpanded ? COMMENTS.HIDE : COMMENTS.VIEW} {COMMENTS.SUFFIX}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="size-3.5 text-muted-foreground" />
        ) : (
          <ChevronDown className="size-3.5 text-muted-foreground" />
        )}
      </Button>

      {isExpanded && (
        <div className="mt-3 space-y-2 pt-3 border-t" role="region" aria-label="Comments list">
          {isLoading && !cachedData && (
            <div className="space-y-2">
              <CommentsSkeleton />
            </div>
          )}

          {hasError && (
            <div className="flex flex-col items-center justify-center p-3 gap-2 rounded-md bg-muted/50">
              <p className="text-xs text-destructive">{COMMENTS.ERROR}</p>
              <Button variant="outline" size="sm" onClick={handleRetry}>
                {COMMENTS.RETRY}
              </Button>
            </div>
          )}

          {!isLoading && !hasError && (!data || data.length === 0) && (
            <div className="flex flex-col items-center justify-center p-4 rounded-md bg-muted/50">
              <MessageSquare className="size-6 text-muted-foreground mb-1.5" />
              <p className="text-xs text-muted-foreground">{COMMENTS.EMPTY}</p>
            </div>
          )}

          {!isLoading && !hasError && data && data.length > 0 && (
            <ol className="space-y-2 list-none p-0 m-0">
              {data.map((comment) => (
                <li key={comment.id}>
                  <CommentItem comment={comment} />
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </section>
  )
}