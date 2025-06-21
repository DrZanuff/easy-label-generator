/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from 'next/server'
import { easypostClient } from '@/src/lib/easypost'
import {
  TCreateShipmentResponse,
  createShipmentSchema,
} from '@/src/schemas/server/createShipmentSchema'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parseResult = createShipmentSchema.safeParse(body)

    if (!parseResult.success) {
      return Response.json({
        success: false,
        error: 'Invalid payload',
        details: parseResult.error.format(),
      } satisfies TCreateShipmentResponse)
    }

    const { fromAddressId, toAddressId, parcel } = parseResult.data

    // Cria o Shipment
    const shipment = await easypostClient.Shipment.create({
      to_address: { id: toAddressId },
      from_address: { id: fromAddressId },
      parcel,
    })

    // Compra o Shipment com a menor tarifa
    const boughtShipment = await easypostClient.Shipment.buy(
      shipment.id,
      shipment.lowestRate()
    )

    const labelUrl = boughtShipment.postage_label?.label_url

    if (!labelUrl) {
      return Response.json({
        success: false,
        error: 'No label URL returned from EasyPost',
      } satisfies TCreateShipmentResponse)
    }

    return Response.json({
      success: true,
      labelUrl,
    } satisfies TCreateShipmentResponse)
  } catch (error: any) {
    console.error('Shipment creation error:', error)
    return Response.json({
      success: false,
      error: 'Unexpected error',
      details: error?.message || error,
    } satisfies TCreateShipmentResponse)
  }
}
