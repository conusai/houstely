"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useHoustelyStore } from "@/lib/store"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const hasRedirected = useRef(false)

  useEffect(() => {
    if (hasRedirected.current) {
      return
    }
    console.log("[HomePage Effect] Checking user for initial redirect.")
    // Perform the check and redirect only once.
    // getState() is a non-reactive way to get the current state.
    const currentUser = useHoustelyStore.getState().user

    if (currentUser) {
      console.log("[HomePage Effect] User found. Redirecting to /dashboard.")
      router.replace("/dashboard")
    } else {
      console.log("[HomePage Effect] No user found. Redirecting to /login.")
      router.replace("/login")
    }
    hasRedirected.current = true
  }, [router]) // Only depends on router, which is stable.

  return (
    <div className="flex items-center justify-center min-h-screen bg-houstely-lightGray">
      <Loader2 className="h-12 w-12 animate-spin text-houstely-teal" />
      <p className="ml-4 text-lg text-gray-700">Initializing Houstely...</p>
    </div>
  )
}
