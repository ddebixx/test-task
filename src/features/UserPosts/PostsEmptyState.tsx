import { MessageSquare } from "lucide-react"
import { QueryEmptyState } from "@/components/QueryStates/QueryEmptyState"
import { PostsSectionHeader } from "./PostsSectionHeader"
import { POSTS } from "@/consts/messages"

export const PostsEmptyState = () => (
  <section className="space-y-4" aria-label="Posts">
    <PostsSectionHeader />
    <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-muted/30">
      <QueryEmptyState
        as="div"
        message={POSTS.EMPTY}
        icon={<MessageSquare className="size-10 text-muted-foreground" aria-hidden="true" />}
        messageClassName="text-sm"
        className="p-0"
      />
    </div>
  </section>
)
