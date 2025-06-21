'use client'
import Image from 'next/image'
import { useState } from 'react'
import Skeleton from '@mui/material/Skeleton'

type ImageWithSkeletonProps = {
  imageProps: React.ComponentProps<typeof Image>
  skeletonProps?: React.ComponentProps<typeof Skeleton>
}

export function ImageWithSkeleton({
  imageProps,
  skeletonProps,
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          {...skeletonProps}
        />
      )}
      <Image
        {...imageProps}
        onLoad={() => setIsLoading(false)}
        style={{
          display: isLoading ? 'none' : 'block',
          width: '100%',
          height: 'auto',
          ...imageProps.style,
        }}
        width={imageProps.width}
        height={imageProps.height}
        src={imageProps.src}
        alt={imageProps.alt}
      />
    </>
  )
}
