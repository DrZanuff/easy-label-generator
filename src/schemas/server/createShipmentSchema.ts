import { z } from 'zod'
import { parcelApiSchema } from '@/src/schemas/server/parcelSchema'

export const createShipmentSchema = z.object({
  fromAddressId: z.string().min(1, 'fromAddressId is required'),
  toAddressId: z.string().min(1, 'toAddressId is required'),
  parcel: parcelApiSchema,
})

export type TCreateShipmentRequest = z.infer<typeof createShipmentSchema>

export type TCreateShipmentResponse =
  | { success: true; labelUrl: string }
  | { success: false; error: string; details?: unknown }
