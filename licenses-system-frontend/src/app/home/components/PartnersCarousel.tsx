'use client'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import AutoScroll from 'embla-carousel-auto-scroll'
import Link from 'next/link'
export default function PartnersCarousel({ items }: { items: any[] }) {
  // const items = [
  //   { image: xc },
  //   { image: xp },
  //   { image: clear },
  //   { image: genial },
  //   // { image: xc },
  //   // { image: xp },
  //   // { image: clear },
  // ]

  return (
    <Carousel
      className="w-full scroll-smooth py-8 bg-gray-300/70  "
      opts={{
        align: 'center',
        loop: true,
      }}
      plugins={[
        AutoScroll({
          speed: 2,
          stopOnFocusIn: false,
          stopOnInteraction: false,
          stopOnMouseEnter: false,
        }),
      ]}
    >
      <CarouselContent className=" scroll-smooth ">
        {items.map((currentProduct) => (
          <CarouselItem key={currentProduct.name} className=" basis-1/3">
            <Link href={currentProduct.link}>
              <Image
                alt=""
                src={`${
                  process.env.NEXT_PUBLIC_BACKEND_URL + currentProduct.imgUrl
                }`}
                width={800}
                height={800}
                className="w-54"
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
