'use client'

import React, { useState } from 'react'
import GraphComponent from '@/components/shared/GraphComponent'
import { Expert } from '@/entities/expert.entity'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Checkbox } from '@/components/ui/checkbox'
import Autoplay from 'embla-carousel-autoplay'

export default function GraphsCarousel({
  trades,
  experts,
  setCurrentExpertId,
  currentExpertId,
}: {
  trades: any[]
  experts: Expert[]
  currentExpertId: string
  setCurrentExpertId: (value: string) => void
}) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  )
  const handleScroll = (target: string, exp: string) => {
    setCurrentExpertId(exp)
    const section = document.getElementById(target)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }
  React.useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
    setCurrentExpertId(experts[count].id)
  }, [api])
  return (
    <div className="xl:relative    max-w-sm w-full xl:w-full xl:max-w-full  w-full  flex flex-col items-center">
      <Carousel
        plugins={[plugin.current]}
        setApi={setApi}
        className=" w-full xlpx-4 xl:max-w-full"
      >
        <CarouselContent className="w-full ">
          {experts.map((expert, index) => (
            <CarouselItem
              onClick={() => handleScroll('productsSection', expert.id)}
              key={index}
              className="w-full  cursor-pointer h-fit  "
            >
              <GraphComponent
                name={expert.name}
                trades={trades.filter(
                  (trd) => trd.magic == expert?.magicNumber,
                )}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="xl:block hidden cursor-pointer hover:bg-transparent left-12 top-1/2 -translate-y-1/2 h-28 bg-transparent border-0 shadow-none" />

        <CarouselNext className="xl:block hidden cursor-pointer hover:bg-transparent right-8 top-1/2 -translate-y-1/2 h-28 bg-transparent border-0 shadow-none" />
      </Carousel>
      <div className=" items-center gap-x-4 lg:gap-x-8 flex justify-center py-5 lg:py-0 ">
        {experts.map((expert, index) => (
          <Checkbox
            key={index}
            className="w-8 xl:w-18 rounded-2xl border-blueDark h-2"
            checked={index + 1 == current}
          />
        ))}
      </div>
    </div>
  )
}
