'use server'

import { Expert } from '@/entities/expert.entity'
import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server' // Assuming Next.js, adjust imports as needed

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedParams = params // Await the promise
  const { id } = await resolvedParams
  const body = await request.json()
  try {
    // Fetch the binary data from another endpoint (or database, etc.)
    const fileBuffer = await api.get(`/copies/download/manual/${id}`, {
      responseType: 'arraybuffer', // Get the file as binary data
    })

    // Prepare the headers for the response
    const headers = new Headers()
    headers.append('Content-Disposition', `attachment; filename="${body.name}"`)
    headers.append('Content-Type', 'application/octet-stream')

    // Send the binary file back as a response
    return new NextResponse(fileBuffer.data, { headers })
  } catch (error) {
    console.error('Error fetching the file:', error)
    return new NextResponse('Error downloading the file', { status: 500 })
  }
}
