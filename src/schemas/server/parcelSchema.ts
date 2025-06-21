import { z } from 'zod'

export const parcelApiSchema = z.object({
  weight: z
    .number({ invalid_type_error: 'Weight must be a number' })
    .positive('Weight must be greater than zero'),
  length: z
    .number({ invalid_type_error: 'Length must be a number' })
    .positive('Length must be greater than zero')
    .optional(),
  width: z
    .number({ invalid_type_error: 'Width must be a number' })
    .positive('Width must be greater than zero')
    .optional(),
  height: z
    .number({ invalid_type_error: 'Height must be a number' })
    .positive('Height must be greater than zero')
    .optional(),
})

export type TParcelApiSchema = z.infer<typeof parcelApiSchema>
