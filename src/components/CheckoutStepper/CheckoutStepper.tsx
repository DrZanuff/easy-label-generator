'use client'

import { useAtom } from 'jotai'
import { stepAtom } from '@/src/atoms/step'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Box from '@mui/material/Box'

const steps = ['Address', 'Parcel', 'Review']

export function CheckoutStepper() {
  const [activeStep] = useAtom(stepAtom)

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
