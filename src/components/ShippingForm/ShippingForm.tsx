'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  shippingAddressFormSchema,
  TShippingAddressFormType,
  getDefaultAddressFormValues,
} from '@/src/schemas/client/shippingAddressFormSchema'
import { AddressFormSection } from '@/src/components/AddressFormSection'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import toast from 'react-hot-toast'
import { ValidateAddressResponse } from '@/src/types/api'
import { normalizeAddress } from '@/src/helpers/normalizeAddress'
import { useSetAtom } from 'jotai'
import { fromAddressIdAtom, toAddressIdAtom } from '@/src/atoms/address'
import { stepAtom } from '@/src/atoms/step'

export function ShippingForm() {
  const methods = useForm({
    resolver: yupResolver(shippingAddressFormSchema),
    defaultValues: {
      from: getDefaultAddressFormValues(),
      to: getDefaultAddressFormValues(),
    },
  })

  const setFromAddressId = useSetAtom(fromAddressIdAtom)
  const setToAddressId = useSetAtom(toAddressIdAtom)
  const setStep = useSetAtom(stepAtom)

  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = async (data: TShippingAddressFormType) => {
    setIsLoading(true)

    try {
      const normalizedData = {
        from: normalizeAddress(data.from),
        to: normalizeAddress(data.to),
      }

      const response = await fetch('/api/address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(normalizedData),
      })

      const result: ValidateAddressResponse = await response.json()

      if (!result.success) {
        console.error(
          'Address validation failed:',
          result.error,
          result.details
        )
        toast.error(`Invalid Address: ${result.error}`)
        setIsLoading(false)
        return
      }

      const { success, fromAddress, toAddress } = result

      if (success) {
        setFromAddressId(fromAddress.id)
        setToAddressId(toAddress.id)
        toast.success('Addresses validated successfully!')
        setStep(1)
      }

      setIsLoading(false)
    } catch (error) {
      console.error('Unexpected error:', error)
      toast.error(`Unexpected error: ${error}`)
      setIsLoading(false)
    }
  }

  return (
    <Paper sx={{ p: 2 }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack flexDirection="row" gap={2} padding={2}>
            <AddressFormSection
              control={control as any}
              errors={errors.to || {}}
              sectionTitle="To Address"
              prefix="to"
              isLoading={isLoading}
            />
            <AddressFormSection
              control={control as any}
              errors={errors.from || {}}
              sectionTitle="From Address"
              prefix="from"
              isLoading={isLoading}
            />
          </Stack>
          <Button
            type="submit"
            variant="contained"
            loading={isLoading}
            fullWidth>
            Validate Addresses
          </Button>
        </form>
      </FormProvider>
    </Paper>
  )
}
