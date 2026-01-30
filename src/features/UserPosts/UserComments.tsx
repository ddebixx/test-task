import { Suspense, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/Button/Button"
import { MessageSquare, ChevronDown, ChevronUp } from "lucide-react"
import { COMMENTS } from "@/consts/messages"
import { commentsQueryKey } from "@/queries/commentsQueryOptions"
import { CommentsContent } from "./CommentsContent"
import { CommentsSkeleton } from "./CommentsSkeleton"
import { QueryErrorBoundary } from "@/components/QueryErrorBoundary/QueryErrorBoundary"

interface UserCommentsProps {
  postId: number
}

export const UserComments = ({ postId }: UserCommentsProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const queryClient = useQueryClient()

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
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
          <QueryErrorBoundary
            message={COMMENTS.ERROR}
            retryLabel={COMMENTS.RETRY}
            ariaLabel="Error loading comments"
            onRetry={() => queryClient.refetchQueries({ queryKey: commentsQueryKey(postId) })}
          >
            <Suspense fallback={
              <div className="space-y-2">
                <CommentsSkeleton />
              </div>
            }>
              <CommentsContent postId={postId} />
            </Suspense>
          </QueryErrorBoundary>
        </div>
      )}
    </section>
  )
}