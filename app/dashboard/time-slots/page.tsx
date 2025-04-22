"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, Clock, Edit, Trash2, Check, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

// Mock data for time slots
const INITIAL_TIME_SLOTS = [
  {
    id: "1",
    date: new Date(),
    startTime: "10:00",
    endTime: "11:30",
    status: "available",
  },
  {
    id: "2",
    date: new Date(),
    startTime: "13:00",
    endTime: "14:00",
    status: "booked",
    clientName: "Jane Doe",
  },
  {
    id: "3",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    startTime: "11:00",
    endTime: "12:30",
    status: "available",
  },
  {
    id: "4",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    startTime: "15:00",
    endTime: "16:00",
    status: "pending",
    clientName: "John Smith",
  },
]

export default function TimeSlotsPage() {
  const [timeSlots, setTimeSlots] = useState(INITIAL_TIME_SLOTS)

  const handleStatusChange = (id: string, newStatus: string) => {
    setTimeSlots(timeSlots.map((slot) => (slot.id === id ? { ...slot, status: newStatus } : slot)))
  }

  const handleDelete = (id: string) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== id))
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Time Slots</h2>
        <Link href="/dashboard/time-slots/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Time Slot
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Time Slots</CardTitle>
          <CardDescription>View and manage your available time slots and bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timeSlots.map((slot) => (
                <TableRow key={slot.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {format(slot.date, "MMM dd, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {slot.startTime} - {slot.endTime}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        slot.status === "available" ? "outline" : slot.status === "booked" ? "default" : "secondary"
                      }
                    >
                      {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{slot.clientName || "-"}</TableCell>
                  <TableCell className="text-right">
                    {slot.status === "pending" ? (
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleStatusChange(slot.id, "booked")}>
                          <Check className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleStatusChange(slot.id, "available")}>
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <span className="sr-only">Open menu</span>
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                            >
                              <path
                                d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(slot.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
