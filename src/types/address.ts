export type AddressFormValues = {
  street1: string
  street2?: string
  city: string
  state: string
  zip: string
  country: string
  name?: string
  company?: string
  phone?: string
  email?: string
  residential?: boolean
}

export type ShippingFormValues = {
  from: AddressFormValues
  to: AddressFormValues
}
