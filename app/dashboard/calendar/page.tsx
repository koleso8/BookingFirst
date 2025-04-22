"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for calendar events
const INITIAL_EVENTS = [
  {
    id: "1",
    title: "Hair Styling - Jane Doe",
    start: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
    end: new Date(new Date().setHours(11, 30, 0, 0)).toISOString(),
    status: "confirmed",
  },
  {
    id: "2",
    title: "Makeup - Alice Johnson",
    start: new Date(new Date().setHours(13, 0, 0, 0)).toISOString(),
    end: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
    status: "confirmed",
  },
  {
    id: "3",
    title: "Nail Art - Bob Brown",
    start: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(11, 0, 0, 0),
    end: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(12, 30, 0, 0),
    status: "pending",
  },
]

export default function CalendarPage() {
  const [events, setEvents] = useState(INITIAL_EVENTS)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    status: "available",
  })

  const handleDateSelect = (selectInfo: any) => {
    setSelectedDate(selectInfo.start)
    setNewEvent({
      ...newEvent,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    })
    setIsDialogOpen(true)
  }

  const handleAddEvent = () => {
    if (newEvent.title) {
      setEvents([
        ...events,
        {
          id: String(events.length + 1),
          title: newEvent.title,
          start: newEvent.start,
          end: newEvent.end,
          status: newEvent.status,
        },
      ])
      setIsDialogOpen(false)
      setNewEvent({
        title: "",
        start: "",
        end: "",
        status: "available",
      })
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>Create a new event or time slot on your calendar.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="e.g., Hair Styling - Client Name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="start-date">Start Date & Time</Label>
                  <Input
                    id="start-date"
                    type="datetime-local"
                    value={newEvent.start}
                    onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="end-date">End Date & Time</Label>
                  <Input
                    id="end-date"
                    type="datetime-local"
                    value={newEvent.end}
                    onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={newEvent.status} onValueChange={(value) => setNewEvent({ ...newEvent, status: value })}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEvent}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Schedule</CardTitle>
          <CardDescription>Manage your appointments and available time slots</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[600px]">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              initialView="timeGridWeek"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              events={events}
              select={handleDateSelect}
              height="100%"
              allDaySlot={false}
              slotMinTime="08:00:00"
              slotMaxTime="20:00:00"
              eventClassNames={(arg) => {
                if (arg.event.extendedProps.status === "confirmed") {
                  return ["bg-primary"]
                } else if (arg.event.extendedProps.status === "pending") {
                  return ["bg-yellow-500"]
                } else {
                  return ["bg-green-500"]
                }
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
