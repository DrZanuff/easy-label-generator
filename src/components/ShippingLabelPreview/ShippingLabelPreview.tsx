'use client'

import { useAtomValue } from 'jotai'
import { labelUrlAtom } from '@/src/atoms/label'
import { Button, Stack, Typography } from '@mui/material'
import { generatePrintWindowHTML } from '@/src/helpers/generatePrintWindowHTML'
import { ImageWithSkeleton } from '@/src/components/ImageWithSkeletonProps'
import DownloadIcon from '@mui/icons-material/Download'
import PrintIcon from '@mui/icons-material/Print'
import ReloadIcon from '@mui/icons-material/RestartAlt'

export function ShippingLabelPreview() {
  const labelUrl = useAtomValue(labelUrlAtom)

  const handleDownload = () => {
    if (!labelUrl) return
    window.open(labelUrl, '_blank', 'noopener,noreferrer')
  }

  const handlePrint = () => {
    if (!labelUrl) return

    const printWindow = window.open('', '_blank', 'width=800,height=600')

    if (printWindow && printWindow.document) {
      printWindow.document.body.innerHTML = generatePrintWindowHTML(labelUrl)
    }
  }

  const handleNewLabel = () => {
    window.location.reload()
  }

  if (!labelUrl) {
    return <Typography>No label to display.</Typography>
  }

  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h6">Shipping Label</Typography>

      <Stack width={300} height="auto" position="relative">
        <ImageWithSkeleton
          imageProps={{
            alt: 'Shipping label preview',
            width: 300,
            height: 400,
            priority: true,
            src: labelUrl,
          }}
          skeletonProps={{
            sx: { aspectRatio: '2 / 3', borderRadius: 2 },
          }}
        />
      </Stack>

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={handleDownload}
          startIcon={<DownloadIcon />}>
          Download
        </Button>
        <Button
          variant="contained"
          onClick={handlePrint}
          startIcon={<PrintIcon />}>
          Print
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleNewLabel}
          startIcon={<ReloadIcon />}>
          Create New Label
        </Button>
      </Stack>
    </Stack>
  )
}
