"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useHoustelyStoreSelector } from "@/lib/store"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"
import { Loader2 } from "lucide-react"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, isLoading, initialDataLoaded, fetchInitialData } = useHoustelyStoreSelector()

  useEffect(() => {
    console.log(
      "[AppLayout Effect] Checking state - User:",
      user ? user.username : "null",
      "isLoading:",
      isLoading,
      "initialDataLoaded:",
      initialDataLoaded,
    )

    // Priority 1: Handle unauthenticated users.
    // If there is no user object, the user is not authenticated.
    if (!user) {
      console.log("[AppLayout Effect] No user found. Redirecting to /login.")
      router.replace("/login")
      return // Critical: Exit effect after initiating redirect.
    }

    // Priority 2: Handle data fetching for authenticated users.
    // This code is reached only if 'user' is not null.
    if (!initialDataLoaded && !isLoading) {
      // If data isn't loaded and not currently being fetched.
      console.log("[AppLayout Effect] User authenticated. Data not loaded and not currently loading. Fetching data.")
      fetchInitialData()
      // No return needed here, as the effect has done its job for this pass.
      // Subsequent re-renders due to isLoading/initialDataLoaded changes will be handled.
    } else if (initialDataLoaded) {
      console.log("[AppLayout Effect] User authenticated and data already loaded.")
    } else if (isLoading) {
      console.log("[AppLayout Effect] User authenticated and data is currently loading.")
    }
  }, [user, initialDataLoaded, isLoading, router, fetchInitialData])

  // Render logic based on the current state:

  // If there's no user, it means we are in the process of redirecting (triggered by the effect above)
  // or the user state hasn't resolved yet. Show a loader.
  if (!user) {
    console.log("[AppLayout Render] No user. Displaying 'Initializing session...' loader.")
    return (
      <div className="flex items-center justify-center min-h-screen bg-houstely-lightGray">
        <Loader2 className="h-12 w-12 animate-spin text-houstely-teal" />
        <p className="ml-4 text-lg text-gray-700">Initializing session...</p>
      </div>
    )
  }

  // User is authenticated (user object exists).
  // Now, check if the initial data for the session is loaded.
  if (!initialDataLoaded) {
    console.log(
      "[AppLayout Render] User authenticated, but initialDataLoaded is false. Displaying data loader. isLoading:",
      isLoading,
    )
    // Show a loader indicating data is being prepared or actively loading.
    return (
      <div className="flex min-h-screen w-full bg-houstely-lightGray">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-houstely-teal" />
              <p className="ml-3 text-gray-600">
                {isLoading ? "Loading application data..." : "Preparing application data..."}
              </p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  // User is authenticated AND initial data is loaded. Render the main application content.
  console.log("[AppLayout Render] User authenticated and initialDataLoaded is true. Rendering children.")
  return (
    <div className="flex min-h-screen w-full bg-houstely-lightGray">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
