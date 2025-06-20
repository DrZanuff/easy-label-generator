import { z } from 'zod'

const addressApiSchema = z.object({
  street1: z.string().min(1, 'Street 1 is required'),
  street2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'ZIP is required'),
  country: z.string().min(1, 'Country is required'),
  name: z.string().optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Invalid email').optional(),
  residential: z.boolean().optional(),
})

export const shippingAddressApiSchema = z.object({
  from: addressApiSchema,
  to: addressApiSchema,
})

export type TShippingAdressApiSchema = z.infer<typeof shippingAddressApiSchema>
