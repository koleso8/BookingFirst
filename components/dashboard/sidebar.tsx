"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, Settings, LogOut, Home, MessageSquare, LinkIcon } from "lucide-react"
import { signOut } from "next-auth/react"
import { useLanguage } from "@/lib/i18n/language-context"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
}

export function Sidebar({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
    <div className="flex h-screen flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <span className="text-xl font-bold">{t("common.appName")}</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent",
                pathname === item.href ? "bg-accent" : "transparent",
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <Button variant="outline" className="w-full justify-start gap-2" onClick={() => signOut({ callbackUrl: "/" })}>
          <LogOut className="h-4 w-4" />
          {t("auth.signOut")}
        </Button>
      </div>
    </div>
  )
}

export function DashboardSidebar() {
  const { t } = useLanguage()

  const sidebarItems = [
    {
      href: "/dashboard",
      title: t("dashboard.dashboard"),
      icon: <Home className="h-4 w-4" />,
    },
    {
      href: "/dashboard/calendar",
      title: t("dashboard.calendar"),
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      href: "/dashboard/time-slots",
      title: t("dashboard.timeSlots"),
      icon: <Clock className="h-4 w-4" />,
    },
    {
      href: "/dashboard/clients",
      title: t("dashboard.clients"),
      icon: <Users className="h-4 w-4" />,
    },
    {
      href: "/dashboard/booking-link",
      title: t("dashboard.bookingLink"),
      icon: <LinkIcon className="h-4 w-4" />,
    },
    {
      href: "/dashboard/telegram",
      title: t("dashboard.telegram"),
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      href: "/dashboard/settings",
      title: t("dashboard.settings"),
      icon: <Settings className="h-4 w-4" />,
    },
  ]

  return <Sidebar items={sidebarItems} />
}
