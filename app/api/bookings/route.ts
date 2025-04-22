import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // In a real app, you would fetch bookings from your database
  // For demo purposes, we'll return mock data
  const bookings = [
    {
      id: "1",
      timeSlotId: "2",
      clientName: "Jane Doe",
      clientEmail: "jane@example.com",
      clientPhone: "+1234567890",
      service: "Hair Styling",
      status: "confirmed",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      timeSlotId: "4",
      clientName: "John Smith",
      clientEmail: "john@example.com",
      clientPhone: "+0987654321",
      service: "Makeup",
      status: "pending",
      createdAt: new Date().toISOString(),
    },
    // More bookings...
  ]

  return NextResponse.json({ bookings })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // In a real app, you would validate and save the booking to your database
    // For demo purposes, we'll just return a success response with the data

    return NextResponse.json(
      {
        success: true,
        message: "Booking created successfully",
        booking: { id: "new-id", ...data, status: "pending", createdAt: new Date().toISOString() },
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create booking" }, { status: 500 })
  }
}
