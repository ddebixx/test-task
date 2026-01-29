import { FileText } from "lucide-react"
import { POSTS } from "@/consts/messages"

interface PostsSectionHeaderProps {
  postCount?: number
  id?: string
}

export const PostsSectionHeader = ({ postCount, id }: PostsSectionHeaderProps) => {
  return (
    <header className="flex items-center gap-2">
      <FileText className="size-5 text-muted-foreground" aria-hidden="true" />
      <h2 id={id} className="text-xl font-semibold">{POSTS.TITLE}</h2>
      {postCount !== undefined && (
        <span className="text-sm text-muted-foreground">({postCount})</span>
      )}
    </header>
  )
}
