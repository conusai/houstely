import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider" // Assuming this exists for shadcn
import { Toaster } from "@/components/ui/toaster" // For notifications

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Houstely - VPN & Proxy Management",
  description: "Manage your WireGuard VPN servers and Caddy proxies with ease.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/cloudely_logo.png" type="image/png" />
      </head>
      <body className={`${inter.className} bg-houstely-lightGray`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // Force light theme based on brand colors
          enableSystem={false} // Disable system theme preference
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
