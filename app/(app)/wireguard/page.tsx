"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function WireGuardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">WireGuard Peers</h1>
          <p className="text-gray-600">Manage internal servers and clients connected via WireGuard.</p>
        </div>
        <Button className="bg-houstely-teal hover:bg-opacity-80 text-white">
          <PlusCircle className="mr-2 h-5 w-5" /> Add Peer
        </Button>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Peer List</CardTitle>
          <CardDescription>A list of all configured WireGuard peers.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            WireGuard peer management interface will be here. (Table, forms for add/edit, status indicators)
          </p>
          {/* Placeholder for table or list of peers */}
        </CardContent>
      </Card>
    </div>
  )
}
