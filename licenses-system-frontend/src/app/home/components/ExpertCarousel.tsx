'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import React from 'react'
import ExpertCard from './ExpertCard'

export default function ExpertCarousel({ copies }: { copies: any[] }) {
  return (
    <Carousel>
      <CarouselContent>
        {copies.map((copy) => (
          <CarouselItem>
            <ExpertCard
              key={copy.id}
              caracteristics={copy.caracteristics}
              name={copy.name}
              description={copy.description}
              price={copy.price}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
