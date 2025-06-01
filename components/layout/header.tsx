"use client"

import Image from "next/image"
import {
  Bell,
  Menu,
  Search,
  UserCircle,
  LayoutDashboard,
  ShieldCheck,
  Wifi,
  Router,
  Activity,
  LogOut,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { useHoustelyStore } from "@/lib/store"
import { usePathname, useRouter } from "next/navigation" // Added useRouter
import { cn } from "@/lib/utils" // Added cn
import { useMemo } from "react"

// Re-define navItems here or import from Sidebar if structure allows
const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/vpn-servers", label: "VPN Servers", icon: ShieldCheck },
  { href: "/wireguard", label: "WireGuard Peers", icon: Wifi },
  { href: "/caddy", label: "Caddy Routes", icon: Router },
  { href: "/monitoring", label: "Monitoring", icon: Activity },
]

export default function Header() {
  const user = useHoustelyStore((state) => state.user)
  const logout = useHoustelyStore((state) => state.logout) // Added logout
  const router = useRouter() // Added router
  const pathname = usePathname() // Added pathname

  const handleLogout = () => {
    // Added handleLogout
    logout()
    router.push("/login")
  }

  const pageTitle = navItems.find((item) => pathname.startsWith(item.href))?.label || "Houstely"

  const userMenu = useMemo(() => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          {user?.avatarUrl ? (
            <Image
              src={user.avatarUrl || "/placeholder.svg"}
              width={36}
              height={36}
              alt="User avatar"
              className="rounded-full border-2 border-houstely-teal"
            />
          ) : (
            <UserCircle className="h-7 w-7 text-gray-600" />
          )}
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-gray-800">{user?.username || "User"}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.username ? `${user.username}@houstely.com` : "email@example.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ), [user, handleLogout])

  return (
    <header className="flex h-16 items-center justify-between border-b bg-houstely-white px-4 sm:px-6 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-60 p-0">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-muted-foreground transition-all hover:text-primary bg-houstely-teal/5 mb-2 border-b"
              >
                <Image src="/cloudely_logo.png" alt="Cloudely Logo" width={32} height={32} className="rounded-md" />
                <span className="font-semibold text-houstely-teal">Houstely</span>
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-2 transition-all",
                    pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
                      ? "bg-houstely-teal/10 text-houstely-teal"
                      : "text-muted-foreground hover:text-primary hover:bg-gray-100",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:bg-red-100 hover:text-red-700"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <h1 className="text-xl font-semibold text-gray-700 hidden md:block">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <form className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 sm:w-[200px] md:w-[250px] lg:w-[300px] rounded-full bg-houstely-lightGray/50 focus:bg-white"
          />
        </form>
        <Button variant="ghost" size="icon" className="rounded-full text-gray-600 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        {userMenu}
      </div>
    </header>
  )
}
