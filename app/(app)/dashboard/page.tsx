"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useHoustelyStore } from "@/lib/store"
import { Wifi, Router, ShieldCheck, Activity, AlertTriangle, CheckCircle2, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ElementType
  description?: string
  trend?: string // e.g., "+5% from last month"
  trendColor?: string // Tailwind color class for trend
  bgColor?: string // Tailwind background color class
}

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendColor = "text-gray-500",
  bgColor = "bg-houstely-white",
}: StatCardProps) {
  return (
    <Card className={`${bgColor} shadow-lg hover:shadow-xl transition-shadow duration-300`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className="h-5 w-5 text-houstely-teal" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-800">{value}</div>
        {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
        {trend && <p className={`text-xs ${trendColor} pt-1`}>{trend}</p>}
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const { vpnServers, wireguardPeers, caddyRoutes, healthChecks } = useHoustelyStore((state) => ({
    vpnServers: state.vpnServers,
    wireguardPeers: state.wireguardPeers,
    caddyRoutes: state.caddyRoutes,
    healthChecks: state.healthChecks,
  }))

  const onlineVpnServers = vpnServers.filter((s) => s.status === "online").length
  const connectedPeers = wireguardPeers.filter((p) => p.status === "connected").length
  const activeRoutes = caddyRoutes.filter((r) => r.active).length
  const healthyServices = healthChecks.filter((hc) => hc.status === "healthy").length
  const unhealthyServices = healthChecks.filter((hc) => hc.status === "unhealthy").length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
      case "connected":
      case "healthy":
        return (
          <Badge variant="default" className="bg-houstely-darkGreen text-white">
            Healthy
          </Badge>
        )
      case "offline":
      case "disconnected":
      case "unhealthy":
        return (
          <Badge variant="destructive" className="bg-houstely-redOrange text-white">
            Unhealthy
          </Badge>
        )
      case "degraded":
        return (
          <Badge variant="outline" className="bg-houstely-orange text-white border-houstely-orange">
            Degraded
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="VPN Servers Online"
          value={`${onlineVpnServers} / ${vpnServers.length}`}
          icon={ShieldCheck}
          description="Total active VPN gateways"
          bgColor="bg-houstely-white"
        />
        <StatCard
          title="Connected Peers"
          value={`${connectedPeers} / ${wireguardPeers.length}`}
          icon={Wifi}
          description="WireGuard clients currently active"
          bgColor="bg-houstely-white"
        />
        <StatCard
          title="Active Caddy Routes"
          value={`${activeRoutes} / ${caddyRoutes.length}`}
          icon={Router}
          description="Publicly exposed services"
          bgColor="bg-houstely-white"
        />
        <StatCard
          title="Healthy Services"
          value={`${healthyServices} / ${healthChecks.length}`}
          icon={Activity}
          description={
            unhealthyServices > 0 ? `${unhealthyServices} service(s) require attention` : "All services operational"
          }
          trendColor={unhealthyServices > 0 ? "text-houstely-redOrange" : "text-houstely-darkGreen"}
          bgColor="bg-houstely-white"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">VPN Server Status</CardTitle>
            <CardDescription>Overview of your public VPN servers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {vpnServers.length > 0 ? (
              vpnServers.slice(0, 3).map((server) => (
                <div
                  key={server.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {server.name} <span className="text-xs text-gray-500">({server.publicIp})</span>
                    </p>
                    <p className="text-xs text-gray-500">{server.location}</p>
                  </div>
                  {getStatusBadge(server.status)}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No VPN servers configured yet.</p>
            )}
            {vpnServers.length > 3 && (
              <p className="text-sm text-houstely-teal hover:underline cursor-pointer text-center mt-2">
                View all VPN Servers...
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">Recent Peer Activity</CardTitle>
            <CardDescription>Latest WireGuard peer connection statuses.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {wireguardPeers.length > 0 ? (
              wireguardPeers.slice(0, 3).map((peer) => (
                <div
                  key={peer.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-800">{peer.name}</p>
                    <p className="text-xs text-gray-500">Last Handshake: {peer.lastHandshake || "N/A"}</p>
                  </div>
                  {getStatusBadge(peer.status)}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No WireGuard peers configured yet.</p>
            )}
            {wireguardPeers.length > 3 && (
              <p className="text-sm text-houstely-teal hover:underline cursor-pointer text-center mt-2">
                View all Peers...
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">System Health Overview</CardTitle>
          <CardDescription>Aggregated health status of critical components.</CardDescription>
        </CardHeader>
        <CardContent>
          {healthChecks.length > 0 ? (
            <div className="space-y-4">
              {healthChecks.map((hc) => (
                <div key={hc.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {hc.status === "healthy" ? (
                      <CheckCircle2 className="h-5 w-5 text-houstely-darkGreen" />
                    ) : hc.status === "unhealthy" ? (
                      <AlertTriangle className="h-5 w-5 text-houstely-redOrange" />
                    ) : (
                      <Clock className="h-5 w-5 text-houstely-orange" />
                    )}
                    <div>
                      <p className="font-medium text-gray-800">{hc.serviceName}</p>
                      <p className="text-xs text-gray-500">
                        {hc.details || `Last checked: ${new Date(hc.lastChecked).toLocaleTimeString()}`}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(hc.status)}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No health checks configured.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
