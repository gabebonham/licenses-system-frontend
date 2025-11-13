'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import React from 'react'
import RatingCard from './RatingCard'

export default function RatingsCarousel({ ratings }: { ratings: any[] }) {
  return (
    <Carousel>
      <CarouselContent>
        {ratings.map((rating) => (
          <CarouselItem key={rating.id} className="basis-5/6">
            <RatingCard
              description={rating.description}
              copy={rating.copy}
              rating={rating.value}
              userName={rating.user.name}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
