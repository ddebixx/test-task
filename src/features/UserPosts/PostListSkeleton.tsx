import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/Card/Card"
import { Skeleton } from "@/components/ui/Skeleton/Skeleton"
import { PostsSectionHeader } from "./PostsSectionHeader"
import { POST_LIST_SKELETON_COUNT } from "@/consts/consts"

export const PostListSkeleton = () => {
  return (
    <section className="space-y-4" aria-label="Posts loading">
      <PostsSectionHeader />
      <div className="space-y-3">
        {Array.from({ length: POST_LIST_SKELETON_COUNT }).map((_, i) => (
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
    </section>
  )
}
