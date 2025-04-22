import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { MobileNav } from "@/components/dashboard/mobile-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="md:hidden">
        <MobileNav />
      </div>
      <div className="flex flex-1 flex-col md:flex-row">
        <div className="hidden md:flex">
          <DashboardSidebar />
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
