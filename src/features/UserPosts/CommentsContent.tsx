import { useSuspenseQuery } from "@tanstack/react-query"
import { commentsQueryOptions } from "@/queries/commentsQueryOptions"
import { CommentItem } from "./CommentItem"
import { MessageSquare } from "lucide-react"
import { COMMENTS } from "@/consts/messages"

interface CommentsContentProps {
  postId: number
}

export const CommentsContent = ({ postId }: CommentsContentProps) => {
  const { data } = useSuspenseQuery(commentsQueryOptions(postId))

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 rounded-md bg-muted/50">
        <MessageSquare className="size-6 text-muted-foreground mb-1.5" aria-hidden="true" />
        <p className="text-xs text-muted-foreground">{COMMENTS.EMPTY}</p>
      </div>
    )
  }

  return (
    <ol className="space-y-2 list-none p-0 m-0">
      {data.map((comment) => (
        <li key={comment.id}>
          <CommentItem comment={comment} />
        </li>
      ))}
    </ol>
  )
}
