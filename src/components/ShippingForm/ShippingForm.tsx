'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  shippingSchema,
  ShippingSchemaType,
  getDefaultAddressFormValues,
} from '@/src/schemas/addressSchema'
import { AddressFormSection } from '@/src/components/AddressFormSection'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

export function ShippingForm() {
  const methods = useForm({
    resolver: yupResolver(shippingSchema),
    defaultValues: {
      from: getDefaultAddressFormValues(),
      to: getDefaultAddressFormValues(),
    },
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = (data: ShippingSchemaType) => {
    console.log('Validated Shipping Data:', data)
  }

  return (
    <Paper>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack flexDirection="row" gap={2} padding={2}>
            <AddressFormSection
              control={control as any}
              errors={errors.to || {}}
              sectionTitle="To Address"
              prefix="to"
            />
            <AddressFormSection
              control={control as any}
              errors={errors.from || {}}
              sectionTitle="From Address"
              prefix="from"
            />
          </Stack>
          <Button type="submit" variant="contained">
            Validate Addresses
          </Button>
        </form>
      </FormProvider>
    </Paper>
  )
}
