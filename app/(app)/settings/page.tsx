"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
        <p className="text-gray-600">Manage your Houstely application settings and preferences.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
          <div className="flex justify-center mt-4">
            <img
              src="/avatar.png"
              alt="Profile Avatar"
              width={80}
              height={80}
              className="rounded-full border-2 border-houstely-teal shadow-md"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="current_user" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="user@example.com" />
          </div>
          <Button className="bg-houstely-teal hover:bg-opacity-80 text-white">Save Profile</Button>
        </CardContent>
      </Card>

      <Separator />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Application Preferences</CardTitle>
          <CardDescription>Customize application behavior.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">More application settings will be here (e.g., theme, notifications).</p>
        </CardContent>
      </Card>
    </div>
  )
}
