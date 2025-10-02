'use client'

import CustomButton from '@/components/shared/buttons/CustomButton'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Image from 'next/image'
import grapMock from '@/../public/images/mockGraph.png'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import React, { useState } from 'react'
import ProductCarousel from '../../components/ProductCarousel'
import { Product } from '@/entities/product.entity'
import { previousDay } from 'date-fns'
import { useRouter } from 'next/navigation'
import GraphComponent from '@/components/shared/GraphComponent'
import { Expert } from '@/entities/expert.entity'

export default function InfoModalButton({
  performanceReport,
  trades,
  btn,
  expert,
}: {
  trades: any[]
  performanceReport: any
  btn: any
  expert: Expert | undefined
}) {
  const [targetButton, setTargetButton] = useState<undefined | number>()
  const [targetTimeButton, setTargetTimeButton] = useState<undefined | number>()
  const [link, setLink] = useState<string | undefined>()
  return (
    <Dialog>
      <DialogTrigger className="w-full">{btn}</DialogTrigger>
      <DialogContent className=" h-9/12  min-w-11/12 w-full p-2 lg:p-6 z-90   ">
        <ScrollArea className="lg:flex-row  min-h-8/12 h-full  w-full flex flex-col items-center">
          <div className="text-blueLight  lg:flex-row h-full   lg:max-w-full w-full flex flex-col items-center lg:items-start gap-y-3">
            <GraphComponent
              trades={trades.filter(
                (trade: any) => trade.magic == expert?.magicNumber,
              )}
            />
            <div className=" lg:px-6 flex items-center h-full  flex-col gap-y-2 py-3 lg:gap-y-2 lg:w-full   ">
              <div className="lg:px-0 text-xs lg:text-lg w-full max-w-96 lg:max-w-full bg-primary/10 rounded-2xl lg:p-6 p-2 pb-0 lg:pb-0  flex flex-col ">
                <div className="flex  justify-between w-full gap-x-8">
                  <div className="flex flex-col gap-y-4 xl:gap-y-12 w-full  ">
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Negociações:</span>
                      <span>{performanceReport?.trades ?? 0}</span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Negociações com lucro:</span>
                      <span> {performanceReport?.winTrades ?? 0}</span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Negociações com perda:</span>
                      <span> {performanceReport?.lossTrades ?? 0}</span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Melhor negociação:</span>
                      <span> {performanceReport?.bestTrade ?? 0}</span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-4 xl:gap-y-12 w-full items-between">
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Fator de lucro:</span>
                      <span> {performanceReport?.profitFactor ?? 0}</span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Lucro médio:</span>
                      <span> {performanceReport?.payoff ?? 0}</span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Drawdown:</span>
                      <span> {performanceReport?.drawDown ?? 0}</span>
                    </p>
                    <p className="w-full flex justify-between">
                      <span className="font-bold"> Pior negociação:</span>
                      <span> {performanceReport?.worstTrade ?? 0}</span>
                    </p>
                  </div>
                </div>
                <div className="w-full  ">
                  {expert && (
                    <ProductCarousel
                      link={link}
                      products={expert.products ?? []}
                      setLink={setLink}
                      setTargetButton={setTargetButton}
                      targetButton={targetButton}
                      setTargetTimeButton={setTargetTimeButton}
                      targetTimeButton={targetTimeButton}
                    />
                  )}
                </div>
              </div>
              <CustomButton
                label="Comprar"
                inactive={link != undefined}
                css="lg:text-2xl lg:py-8 rounded-2xl"
                color="Action"
                href={link}
              />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
