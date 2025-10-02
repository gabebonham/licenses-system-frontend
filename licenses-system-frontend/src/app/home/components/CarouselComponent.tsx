'use client'

import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'

export default function CarouselComponent() {
  const items = [
    {
      image:
        'https://images.contentstack.io/v3/assets/blt8ec5b78e9ea1d11d/blt9b4eb37eaccc01a9/6323eead9a6b39638424b3f6/TradingBot2_1600x900_WEBP.webp',
    },
    {
      image:
        'https://images.contentstack.io/v3/assets/blt8ec5b78e9ea1d11d/blt9b4eb37eaccc01a9/6323eead9a6b39638424b3f6/TradingBot2_1600x900_WEBP.webp',
    },
    {
      image:
        'https://images.contentstack.io/v3/assets/blt8ec5b78e9ea1d11d/blt9b4eb37eaccc01a9/6323eead9a6b39638424b3f6/TradingBot2_1600x900_WEBP.webp',
    },
    {
      image:
        'https://images.contentstack.io/v3/assets/blt8ec5b78e9ea1d11d/blt9b4eb37eaccc01a9/6323eead9a6b39638424b3f6/TradingBot2_1600x900_WEBP.webp',
    },
    {
      image:
        'https://images.contentstack.io/v3/assets/blt8ec5b78e9ea1d11d/blt9b4eb37eaccc01a9/6323eead9a6b39638424b3f6/TradingBot2_1600x900_WEBP.webp',
    },
  ]
  return (
    <Carousel className="w-full  max-w-4/5">
      <CarouselContent className="w-full max-w-full">
        {items.map((currentProduct) => (
          <CarouselItem
            key={currentProduct.image}
            className="w-full flex justify-center"
          >
            <Image width={800} height={800} alt="" src={currentProduct.image} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
