'use client'

import { Control, Controller, FieldErrors } from 'react-hook-form'
import { ShippingFormValues, AddressFormValues } from '@/src/types/address'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'

type Props = {
  control: Control<ShippingFormValues>
  errors: FieldErrors<AddressFormValues>
  sectionTitle?: string
  prefix: 'from' | 'to'
}

const placeholders: Record<'from' | 'to', Partial<AddressFormValues>> = {
  from: {
    street1: '417 Montgomery St',
    street2: 'Floor 5',
    city: 'San Francisco',
    state: 'CA',
    zip: '94104',
    country: 'US',
  },
  to: {
    street1: '179 N Harbor Dr',
    street2: '',
    city: 'Redondo Beach',
    state: 'CA',
    zip: '90277',
    country: 'US',
  },
}

export function AddressFormSection({
  control,
  errors,
  sectionTitle,
  prefix,
}: Props) {
  const fieldError = (field: keyof AddressFormValues) =>
    errors?.[field]?.message as string | undefined

  const placeholder = placeholders[prefix]

  return (
    <div>
      {sectionTitle && <h3>{sectionTitle}</h3>}

      <Controller
        name={`${prefix}.street1`}
        control={control}
        render={({ field }) => (
          <TextField
            label="Street 1"
            placeholder={placeholder.street1}
            {...field}
            error={!!fieldError('street1')}
            helperText={fieldError('street1')}
            fullWidth
            margin="normal"
          />
        )}
      />

      <Controller
        name={`${prefix}.street2`}
        control={control}
        render={({ field }) => (
          <TextField
            label="Street 2"
            placeholder={placeholder.street2}
            {...field}
            error={!!fieldError('street2')}
            helperText={fieldError('street2')}
            fullWidth
            margin="normal"
          />
        )}
      />

      <Stack flexDirection="row" gap={2}>
        <Controller
          name={`${prefix}.city`}
          control={control}
          render={({ field }) => (
            <TextField
              label="City"
              placeholder={placeholder.city}
              {...field}
              error={!!fieldError('city')}
              helperText={fieldError('city')}
              fullWidth
              margin="normal"
            />
          )}
        />

        <Controller
          name={`${prefix}.state`}
          control={control}
          render={({ field }) => (
            <TextField
              label="State"
              placeholder={placeholder.state}
              {...field}
              error={!!fieldError('state')}
              helperText={fieldError('state')}
              fullWidth
              margin="normal"
            />
          )}
        />

        <Controller
          name={`${prefix}.country`}
          control={control}
          render={({ field }) => (
            <TextField
              label="Country"
              placeholder={placeholder.country}
              {...field}
              error={!!fieldError('country')}
              helperText={fieldError('country')}
              fullWidth
              margin="normal"
            />
          )}
        />
      </Stack>

      <Stack flexDirection="row" gap={2}>
        <Controller
          name={`${prefix}.zip`}
          control={control}
          render={({ field }) => (
            <TextField
              label="ZIP"
              placeholder={placeholder.zip}
              {...field}
              error={!!fieldError('zip')}
              helperText={fieldError('zip')}
              fullWidth
              margin="normal"
            />
          )}
        />

        <Controller
          name={`${prefix}.residential`}
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value || false} />}
              label="Residential"
            />
          )}
        />
      </Stack>
    </div>
  )
}
