import { BrowserRouter, Routes, Route } from "react-router-dom"
import { UsersList } from "./features/UsersList/UsersList"
import { Navbar } from "./components/Navbar/Navbar"
import UserPage from "./pages/user/[slug]/page"
import UserManagement from "./pages/user-management/page"
import { OfflineIndicator } from "./components/OfflineIndicator/OfflineIndicator"

function App() {
  return (
    <BrowserRouter>
      <OfflineIndicator />
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="max-w-4xl mx-auto flex flex-col w-full">
                <UsersList />
              </div>
            }
          />
          <Route path="/users/manage" element={<UserManagement />} />
          <Route path="/users/:slug" element={<UserPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
