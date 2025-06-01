"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function CaddyPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Caddy Routes</h1>
          <p className="text-gray-600">Manage Caddy proxy routing rules to expose internal services.</p>
        </div>
        <Button className="bg-houstely-teal hover:bg-opacity-80 text-white">
          <PlusCircle className="mr-2 h-5 w-5" /> Add Route
        </Button>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Route Configuration</CardTitle>
          <CardDescription>View and edit backend routing rules.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Caddy route management interface will be here. (Table, forms for add/edit, toggle active status)
          </p>
          {/* Placeholder for table or list of routes */}
        </CardContent>
      </Card>
    </div>
  )
}
