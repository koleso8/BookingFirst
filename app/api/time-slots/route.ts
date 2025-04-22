import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // In a real app, you would fetch time slots from your database
  // For demo purposes, we'll return mock data
  const timeSlots = [
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
    // More time slots...
  ]

  return NextResponse.json({ timeSlots })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // In a real app, you would validate and save the time slot to your database
    // For demo purposes, we'll just return a success response with the data

    return NextResponse.json(
      {
        success: true,
        message: "Time slot created successfully",
        timeSlot: { id: "new-id", ...data },
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create time slot" }, { status: 500 })
  }
}
