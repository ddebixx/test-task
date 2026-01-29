import { Mail } from "lucide-react"
import type { Comment } from "@/types/types"

interface CommentItemProps {
  comment: Comment
}

export const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <article className="p-3 rounded-md bg-muted/50 space-y-1.5" aria-label={`Comment by ${comment.name}`}>
      <header className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium line-clamp-1">{comment.name}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Mail className="size-3 text-muted-foreground shrink-0" />
            <p className="text-sm text-muted-foreground truncate lowercase">
              {comment.email}
            </p>
          </div>
        </div>
      </header>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {comment.body}
      </p>
    </article>
  )
}
