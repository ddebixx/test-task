import { Card, CardContent, CardHeader } from "@/components/ui/Card/Card"
import { Skeleton } from "@/components/ui/Skeleton/Skeleton"
import { USER_LIST_SKELETON_COUNT } from "@/consts/consts"

export function UserManagementSkeleton() {
  return (
    <main className="max-w-4xl mx-auto p-6" aria-busy="true">
      <header className="mb-6 flex justify-between items-center" aria-hidden="true">
        <Skeleton className="h-9 w-32" />
      </header>
      <section
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        aria-label="Users list loading"
      >
        {Array.from({ length: USER_LIST_SKELETON_COUNT }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Skeleton className="size-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}
