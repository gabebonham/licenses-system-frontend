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
  trades,
  performancesCopy,
}: {
  copies: any[]
  userId: string
  trades: any[]
  performancesCopy: any
}) {
  return (
    <Carousel>
      <CarouselContent>
        {copies.map((copy) => (
          <CarouselItem key={copy.id} className="basis-5/6">
            <CopyCard
              trades={trades}
              manualLink={copy.manualLink}
              openAccountLink={copy.openAccountLink}
              broker={copy.broker}
              minimumCapital={copy.minimumCapital}
              type={copy.type}
              imageUrl={copy.imageUrl}
              link={copy.link}
              ratings={copy.ratings}
              key={copy.id}
              id={copy.id}
              userId={userId}
              caracteristics={copy.caracteristics}
              title={copy.title}
              description={copy.description}
              performance={copy.performance}
              performancesCopy={performancesCopy}
              magicNumber={copy.magicNumber}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
