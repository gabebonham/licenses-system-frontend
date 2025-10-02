'use client'
import CustomButton from '@/components/shared/buttons/CustomButton'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import InfoModalButton from '../products/components/InfoModalButton'
import { Button } from '@/components/ui/button'

export default function ProductCard({
  currentProduct,
}: {
  currentProduct: any
}) {
  const performanceReport = {
    trades: 1241,

    winTrades: 1241,

    lossTrades: 1241,
    bestTrade: 1241,
    worstTrade: 1241,
    profitFactor: 1241,
    payoff: 1241,
    drawDown: 1241,
  }
  return (
    <div className="lg:pb-2  lg:gap-x-14 lg:justify-center lg:items-center lg:flex-row flex flex-col w/lg:-5/6 place-items-center gap-y-12">
      <div className=" h-full  flex justify-center py-8">
        <Card
          className="size-70 lg:size-94  "
          style={{
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url("${currentProduct.img}")`,
          }}
        ></Card>
      </div>
      <div className="px-4 w-full h-5/6 space-y-2">
        <div>
          <div className="flex w-full items-center justify-between">
            <h1 className="text-4xl font-bold">{currentProduct.name}</h1>
            <div>R$ {currentProduct.price.toString()}</div>
          </div>

          <p
            className="text-xl font-bold py-8 w-96 break-all
  "
          >
            {currentProduct.description}
          </p>
        </div>
        <div className="pr-4">
          <h2 className="font-bold">Bagulhos</h2>
          <div className="grid grid-cols-2">
            {currentProduct.bagulhos.map((b: string) => (
              <p key={b}>{b}</p>
            ))}
          </div>
        </div>
        <div className="py-16">
          {/* <InfoModalButton
            btn={<Button></Button>}
            performanceReport={performanceReport}
            product={}
          /> */}
        </div>
      </div>
    </div>
  )
}
