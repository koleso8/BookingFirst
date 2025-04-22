"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Share2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export default function BookingLinkPage() {
  const { toast } = useToast()
  const [bookingLink, setBookingLink] = useState("https://beautypro.app/book/jane-doe")
  const [isCustomizing, setIsCustomizing] = useState(false)
  const [customLink, setCustomLink] = useState("jane-doe")
  const [settings, setSettings] = useState({
    allowCancellations: true,
    requireApproval: true,
    showAvailableOnly: true,
    bufferTime: 15,
  })

  const handleCopyLink = () => {
    navigator.clipboard.writeText(bookingLink)
    toast({
      title: "Link copied!",
      description: "Booking link has been copied to clipboard",
    })
  }

  const handleSaveCustomLink = () => {
    setBookingLink(`https://beautypro.app/book/${customLink}`)
    setIsCustomizing(false)
    toast({
      title: "Link updated!",
      description: "Your booking link has been updated",
    })
  }

  const handleSettingChange = (setting: string, value: boolean | number) => {
    setSettings({
      ...settings,
      [setting]: value,
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Booking Link</h2>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
      <Tabs defaultValue="link" className="space-y-4">
        <TabsList>
          <TabsTrigger value="link">Your Link</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="link" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Booking Link</CardTitle>
              <CardDescription>Share this link with your clients to allow them to book appointments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isCustomizing ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">https://beautypro.app/book/</span>
                    <Input
                      value={customLink}
                      onChange={(e) => setCustomLink(e.target.value)}
                      className="max-w-[200px]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveCustomLink}>Save</Button>
                    <Button variant="outline" onClick={() => setIsCustomizing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Input value={bookingLink} readOnly />
                    <Button variant="outline" size="icon" onClick={handleCopyLink}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline" onClick={() => setIsCustomizing(true)}>
                    Customize Link
                  </Button>
                </div>
              )}
              <div className="rounded-md bg-muted p-4">
                <h3 className="mb-2 font-medium">How it works</h3>
                <ol className="list-decimal pl-4 text-sm text-muted-foreground">
                  <li className="mb-1">Share your booking link with clients</li>
                  <li className="mb-1">They select an available time slot</li>
                  <li className="mb-1">You receive a notification and can approve or reject</li>
                  <li>Once approved, the appointment is confirmed</li>
                </ol>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>QR Code</CardTitle>
              <CardDescription>Clients can scan this QR code to access your booking page</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <div className="h-48 w-48 bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">QR Code will appear here</p>
              </div>
              <Button variant="outline" className="mt-4">
                Download QR Code
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking Settings</CardTitle>
              <CardDescription>Customize how your booking system works</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allow-cancellations">Allow Cancellations</Label>
                  <p className="text-sm text-muted-foreground">Let clients cancel their appointments</p>
                </div>
                <Switch
                  id="allow-cancellations"
                  checked={settings.allowCancellations}
                  onCheckedChange={(checked) => handleSettingChange("allowCancellations", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="require-approval">Require Approval</Label>
                  <p className="text-sm text-muted-foreground">Manually approve each booking request</p>
                </div>
                <Switch
                  id="require-approval"
                  checked={settings.requireApproval}
                  onCheckedChange={(checked) => handleSettingChange("requireApproval", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-available-only">Show Available Slots Only</Label>
                  <p className="text-sm text-muted-foreground">Only display time slots that are available</p>
                </div>
                <Switch
                  id="show-available-only"
                  checked={settings.showAvailableOnly}
                  onCheckedChange={(checked) => handleSettingChange("showAvailableOnly", checked)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buffer-time">Buffer Time (minutes)</Label>
                <p className="text-sm text-muted-foreground">Add buffer time between appointments</p>
                <Input
                  id="buffer-time"
                  type="number"
                  value={settings.bufferTime}
                  onChange={(e) => handleSettingChange("bufferTime", Number.parseInt(e.target.value))}
                  min={0}
                  max={60}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking Page Preview</CardTitle>
              <CardDescription>This is how your booking page will appear to clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4 h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Booking page preview will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
