import { AddressFormValues } from '@/src/types/address'

export const normalizeAddress = (
  address: Partial<AddressFormValues>
): Partial<AddressFormValues> => {
  const cleaned: Partial<AddressFormValues> = { ...address }
  Object.keys(cleaned).forEach((key) => {
    const value = cleaned[key as keyof AddressFormValues]
    if (typeof value === 'string' && value.trim() === '') {
      cleaned[key as keyof AddressFormValues] = undefined
    }
  })
  return cleaned
}
