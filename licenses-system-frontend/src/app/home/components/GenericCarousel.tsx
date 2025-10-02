'use client'
import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import ProductCard from './ProductCard'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useState } from 'react'
export default function GenericCarousel({
  items,
  index,
  setIndex,
}: {
  items: any[]
  index: number
  setIndex: (value: number) => void
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [isLoop, setIsLoop] = useState(true)
  useEffect(() => {
    if (!api) {
      return
    }
    if (index != current) {
      setCurrent(index)
      api.scrollTo(index)
      setIsLoop(false)
    } else {
    }
  }, [api, index])
  return (
    <Carousel
      className="max-w-full lg:max-w-3/5"
      opts={{ loop: true }}
      setApi={setApi}
      plugins={[
        Autoplay({
          delay: isLoop ? 3000 : 30000,
        }),
      ]}
    >
      <CarouselContent className="">
        {items.map((item) => (
          <CarouselItem key={item.id} className=" flex justify-center">
            <ProductCard currentProduct={item} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious
        onClick={() => setIndex(current == 0 ? 4 : current - 1)}
        className="max-[1550px]:hidden bg-primary text-white size-14 cursor-pointer hover:bg-primary/40"
      />
      <CarouselNext
        onClick={() => setIndex(current == 4 ? 0 : current + 1)}
        className="max-[1550px]:hidden bg-primary text-white size-14 cursor-pointer hover:bg-primary/40 "
      />
    </Carousel>
  )
}
