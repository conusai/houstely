"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Wifi, Router, Activity, Settings, LogOut, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useHoustelyStore } from "@/lib/store"
import { useRouter } from "next/navigation"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/vpn-servers", label: "VPN Servers", icon: ShieldCheck },
  { href: "/wireguard", label: "WireGuard Peers", icon: Wifi },
  { href: "/caddy", label: "Caddy Routes", icon: Router },
  { href: "/monitoring", label: "Monitoring", icon: Activity },
]

export default function Sidebar() {
  const pathname = usePathname()
  const logout = useHoustelyStore((state) => state.logout)
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-houstely-white border-r border-houstely-lightGray shadow-lg">
      <div className="flex items-center justify-center h-20 border-b border-houstely-lightGray px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/cloudely_logo.png" alt="Cloudely Logo" width={40} height={40} className="rounded-md" />
          <span className="text-2xl font-bold text-houstely-teal">Houstely</span>
        </Link>
      </div>
      <nav className="flex-1 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center px-6 py-3 text-sm font-medium transition-colors",
              pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
                ? "bg-houstely-teal/10 text-houstely-teal border-r-4 border-houstely-teal"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-4 border-t border-houstely-lightGray">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:bg-red-100 hover:text-red-700"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
        <Link
          href="/settings" // Placeholder for settings
          className={cn(
            "flex items-center px-2 py-3 mt-2 text-sm font-medium transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md",
          )}
        >
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </Link>
      </div>
    </aside>
  )
}
