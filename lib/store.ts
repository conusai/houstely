"use client"

import { createWithEqualityFn } from "zustand/traditional"
import { shallow } from "zustand/shallow"
import type { User, VpnServer, WireGuardPeer, CaddyRoute, HealthCheck, ServerStatus, PeerStatus } from "./types"

interface HoustelyState {
  user: User | null
  vpnServers: VpnServer[]
  wireguardPeers: WireGuardPeer[]
  caddyRoutes: CaddyRoute[]
  healthChecks: HealthCheck[]
  isLoading: boolean
  error: string | null
  initialDataLoaded: boolean

  login: (username: string) => void
  logout: () => void

  fetchInitialData: () => void

  addVpnServer: (server: Omit<VpnServer, "id" | "status" | "cpuUsage" | "memoryUsage" | "diskUsage" | "uptime">) => void
  updateVpnServer: (server: Partial<VpnServer> & { id: string }) => void
  removeVpnServer: (serverId: string) => void
  updateVpnServerStatus: (serverId: string, status: ServerStatus) => void

  addWireGuardPeer: (
    peer: Omit<WireGuardPeer, "id" | "status" | "lastHandshake" | "transferRx" | "transferTx" | "connectedAt">,
  ) => void
  updateWireGuardPeer: (peer: Partial<WireGuardPeer> & { id: string }) => void
  removeWireGuardPeer: (peerId: string) => void
  updateWireGuardPeerStatus: (peerId: string, status: PeerStatus) => void

  addCaddyRoute: (route: Omit<CaddyRoute, "id" | "active" | "lastModified">) => void
  updateCaddyRoute: (route: Partial<CaddyRoute> & { id: string }) => void
  removeCaddyRoute: (routeId: string) => void
  toggleCaddyRouteActive: (routeId: string) => void

  addHealthCheck: (check: Omit<HealthCheck, "id" | "lastChecked">) => void
  updateHealthCheck: (check: Partial<HealthCheck> & { id: string }) => void
}

const initialVpnServers: VpnServer[] = [
  {
    id: "vpn-server-1",
    name: "Main VPN Gateway",
    publicIp: "192.0.2.10",
    listenPort: 51820,
    publicKey: "PubKeyVpnServ1...",
    status: "online",
    location: "New York, USA",
    cpuUsage: 25,
    memoryUsage: 40,
    diskUsage: 60,
    uptime: "15 days",
  },
  {
    id: "vpn-server-2",
    name: "Backup VPN EU",
    publicIp: "203.0.113.25",
    listenPort: 51820,
    publicKey: "PubKeyVpnServ2...",
    status: "degraded",
    location: "Frankfurt, DE",
    cpuUsage: 75,
    memoryUsage: 60,
    diskUsage: 30,
    uptime: "2 days",
  },
]

const initialWireguardPeers: WireGuardPeer[] = [
  {
    id: "peer-1",
    name: "Web Server Alpha",
    publicKey: "PubKeyPeer1...",
    allowedIPs: "10.0.0.2/32",
    status: "connected",
    lastHandshake: "2 minutes ago",
    transferRx: 1024,
    transferTx: 512,
    connectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    notes: "Main production web server",
  },
  {
    id: "peer-2",
    name: "Database Server",
    publicKey: "PubKeyPeer2...",
    allowedIPs: "10.0.0.3/32",
    status: "disconnected",
    lastHandshake: "3 hours ago",
    transferRx: 120,
    transferTx: 30,
    notes: "PostgreSQL primary DB",
  },
  {
    id: "peer-3",
    name: "API Service Beta",
    publicKey: "PubKeyPeer3...",
    allowedIPs: "10.0.0.4/32",
    status: "unknown",
    lastHandshake: null,
    transferRx: 0,
    transferTx: 0,
  },
]

