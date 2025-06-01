"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function VpnServersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">VPN Servers</h1>
          <p className="text-gray-600">Manage your public WireGuard VPN server instances.</p>
        </div>
        <Button className="bg-houstely-teal hover:bg-opacity-80 text-white">
          <PlusCircle className="mr-2 h-5 w-5" /> Add VPN Server
        </Button>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>VPN Server List</CardTitle>
          <CardDescription>A list of all configured VPN servers.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">VPN server management interface will be here. (Table, actions, etc.)</p>
          {/* Placeholder for table or list of VPN servers */}
        </CardContent>
      </Card>
    </div>
  )
}
