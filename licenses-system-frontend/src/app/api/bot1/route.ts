'use server'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

async function getRawBody(request: Request): Promise<Buffer> {
  // Read the request body as a Buffer
  const buf = await request.arrayBuffer()
  return Buffer.from(buf)
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await getRawBody(req)
    const signature = req.headers.get('x-lastlink-token') // whatever header your service uses

    if (!signature) {
      console.warn('Missing signature header')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify signature: for example, if it’s an HMAC-based signature
    const secret = process.env.WEBHOOK_SECRET!
    const signatureBuffer = Buffer.from(signature, 'hex')
    const computedBuffer = Buffer.from(secret, 'hex')

    if (
      signatureBuffer.length !== computedBuffer.length ||
      !crypto.timingSafeEqual(signatureBuffer, computedBuffer)
    ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // If signature is good, parse JSON payload
    const text = rawBody.toString('utf8')
    const payload = JSON.parse(text)

    // Now handle different event types
    const { eventType, data } = payload // assume your payload includes eventType

    switch (eventType) {
      case 'product.created':
        // handle product creation
        console.log('Product created:', data)
        break
      case 'product.updated':
        console.log('Product updated:', data)
        break
      case 'product.deleted':
        console.log('Product deleted:', data)
        break
      default:
        console.log('Unknown event', eventType, data)
        break
    }

    // Return a 200 OK so that the sender knows you got it
    return NextResponse.json({ status: 'success' })
  } catch (err: any) {
    console.error('Webhook processing error:', err.message || err)
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
  }
}
