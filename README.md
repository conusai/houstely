# 🚀 **Houstely App**

A modern web application for managing WireGuard VPN peers and Caddy load balancing, built with Next.js. Designed for secure, zero-trust remote access to private resources with a beautiful, user-friendly interface.

## 🖼️ Example

Here's a quick look at Houstely in action:

![Houstely Demo](./public/houstely.gif)

## 🌐 Demo

Try the live demo: [https://www.houstely.dev](https://www.houstely.dev)

## 🚀 High-Level Architecture
```
┌───────────────────────────────────────┐
│             Public Internet           │
└───────────────┬─────────────┬─────────┘
                │             │
       ┌────────▼───┐   ┌──────▼─────┐
       │ Caddy Proxy│   │ VPN Server │  (Public WireGuard)
       └────────────┘   └────────────┘
                │
┌────────────────────────────────────────────┐
│        Internal Server Network             │
│                                            │
│   ┌─────────────┐    ┌──────────────┐      │
│   │ Server A    │    │ Server B     │      │
│   │ (WG Client) │    │ (WG Client)  │      │
│   └─────────────┘    └──────────────┘      │
│        │                   │               │
│        └────── WG Tunnel ──┘               │
└────────────────────────────────────────────┘

Management App:
 - Configures WireGuard peers (Server A, B)
 - Updates Caddy load balancing rules
 - Provides UI for status, management
```

## 💡 **Use Case**

**Why self-host?**

Cloud hosting is getting more expensive—especially if you need high-performance CPUs, lots of RAM, or GPU power. What if you could use your own mini computers or virtual servers at home or in the office, and make them securely available from anywhere? Houstely lets you do just that: expose your local infrastructure to the world, while keeping it safe with a modern, zero-trust network setup.

### Personal Use: Build Your Own Cloud
With the rise of powerful mini PCs, Houstely enables you to:
- **Create Distributed Systems**: Combine multiple mini PCs into a powerful computing cluster
- **Cost-Effective Scaling**: Start small and grow your infrastructure as needed
- **Resource Optimization**: Distribute workloads across your mini PC network
- **Home Lab Enhancement**: Transform your home lab into a professional-grade infrastructure

```
Mini PC Cluster → Houstely → Public Access
- Combine multiple mini PCs (e.g., Intel NUC, Beelink, Minisforum)
- Create a distributed computing environment
- Expose services securely to the internet
- Scale resources by adding more mini PCs
```

### Enterprise Use: Secure Data Access
For organizations with high security requirements:
- **Zero-Trust Architecture**: Secure access to internal resources
- **Data Protection**: Keep sensitive data behind corporate firewalls
- **Controlled Access**: Granular control over who can access what
- **Compliance Ready**: Meet strict security and compliance requirements

```
Corporate Network → Houstely → Secure External Access
- Keep sensitive data internal
- Provide secure access to external partners
- Maintain audit trails
- Scale securely as needed
```

## 🎯 **Problem Space**

### 1. Basic Web Services & APIs
Start by securely exposing your internal web services and APIs:
- **Web Applications**: Host internal web apps (e.g., Next.js, React, Vue)
- **API Services**: Expose internal APIs (e.g., REST, GraphQL)
- **Open Source Services**: Run services like GitLab, Jupyter, Portainer
- **Development Tools**: Access development tools and dashboards

```
Public Internet → WireGuard VPN → Caddy → Internal Services
- Map domains to specific services (e.g., git.yourdomain.com → GitLab)
- Load balance traffic across multiple instances
- Secure access with WireGuard VPN
- Monitor service health and performance
```

### 2. Private Infrastructure Management
Scale your infrastructure while maintaining security:
- **Container Management**: Access Docker/Podman containers
- **Virtual Machines**: Manage KVM/QEMU instances
- **Service Discovery**: Automatically discover and manage services
- **Load Balancing**: Distribute traffic across multiple instances

```
Public Domain → Caddy → WireGuard → Internal Services
- KVM instances
- Docker containers
- API services
- Web applications
```

### 3. AI & High-Performance Computing
Extend to handle demanding AI and computing workloads:
- **Distributed Computing**: Connect multiple machines for AI workloads
- **Resource Optimization**: Route requests to available resources
- **GPU Management**: Distribute AI inference across multiple GPUs
- **Performance Monitoring**: Track resource utilization

```
Public Internet → WireGuard VPN → Caddy → Internal AI Services
- Distribute AI workloads across multiple GPUs
- Load balance inference requests
- Secure access to AI models
- Monitor GPU utilization
```

### 4. Multi-Environment Management
Manage different environments seamlessly:
```
Development → Staging → Production
- Route traffic based on environment
- Manage multiple instances
- Monitor service health
- Scale resources dynamically
```

### Key Benefits
- **Security**: Zero-trust access through WireGuard VPN
- **Simplicity**: Easy domain mapping and service management
- **Scalability**: Load balancing and resource distribution
- **Monitoring**: Real-time service health and performance tracking
- **Flexibility**: Support for various types of services and workloads

---

## 🏗️ **Tech Stack**

🔹 **Next.js 14** – React framework with App Router  
🔹 **TypeScript** – For type-safe development  
🔹 **TailwindCSS** – For styling and responsive design  
🔹 **Zustand** – State management  
🔹 **Shadcn/ui** – UI component library  
🔹 **Lucide Icons** – Icon library  
🔹 **WireGuard** – Fast, secure VPN tunneling  
🔹 **Caddy** – Modern reverse proxy and load balancer  

---

## ⚙️ **Features**
✅ **Secure Access to Private Networks** – Access private subnets behind firewalls without opening ports  
✅ **Dynamic Load Balancing** – Configure Caddy to route traffic across multiple internal servers  
✅ **WireGuard Peer Management** – Add, remove, and monitor VPN peers  
✅ **Modern UI/UX** with responsive design  
✅ **Type-safe** development with TypeScript  
✅ **Efficient state management** with Zustand  
✅ **Beautiful components** with Shadcn/ui  
✅ **Client-side routing** with Next.js App Router  

---

## 📂 **Project Structure**
```
project-root/
├── app/                    # Next.js app directory
│   ├── (app)/             # Protected app routes
│   │   ├── dashboard/     # Dashboard page
│   │   ├── vpn-servers/   # VPN servers management
│   │   ├── wireguard/     # WireGuard peers management
│   │   ├── caddy/         # Caddy routes management
│   │   ├── monitoring/    # System monitoring
│   │   └── layout.tsx     # App layout with auth
│   ├── (auth)/            # Auth routes
│   │   ├── login/         # Login page
│   │   └── layout.tsx     # Auth layout
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── layout/           # Layout components
├── lib/                  # Utility functions
│   ├── store.ts         # Zustand store
│   └── types.ts         # TypeScript types
├── public/              # Static assets
├── styles/             # Global styles
├── .env.local          # Environment variables
├── next.config.js      # Next.js configuration
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind configuration
└── tsconfig.json       # TypeScript configuration
```

---

## 🚀 **Getting Started**

### 1️⃣ **Clone the Repo**
```bash
git clone https://github.com/your-repo/houstely-app.git
cd houstely-app
```

### 2️⃣ **Install Dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3️⃣ **Configure Environment Variables**
Create a `.env.local` file with your configuration:
```env
# WireGuard Configuration
WG_INTERFACE=wg0
WG_PORT=51820

# Caddy Configuration
CADDY_API_ENDPOINT=http://localhost:2019
```

### 4️⃣ **Run Development Server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🛠️ **Development**

### Building for Production
```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Running Production Build
```bash
npm start
# or
yarn start
# or
pnpm start
```

---

## 🖥️ **System Requirements**
- **Node.js 18+**
- **npm/yarn/pnpm**
- **WireGuard** installed and configured
- **Caddy** installed and configured

---

## 📌 **Future Enhancements**
- 🔒 Enhanced authentication system with local auth support
- 📈 Advanced monitoring features for VPN and Caddy metrics
- 🌐 Multi-region support with automatic failover
- 🎨 Additional UI themes
- 🔄 Real-time status updates
- 📱 Mobile-responsive design improvements

---

## 🤝 **Contributing**
PRs, issues, and feature requests are welcome!

- Please follow our coding style (Next.js with TypeScript, Tailwind CSS)
- Include tests and documentation as needed
- Use `/cloudely_logo.png` for branding where a logo is needed
- By contributing, you agree your code will be licensed under the GNU Affero General Public License v3.0 (AGPL-3.0)

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

---

## 📝 **License**

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

- You are free to use, modify, and distribute this software under the terms of the AGPL-3.0.
- If you run a modified version of this software on a server and let users interact with it, you must make the source code available to those users.
- See the [LICENSE](./LICENSE) file for the full text.

## 🐳 **Docker Deployment**

Houstely can be deployed using Docker Compose, which sets up all required services:

### 1. Prerequisites
- Docker and Docker Compose installed
- Ports 80, 443, 51820 (UDP) available
- Root/sudo access for WireGuard

### 2. Configuration
1. Create required directories:
```bash
mkdir -p caddy_data caddy_config wireguard_config
```

2. Configure environment variables in `.env`:
```env
WG_INTERFACE=wg0
WG_PORT=51820
CADDY_API_ENDPOINT=http://caddy:2019
```

### 3. Start Services
```bash
docker-compose up -d
```

This will start:
- **Frontend**: Next.js application
- **Caddy**: Reverse proxy and load balancer
- **WireGuard**: VPN server

### 4. Access Services
- Frontend: http://localhost:3000
- Caddy API: http://localhost:2019 (internal)
- WireGuard: UDP port 51820

### 5. Service Management
```bash
# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

### 6. WireGuard Configuration
After starting the services:
1. Check WireGuard logs for QR code:
```bash
docker-compose logs wireguard
```
2. Scan QR code with WireGuard mobile app
3. Connect to VPN

### 7. Adding Custom Domains
Edit `Caddyfile` to add your domains:
```caddy
your-domain.com {
    reverse_proxy frontend:3000
}
```
