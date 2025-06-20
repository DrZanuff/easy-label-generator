import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'GET route working!' })
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  return NextResponse.json({ message: 'POST route received!', received: data })
}
