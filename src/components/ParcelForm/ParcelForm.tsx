'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  parcelFormSchema,
  TParcelFormSchema,
} from '@/src/schemas/client/parcelFormSchema'
import {
  TCreateShipmentRequest,
  TCreateShipmentResponse,
} from '@/src/schemas/server/createShipmentSchema'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import { useSetAtom, useAtomValue } from 'jotai'
import { stepAtom } from '@/src/atoms/step'
import { labelUrlAtom } from '@/src/atoms/label'
import { fromAddressIdAtom, toAddressIdAtom } from '@/src/atoms/address'
import toast from 'react-hot-toast'

export function ParcelForm() {
  const setActiveStep = useSetAtom(stepAtom)
  const setLabelUrl = useSetAtom(labelUrlAtom)
  const fromAddressId = useAtomValue(fromAddressIdAtom)
  const toAddressId = useAtomValue(toAddressIdAtom)

  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(parcelFormSchema),
    defaultValues: {
      weight: 0,
      length: undefined,
      width: undefined,
      height: undefined,
    },
  })

  const onSubmit = async (data: TParcelFormSchema) => {
    if (!fromAddressId || !toAddressId) {
      toast.error('Address IDs are missing')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/shipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromAddressId,
          toAddressId,
          parcel: data,
        } as TCreateShipmentRequest),
      })

      const result: TCreateShipmentResponse = await response.json()
      if (!result.success) {
        toast.error('Error creating shipment: ' + result.error)
        setIsLoading(false)
        return
      }

      toast.success('Shipment created and bought!')
      setLabelUrl(result.labelUrl)
      setActiveStep(2)
      setIsLoading(false)
    } catch (error) {
      console.error('Unexpected error:', error)
      toast.error('Unexpected error occurred')
      setIsLoading(false)
    }
  }

  return (
    <Paper sx={{ p: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="weight"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Weight (oz)"
                type="number"
                error={!!errors.weight}
                helperText={errors.weight?.message}
                fullWidth
                disabled={isLoading}
              />
            )}
          />

          <Controller
            name="length"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Length (in)"
                type="number"
                error={!!errors.length}
                helperText={errors.length?.message}
                fullWidth
                disabled={isLoading}
              />
            )}
          />

          <Controller
            name="width"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Width (in)"
                type="number"
                error={!!errors.width}
                helperText={errors.width?.message}
                fullWidth
                disabled={isLoading}
              />
            )}
          />

          <Controller
            name="height"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Height (in)"
                type="number"
                error={!!errors.height}
                helperText={errors.height?.message}
                fullWidth
                disabled={isLoading}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            loading={isLoading}
            fullWidth>
            Create & Buy Shipment
          </Button>
        </Stack>
      </form>
    </Paper>
  )
}
