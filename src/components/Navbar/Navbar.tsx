import { Link, useLocation } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { cn } from "@/lib/utils"
import { Users, Settings } from "lucide-react"

export const Navbar = () => {
  const location = useLocation()

  function isActive(path: string) {
    if (path === "/") {
      return location.pathname === "/"
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="size-6" />
            <span className="text-lg font-semibold">User Management</span>
          </div>
          <div className="flex items-center gap-1">
            <Link
              to="/"
              className={cn(
                twMerge(
                  "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive("/") && "bg-accent text-accent-foreground"
                )
              )}
            >
              <Users className="size-4" />
              Users List
            </Link>
            <Link
              to="/users/manage"
              className={cn(
                twMerge(
                  "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive("/users/manage") && "bg-accent text-accent-foreground"
                )
              )}
            >
              <Settings className="size-4" />
              Manage Users
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
