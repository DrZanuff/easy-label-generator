/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from 'next/server'
import { easypostClient } from '@/src/lib/easypost'
import { shippingAddressApiSchema } from '@/src/schemas/server/shippingAddressSchema'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const parsed = shippingAddressApiSchema.safeParse(body)

    if (!parsed.success) {
      return Response.json(
        {
          success: false,
          error: 'Invalid payload',
          details: parsed.error.flatten(),
        },
        { status: 400 }
      )
    }

    const { from, to } = parsed.data

    const fromAddress = await easypostClient.Address.create({
      ...from,
      verify: true,
    })

    if (!fromAddress.verifications?.delivery?.success) {
      return Response.json(
        {
          success: false,
          error: 'Invalid From Address',
          details: fromAddress.verifications?.delivery?.errors,
        },
        { status: 400 }
      )
    }

    const toAddress = await easypostClient.Address.create({
      ...to,
      verify: true,
    })

    if (!toAddress.verifications?.delivery?.success) {
      return Response.json(
        {
          success: false,
          error: 'Invalid To Address',
          details: toAddress.verifications?.delivery?.errors,
        },
        { status: 400 }
      )
    }

    return Response.json({
      success: true,
      fromAddress,
      toAddress,
    })
  } catch (error: any) {
    console.error('API error:', error)
    return Response.json(
      {
        success: false,
        error: 'Internal server error',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
