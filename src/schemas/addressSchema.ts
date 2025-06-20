import * as yup from 'yup'
import { AddressFormValues } from '@/src/types/address'

export const getDefaultAddressFormValues = (): AddressFormValues => ({
  street1: '',
  street2: '',
  city: '',
  state: '',
  zip: '',
  country: 'US',
  name: '',
  company: '',
  phone: '',
  email: '',
  residential: false,
})

export const addressSchema: yup.Schema<AddressFormValues> = yup.object({
  street1: yup.string().required('Street 1 is required'),
  street2: yup.string().optional(),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zip: yup.string().required('Zip code is required'),
  country: yup.string().required('Country is required'),
  name: yup.string().optional(),
  company: yup.string().optional(),
  phone: yup.string().optional(),
  email: yup.string().optional(),
  residential: yup.boolean().optional(),
})

export const shippingSchema = yup.object({
  from: addressSchema.required(),
  to: addressSchema.required(),
})

export type ShippingSchemaType = yup.InferType<typeof shippingSchema>
