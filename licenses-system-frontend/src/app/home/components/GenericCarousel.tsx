import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Image from 'next/image'

interface GenericCarouselItem {
  image?: string
}
export default function GenericCarousel({
  items,
}: {
  items: GenericCarouselItem[]
}) {
  return (
    <Carousel className="py-10" opts={{ dragFree: true }}>
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem className="">
            <Card className="bg-transparent p-0 w-3/4">
              {item.image && (
                <Image
                  alt="img"
                  src={item.image}
                  width={800}
                  height={800}
                  className="rounded-xl"
                />
              )}
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
