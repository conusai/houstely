export interface User {
  id: string
  username: string
  avatarUrl?: string
}

export type ServerStatus = "online" | "offline" | "degraded" | "unknown"
export type PeerStatus = "connected" | "disconnected" | "unknown"

export interface VpnServer {
  id: string
  name: string
  publicIp: string
  listenPort: number
  publicKey: string
  status: ServerStatus
  location: string
  cpuUsage?: number // percentage
  memoryUsage?: number // percentage
  diskUsage?: number // percentage
  uptime?: string // e.g., "23 days"
}

export interface WireGuardPeer {
  id: string
  name: string
  publicKey: string
  allowedIPs: string
  endpoint?: string // For client peers
  status: PeerStatus
  lastHandshake?: string | null // ISO date string or relative time
  transferRx: number // in MB
  transferTx: number // in MB
  connectedAt?: string | null // ISO date string
  notes?: string
}

export interface CaddyRoute {
  id: string
  domain: string
  path: string
  targetServiceId: string // ID of WireGuardPeer
  targetPort: number
  active: boolean
  description?: string
  lastModified?: string // ISO date string
}

export interface HealthCheck {
  id: string
  serviceId: string // Could be VpnServer ID or WireGuardPeer ID
  serviceName: string
  status: "healthy" | "unhealthy" | "pending"
  lastChecked: string // ISO date string
  details?: string
}