const initialCaddyRoutes: CaddyRoute[] = [
  {
    id: "route-1",
    domain: "app.houstely.com",
    path: "/",
    targetServiceId: "peer-1",
    targetPort: 80,
    active: true,
    description: "Main application frontend",
    lastModified: new Date().toISOString(),
  },
  {
    id: "route-2",
    domain: "api.houstely.com",
    path: "/v1",
    targetServiceId: "peer-3",
    targetPort: 3000,
    active: false,
    description: "Beta API endpoint",
    lastModified: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
]

const initialHealthChecks: HealthCheck[] = [
  {
    id: "hc-1",
    serviceId: "vpn-server-1",
    serviceName: "Main VPN Gateway",
    status: "healthy",
    lastChecked: new Date().toISOString(),
    details: "All systems nominal.",
  },
  {
    id: "hc-2",
    serviceId: "peer-1",
    serviceName: "Web Server Alpha",
    status: "healthy",
    lastChecked: new Date().toISOString(),
    details: "Responded in 25ms.",
  },
  {
    id: "hc-3",
    serviceId: "peer-2",
    serviceName: "Database Server",
    status: "unhealthy",
    lastChecked: new Date().toISOString(),
    details: "Connection timed out.",
  },
]

// Create a stable selector
const selector = (state: HoustelyState) => ({
  user: state.user,
  isLoading: state.isLoading,
  initialDataLoaded: state.initialDataLoaded,
  fetchInitialData: state.fetchInitialData,
})

// Create the store with equality function
export const useHoustelyStore = createWithEqualityFn<HoustelyState>()(
  (set, get) => ({
    user: null,
    vpnServers: [],
    wireguardPeers: [],
    caddyRoutes: [],
    healthChecks: [],
    isLoading: false,
    error: null,
    initialDataLoaded: false,

    login: (username) => {
      console.log("[Store login] Logging in user:", username)
      set({
        user: { id: "user-1", username, avatarUrl: "/avatar.png" },
        error: null,
        initialDataLoaded: false,
        isLoading: false,
      })
    },
    logout: () => {
      console.log("[Store logout] Logging out user.")
      set({
        user: null,
        vpnServers: [],
        wireguardPeers: [],
        caddyRoutes: [],
        healthChecks: [],
        initialDataLoaded: false,
        isLoading: false,
      })
    },

    fetchInitialData: () => {
      const currentState = get()
      if (currentState.isLoading || currentState.initialDataLoaded) {
        console.log(
          "[Store fetchInitialData] Guard triggered. Aborting fetch. isLoading:",
          currentState.isLoading,
          "initialDataLoaded:",
          currentState.initialDataLoaded,
        )
        return
      }
      console.log("[Store fetchInitialData] Proceeding to fetch data.")
      set({ isLoading: true, error: null })

      // Simulate API calls with timeouts
      Promise.all([
        new Promise((resolve) => setTimeout(resolve, 1000)),
        new Promise((resolve) => setTimeout(resolve, 1500)),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ])
        .then(() => {
          console.log("[Store fetchInitialData] All data fetched successfully.")
          set({
            vpnServers: initialVpnServers,
            wireguardPeers: initialWireguardPeers,
            caddyRoutes: initialCaddyRoutes,
            healthChecks: initialHealthChecks,
            initialDataLoaded: true,
            isLoading: false,
          })
        })
        .catch((error) => {
          console.error("[Store fetchInitialData] Error fetching data:", error)
          set({ error: "Failed to fetch initial data", isLoading: false })
        })
    },

    // VPN Server Management
    addVpnServer: (serverData) =>
      set((state) => ({
        vpnServers: [...state.vpnServers, { ...serverData, id: `vpn-${Date.now()}`, status: "unknown" }],
      })),
    updateVpnServer: (serverUpdate) =>
      set((state) => ({
        vpnServers: state.vpnServers.map((s) => (s.id === serverUpdate.id ? { ...s, ...serverUpdate } : s)),
      })),
    removeVpnServer: (serverId) =>
      set((state) => ({
        vpnServers: state.vpnServers.filter((s) => s.id !== serverId),
      })),
    updateVpnServerStatus: (serverId, status) =>
      set((state) => ({
        vpnServers: state.vpnServers.map((s) => (s.id === serverId ? { ...s, status } : s)),
      })),

    // WireGuard Peer Management
    addWireGuardPeer: (peerData) =>
      set((state) => ({
        wireguardPeers: [
          ...state.wireguardPeers,
          { ...peerData, id: `peer-${Date.now()}`, status: "unknown", lastHandshake: null, transferRx: 0, transferTx: 0 },
        ],
      })),
    updateWireGuardPeer: (peerUpdate) =>
      set((state) => ({
        wireguardPeers: state.wireguardPeers.map((p) => (p.id === peerUpdate.id ? { ...p, ...peerUpdate } : p)),
      })),
    removeWireGuardPeer: (peerId) =>
      set((state) => ({
        wireguardPeers: state.wireguardPeers.filter((p) => p.id !== peerId),
      })),
    updateWireGuardPeerStatus: (peerId, status) =>
      set((state) => ({
        wireguardPeers: state.wireguardPeers.map((p) => (p.id === peerId ? { ...p, status } : p)),
      })),

    // Caddy Route Management
    addCaddyRoute: (routeData) =>
      set((state) => ({
        caddyRoutes: [
          ...state.caddyRoutes,
          { ...routeData, id: `route-${Date.now()}`, active: false, lastModified: new Date().toISOString() },
        ],
      })),
    updateCaddyRoute: (routeUpdate) =>
      set((state) => ({
        caddyRoutes: state.caddyRoutes.map((r) =>
          r.id === routeUpdate.id ? { ...r, ...routeUpdate, lastModified: new Date().toISOString() } : r,
        ),
      })),
    removeCaddyRoute: (routeId) =>
      set((state) => ({
        caddyRoutes: state.caddyRoutes.filter((r) => r.id !== routeId),
      })),
    toggleCaddyRouteActive: (routeId) =>
      set((state) => ({
        caddyRoutes: state.caddyRoutes.map((r) =>
          r.id === routeId ? { ...r, active: !r.active, lastModified: new Date().toISOString() } : r,
        ),
      })),

    // Health Check Management
    addHealthCheck: (checkData) =>
      set((state) => ({
        healthChecks: [
          ...state.healthChecks,
          { ...checkData, id: `hc-${Date.now()}`, lastChecked: new Date().toISOString() },
        ],
      })),
    updateHealthCheck: (checkUpdate) =>
      set((state) => ({
        healthChecks: state.healthChecks.map((hc) =>
          hc.id === checkUpdate.id ? { ...hc, ...checkUpdate, lastChecked: new Date().toISOString() } : hc,
        ),
      })),
  }),
  shallow
)

// Export a hook that uses the stable selector
export const useHoustelyStoreSelector = () => useHoustelyStore(selector, shallow)
