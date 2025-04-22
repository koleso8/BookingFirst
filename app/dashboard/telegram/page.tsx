"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BellIcon as BrandTelegram, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/i18n/language-context"

export default function TelegramPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isConnected, setIsConnected] = useState(false)
  const [botToken, setBotToken] = useState("")
  const [notifications, setNotifications] = useState({
    newBooking: true,
    bookingConfirmation: true,
    bookingReminder: true,
    bookingCancellation: true,
  })
  const [reminderTime, setReminderTime] = useState("24")

  const handleConnect = () => {
    if (botToken) {
      setIsConnected(true)
      toast({
        title: t("telegram.telegramBotConnected"),
        description: t("telegram.telegramBotConnectedDesc"),
      })
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid bot token",
        variant: "destructive",
      })
    }
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setBotToken("")
    toast({
      title: "Telegram bot disconnected",
      description: "Your Telegram bot has been disconnected",
    })
  }

  const handleNotificationChange = (notification: string, value: boolean) => {
    setNotifications({
      ...notifications,
      [notification]: value,
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{t("telegram.telegramIntegration")}</h2>
      </div>
      <Tabs defaultValue="connect" className="space-y-4">
        <TabsList>
          <TabsTrigger value="connect">{t("telegram.connectTelegramBot")}</TabsTrigger>
          <TabsTrigger value="notifications">{t("telegram.notificationSettings")}</TabsTrigger>
          <TabsTrigger value="templates">{t("telegram.messageTemplates")}</TabsTrigger>
        </TabsList>
        <TabsContent value="connect" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("telegram.connectTelegramBot")}</CardTitle>
              <CardDescription>{t("telegram.connectDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isConnected ? (
                <div className="space-y-4">
                  <div className="rounded-md bg-primary/10 p-4 flex items-center gap-4">
                    <BrandTelegram className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-medium">{t("telegram.telegramBotConnected")}</h3>
                      <p className="text-sm text-muted-foreground">{t("telegram.telegramBotConnectedDesc")}</p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleDisconnect}>
                    {t("telegram.disconnectBot")}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bot-token">{t("telegram.botToken")}</Label>
                    <Input
                      id="bot-token"
                      value={botToken}
                      onChange={(e) => setBotToken(e.target.value)}
                      placeholder={t("telegram.botTokenPlaceholder")}
                    />
                    <p className="text-sm text-muted-foreground">{t("telegram.botTokenHelp")}</p>
                  </div>
                  <Button onClick={handleConnect}>
                    <BrandTelegram className="mr-2 h-4 w-4" />
                    {t("telegram.connectBot")}
                  </Button>
                </div>
              )}
              <div className="rounded-md bg-muted p-4">
                <h3 className="mb-2 font-medium">{t("telegram.howToCreateBot")}</h3>
                <ol className="list-decimal pl-4 text-sm text-muted-foreground">
                  {t("telegram.howToCreateBotSteps").map((step: string, index: number) => (
                    <li key={index} className="mb-1">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("telegram.integrationServices")}</CardTitle>
              <CardDescription>{t("telegram.integrationServicesDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-muted p-2">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">ManyChat</h3>
                    <p className="text-sm text-muted-foreground">Connect with ManyChat for advanced bot features</p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
              <div className="rounded-md border p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-muted p-2">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">SmartSender</h3>
                    <p className="text-sm text-muted-foreground">Connect with SmartSender for automated messaging</p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Решта коду залишається без змін */}
      </Tabs>
    </div>
  )
}
