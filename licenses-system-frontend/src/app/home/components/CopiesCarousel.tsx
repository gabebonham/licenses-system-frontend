'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import React from 'react'
import CopyCard from './CopyCard'

export default function CopiesCarousel({
  copies,
  userId,
}: {
  copies: any[]
  userId: string
}) {
  return (
    <Carousel>
      <CarouselContent>
        {copies.map((copy) => (
          <CarouselItem key={copy.id} className="basis-5/6">
            <CopyCard
              link={copy.link}
              ratings={copy.ratings}
              id={copy.id}
              userId={userId}
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
