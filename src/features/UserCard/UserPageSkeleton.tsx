import { Skeleton } from "@/components/ui/Skeleton/Skeleton"

export const UserPageSkeleton = () => (
  <main className="max-w-4xl mx-auto p-6" aria-busy="true">
    <header className="mb-6" aria-hidden="true">
      <Skeleton className="h-10 w-32" />
    </header>
    <section className="space-y-6" aria-label="User details loading">
      <Skeleton className="h-64 w-full" />
    </section>
  </main>
)
