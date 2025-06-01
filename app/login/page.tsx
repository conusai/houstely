"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useHoustelyStore } from "@/lib/store"
import Image from "next/image"
import { ShieldCheck } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const login = useHoustelyStore((state) => state.login)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd validate credentials here
    if (username && password) {
      login(username)
      router.push("/dashboard")
    } else {
      // Basic validation feedback, could use toast
      alert("Please enter username and password.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-houstely-teal to-houstely-purple p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <Image
            src="/cloudely_logo.png"
            alt="Cloudely Logo"
            width={80}
            height={80}
            className="mx-auto mb-4 rounded-lg"
          />
          <CardTitle className="text-3xl font-bold text-gray-800">Welcome to Houstely</CardTitle>
          <CardDescription className="text-gray-600">Manage your network infrastructure with ease.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="e.g., admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="focus:ring-houstely-teal focus:border-houstely-teal"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus:ring-houstely-teal focus:border-houstely-teal"
              />
            </div>
            <Button type="submit" className="w-full bg-houstely-teal hover:bg-opacity-80 text-white font-semibold py-3">
              <ShieldCheck className="mr-2 h-5 w-5" /> Login Securely
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Houstely. Your trusted network partner.</p>
        </CardFooter>
      </Card>
    </div>
  )
}
