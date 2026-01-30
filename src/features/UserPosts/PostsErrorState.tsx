import { QueryErrorState } from "@/components/QueryStates/QueryErrorState"
import { PostsSectionHeader } from "./PostsSectionHeader"
import { POSTS } from "@/consts/messages"

interface PostsErrorStateProps {
  onRetry: () => void
}

export const PostsErrorState = ({ onRetry }: PostsErrorStateProps) => (
  <section className="space-y-4" aria-label="Posts error">
    <PostsSectionHeader />
    <div className="flex flex-col items-center justify-center p-6 gap-4 border rounded-lg">
      <QueryErrorState
        as="div"
        message={POSTS.ERROR}
        retryLabel={POSTS.RETRY}
        onRetry={onRetry}
        ariaLabel="Error loading posts"
        className="p-0"
      />
    </div>
  </section>
)
