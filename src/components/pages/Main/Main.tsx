'use client'

import { ShippingForm } from '@/src/components/ShippingForm'
import { CheckoutStepper } from '@/src/components/CheckoutStepper'
import { ParcelForm } from '@/src/components/ParcelForm'
import { ShippingLabelPreview } from '@/src/components/ShippingLabelPreview'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ShippingIcon from '@mui/icons-material/LocalShippingRounded'
import { useAtomValue } from 'jotai'
import { stepAtom } from '@/src/atoms/step'
import { Toaster } from 'react-hot-toast'
import Head from 'next/head'

export function Main() {
  const step = useAtomValue(stepAtom)

  return (
    <>
      <Head>
        <title>Easy Label Generator</title>
      </Head>

      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
        padding={2}>
        <Typography variant="h4" component="h1">
          Easy Label Generator
        </Typography>
        <ShippingIcon color="primary" fontSize="large" />
      </Stack>

      <Stack alignItems="center" width="100%" spacing={2} mt={4}>
        <Stack width={500}>
          <CheckoutStepper />
        </Stack>
      </Stack>

      {step === 0 && <ShippingForm />}
      {step === 1 && <ParcelForm />}
      {step === 2 && <ShippingLabelPreview />}

      <Toaster />
    </>
  )
}

// 'use client'
// import { ShippingForm } from '@/src/components/ShippingForm'
// import { CheckoutStepper } from '@/src/components/CheckoutStepper'
// import { ParcelForm } from '@/src/components/ParcelForm'
// import { ShippingLabelPreview } from '@/src/components/ShippingLabelPreview'
// import Stack from '@mui/material/Stack'
// import { useAtomValue } from 'jotai'
// import { stepAtom } from '@/src/atoms/step'
// import { Toaster } from 'react-hot-toast'

// export function Main() {
//   const step = useAtomValue(stepAtom)

//   return (
//     <>
//       <Stack alignItems="center" width="100%">
//         <Stack width={500}>
//           <CheckoutStepper />
//         </Stack>
//       </Stack>
//       {step === 0 && <ShippingForm />}
//       {step === 1 && <ParcelForm />}
//       {step === 2 && <ShippingLabelPreview />}
//       <Toaster />
//     </>
//   )
// }
