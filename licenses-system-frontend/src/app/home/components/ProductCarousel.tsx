'use client'
import CustomButton from '@/components/shared/buttons/CustomButton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Product } from '@/entities/product.entity'
import { useEffect, useState } from 'react'

export default function ProductCarousel({
  setTargetButton,
  targetButton,
  setTargetTimeButton,
  targetTimeButton,
  products,
  setLink,
  link,
}: {
  setTargetButton: (value: number | undefined) => void
  targetButton: number | undefined
  setTargetTimeButton: (value: number | undefined) => void
  targetTimeButton: number | undefined
  products: Product[]
  setLink: (value: string) => void
  link: string | undefined
}) {
  const [api, setApi] = useState<CarouselApi>()
  useEffect(() => {
    if (!api) {
      return
    }
    if (targetButton) {
      api.scrollNext()
    }
  }, [targetButton, targetTimeButton, api])
  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>
          <div className="lg:gap-x-2 grid grid-cols-3 w-full h-fit gap-y-4 py-6 lg:py-8   ">
            {products && products.length > 0 ? (
              [...products].reverse().map((product) => (
                <Button
                  key={product.id}
                  onClick={() => setLink(product.checkoutLink)}
                  className={` p-1 lg:p-3 cursor-pointer hover:text-primary border-primary bg-primary/30 w-full h-full  hover:bg-white/20 text-primary border-2  ${
                    product.checkoutLink == link
                      ? ' text-black hover:text-black hover:bg-primary/30 border-gray-400 bg-white/20'
                      : ''
                  }`}
                >
                  <div className="text-blueLight w-full h-full flex flex-col items-start justify-between  xl:justify-start">
                    <div className="flex flex-col items-start">
                      <div className=" text-xs md:text-md  xl:text-lg">
                        {product.name}
                      </div>
                      <div className=" text-xs xl:text-2xl">
                        R$ {product.price}
                      </div>
                    </div>
                    <div className="w-full flex justify-end">
                      {/* <Badge className="text-xs xl:text-md rounded-2xl">
                        13%
                      </Badge> */}
                    </div>
                  </div>
                </Button>
              ))
            ) : (
              <p className="w-full text-red-400">
                Este Expert não está a venda...
              </p>
            )}
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
