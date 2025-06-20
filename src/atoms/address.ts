import { atom } from 'jotai'
import { AddressFormValues } from '@/src/types/address'

export const toAddressAtom = atom<AddressFormValues | null>(null)
export const fromAddressAtom = atom<AddressFormValues | null>(null)
