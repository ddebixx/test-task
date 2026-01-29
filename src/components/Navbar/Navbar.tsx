import { Link, useLocation } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { cn } from "@/lib/utils"
import { Users, Settings, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/Button/Button"

export const Navbar = () => {
  const location = useLocation()
  const { theme, setTheme } = useTheme()

  const isActive = (path: string) => {
    return location.pathname.startsWith(path)
  }
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }
  
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="size-5 sm:size-6" />
            <span className="text-base sm:text-lg font-semibold">
              <span className="hidden sm:inline">User Management</span>
              <span className="sm:hidden">Users</span>
            </span>
          </div>
          <div className="flex items-center gap-0.5 sm:gap-1">
            <Link
              to="/"
              className={cn(
                twMerge(
                  "flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive("/") && "bg-accent text-accent-foreground"
                )
              )}
              aria-label="Users list"
            >
              <Users className="size-4" />
              <span className="hidden md:inline">Users List</span>
            </Link>
            <Link
              to="/users/manage"
              className={cn(
                twMerge(
                  "flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive("/users/manage") && "bg-accent text-accent-foreground"
                )
              )}
              aria-label="Manage users"
            >
              <Settings className="size-4" />
              <span className="hidden md:inline">Manage Users</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-1 sm:ml-2"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="size-4 sm:size-5" />
              ) : (
                <Moon className="size-4 sm:size-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
