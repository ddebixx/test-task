import { Suspense } from "react"
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { UsersList } from "./features/UsersList/UsersList"
import { Navbar } from "./components/Navbar/Navbar"
import UserPage from "./pages/user/[slug]/page"
import UserManagement from "./pages/user-management/page"
import { QueryErrorBoundary } from "./components/QueryErrorBoundary/QueryErrorBoundary"
import { UserListSkeleton } from "./features/UsersList/UserListSkeleton"
import { UserManagementSkeleton } from "./features/UserManagement/UserManagementSkeleton"
import { UserPageSkeleton } from "./features/UserCard/UserPageSkeleton"
import { usersQueryKey } from "./queries/usersQueryOptions"
import { userQueryKey } from "./queries/userQueryOptions"
import { parseUserSlugParams } from "./utils/userSlugParams"
import { USER_MANAGEMENT, USER_PAGE, USERS_LIST } from "./consts/messages"

function UsersListRoute() {
  const queryClient = useQueryClient()
  
  return (
    <main className="max-w-4xl mx-auto flex flex-col w-full">
      <QueryErrorBoundary
        message={USERS_LIST.ERROR}
        retryLabel={USERS_LIST.RETRY}
        ariaLabel="Error loading users"
        onRetry={() => queryClient.refetchQueries({ queryKey: usersQueryKey })}
      >
        <Suspense fallback={<UserListSkeleton />}>
          <UsersList />
        </Suspense>
      </QueryErrorBoundary>
    </main>
  )
}

function UserManagementRoute() {
  const queryClient = useQueryClient()
  return (
    <QueryErrorBoundary
      message={USER_MANAGEMENT.ERROR}
      retryLabel={USER_MANAGEMENT.RETRY}
      ariaLabel="Error loading users"
      onRetry={() => queryClient.refetchQueries({ queryKey: usersQueryKey })}
    >
      <Suspense fallback={<UserManagementSkeleton />}>
        <UserManagement />
      </Suspense>
    </QueryErrorBoundary>
  )
}

function UserPageRoute() {
  const queryClient = useQueryClient()
  const slug = parseUserSlugParams(useParams())
  
  if (slug === undefined) {
    return null
  }
  
  return (
    <QueryErrorBoundary
      message={USER_PAGE.ERROR}
      retryLabel={USER_PAGE.RETRY}
      ariaLabel="Error loading user"
      onRetry={() => slug && queryClient.refetchQueries({ queryKey: userQueryKey(slug) })}
    >
      <Suspense fallback={<UserPageSkeleton />}>
        <UserPage />
      </Suspense>
    </QueryErrorBoundary>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <Routes>
          <Route path="/" element={<UsersListRoute />} />
          <Route path="/users/manage" element={<UserManagementRoute />} />
          <Route path="/users/:slug" element={<UserPageRoute />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
