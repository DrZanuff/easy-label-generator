'use client'
import { ShippingForm } from '@/src/components/ShippingForm'
import { CheckoutStepper } from '@/src/components/CheckoutStepper'
// import { ParcelForm } from '@/src/components/ParcelForm' // futuro
import { useAtomValue } from 'jotai'
import { stepAtom } from '@/src/atoms/stepAtom'
import { Toaster } from 'react-hot-toast'

export function Main() {
  const step = useAtomValue(stepAtom)

  return (
    <>
      <CheckoutStepper />
      {step === 0 && <ShippingForm />}
      {step === 1 && <>ParcelForm</>}
      <Toaster />
    </>
  )
}
