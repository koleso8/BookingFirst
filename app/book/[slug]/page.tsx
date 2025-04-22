"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

// Mock data for available time slots
const AVAILABLE_TIME_SLOTS = [
  {
    id: "1",
    date: new Date(),
    slots: [
      { id: "a1", time: "10:00 - 11:30" },
      { id: "a2", time: "13:00 - 14:00" },
    ],
  },
  {
    id: "2",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    slots: [
      { id: "b1", time: "11:00 - 12:30" },
      { id: "b2", time: "15:00 - 16:00" },
    ],
  },
  {
    id: "3",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    slots: [
      { id: "c1", time: "09:00 - 10:30" },
      { id: "c2", time: "14:00 - 15:30" },
    ],
  },
]

export default function BookingPage({ params }: { params: { slug: string } }) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [availableSlots, setAvailableSlots] = useState<any[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Get professional name from slug
  const professionalName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  useEffect(() => {
    if (date) {
      // Find available slots for the selected date
      const slotsForDate = AVAILABLE_TIME_SLOTS.find(
        (item) => format(item.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"),
      )
      setAvailableSlots(slotsForDate?.slots || [])
      setSelectedSlot(null)
    }
  }, [date])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, you would submit the booking to your API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSuccess(true)
    } catch (error) {
      console.error("Error submitting booking:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Booking Request Submitted</CardTitle>
            <CardDescription>Thank you for your booking request</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-primary/10 p-4 text-center">
              <h3 className="font-medium">Your request has been sent!</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {professionalName} will review your request and confirm your appointment soon.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Book Another Appointment
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Book an Appointment</CardTitle>
          <CardDescription>Book an appointment with {professionalName}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            {availableSlots.length > 0 ? (
              <div className="space-y-2">
                <Label>Select Time Slot</Label>
                <RadioGroup value={selectedSlot || ""} onValueChange={setSelectedSlot}>
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot) => (
                      <div key={slot.id}>
                        <RadioGroupItem value={slot.id} id={slot.id} className="peer sr-only" />
                        <Label
                          htmlFor={slot.id}
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Clock className="mb-1 h-4 w-4" />
                          {slot.time}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            ) : (
              <div className="rounded-md bg-muted p-4 text-center">
                <p className="text-sm text-muted-foreground">No available slots for the selected date</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any special requests or information"
                className="min-h-[100px]"
              />
            </div>

            <Button type="submit" className="w-full" disabled={!selectedSlot || isSubmitting}>
              {isSubmitting ? "Submitting..." : "Request Appointment"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
