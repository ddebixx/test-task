import { Skeleton } from "@/components/ui/Skeleton/Skeleton"
import { COMMENT_LIST_SKELETON_COUNT } from "@/consts/consts"

export const CommentsSkeleton = () => {
  return (
    <div className="space-y-2" role="status" aria-label="Comments loading">
      {Array.from({ length: COMMENT_LIST_SKELETON_COUNT }).map((_, i) => (
        <div key={i} className="p-3 rounded-md bg-muted/50 space-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      ))}
    </div>
  )
}
