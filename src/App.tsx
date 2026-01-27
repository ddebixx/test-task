import { BrowserRouter, Routes, Route } from "react-router-dom"
import { UsersList } from "./features/UsersList/UsersList"
import UserPage from "./pages/user/[slug]/page"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="max-w-6xl mx-auto flex flex-col">
              <UsersList />
            </div>
          }
        />
        <Route path="/users/:slug" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
