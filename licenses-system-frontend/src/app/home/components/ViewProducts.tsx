'use client'
import { Dot, Lightbulb, Star } from 'lucide-react'
import ProductCard from './ProductCard'
import CustomButton from '@/components/shared/buttons/CustomButton'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { useState } from 'react'
import GenericCarousel from './GenericCarousel'
import { Badge } from '@/components/ui/badge'
import InfoModalButton from '../products/components/InfoModalButton'
import { Product } from '@/entities/product.entity'
import { Expert } from '@/entities/expert.entity'
export default function ViewProducts({
  experts,
  trades,
  performances,
}: {
  experts: Expert[]
  performances: any[]
  trades: any[]
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
  const handleGetPerformance = (expert: Expert) => {
    if (!performances || performances.length < 1) return
    return performances.find(
      (performance: any) => expert.magicNumber == performance.magicNumber,
    )
  }
  function orderByFirst<T extends { first: boolean }>(list: T[]): T[] {
    return [...list].sort((a, b) => {
      if (a.first === b.first) return 0 // keep relative order
      return a.first ? -1 : 1 // true goes before false
    })
  }
  const theseExperts = orderByFirst(experts)
  return (
    <section className="flex flex-col w-full bg-gradient-to-b from-/60 to-secondary/30 lg:pb-20 lg:px-24">
      <div className="lg:pb-12 py-6 lg:gap-x-12 lg:justify-center lg:items-start lg:flex-row flex flex-col w-full place-items-center gap-y-12">
        {experts.length >= 1 && (
          <Card className="px-6 hover:shadow-[0_0_25px_0_#a7e6ff] transition-all flex flex-col justify-between min-h-[504px] text-blueLight/80 bg-gradient-to-br from-secondary to-primary border-1 border-blueLight/30 lg:w-2/3">
            <div className="flex items-center w-full justify-between">
              <Lightbulb className="bg-primary p-3 rounded-xl box-content size-10" />
              <div className="w-fit">
                {theseExperts[0].imgUrl ? (
                  <Image
                    height={400}
                    width={400}
                    src={
                      process.env.NEXT_PUBLIC_BACKEND_URL +
                      theseExperts[0].imgUrl
                    }
                    alt="asdf"
                    className="size-28 rounded-2xl border-1 border-blueLight/30"
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-blueLight py-2">
                {theseExperts[0].name}
              </h1>{' '}
              {theseExperts[0].description}
            </div>
            <div className="w-full flex items-center justify-between text-blueLight">
              {/* Nível de Risco:
              <Badge className="rounded-2xl bg-transprent text-blueLight border-white/20">
                Baixo
              </Badge> */}
            </div>
            <div>
              <h1 className="font-bold text-blueLight pb-4">
                {' '}
                Características:
              </h1>
              <div className="space-y-2">
                {theseExperts[0].caracteristics.split(',').map((car) => (
                  <p className="flex items-center">
                    <Dot /> {car}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <InfoModalButton
                btn={
                  <CustomButton
                    color="Action"
                    label="Saiba Mais"
                    css="rounded-lg lg:text-xl lg:py-6"
                  />
                }
                trades={trades}
                performanceReport={handleGetPerformance(theseExperts[0])}
                expert={theseExperts[0]}
              />
            </div>
          </Card>
        )}
        {theseExperts.length >= 2 && (
          <Card className="hover:shadow-[0_0_25px_0_#a7e6ff] transition-all px-6 text-blueLight/80 bg-gradient-to-br min-h-[504px] from-secondary to-primary border-1 border-blueLight/30 lg:w-1/3">
            <div className="flex items-center w-full justify-between">
              <Lightbulb className="bg-primary p-3 rounded-xl box-content size-10" />
              <div className="w-fit">
                {theseExperts[1].imgUrl ? (
                  <Image
                    height={400}
                    width={400}
                    src={
                      process.env.NEXT_PUBLIC_BACKEND_URL +
                      theseExperts[1].imgUrl
                    }
                    alt="asdf"
                    className="size-28 rounded-2xl border-1 border-blueLight/30"
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-blueLight py-2">
                {theseExperts[1].name}
              </h1>{' '}
              {theseExperts[1].description}
            </div>
            <div className="w-full flex items-center justify-between text-blueLight">
              {/* Nível de Risco:
              <Badge className="rounded-2xl bg-transprent text-blueLight border-white/20">
                Baixo
              </Badge> */}
            </div>
            <div>
              <h1 className="font-bold text-blueLight pb-4">
                {' '}
                Características:
              </h1>
              <div className="space-y-2">
                {theseExperts[1].caracteristics.split(',').map((car) => (
                  <p className="flex items-center">
                    <Dot /> {car}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <InfoModalButton
                btn={
                  <CustomButton
                    color="Action"
                    label="Saiba Mais"
                    css="rounded-lg lg:text-xl lg:py-6"
                  />
                }
                performanceReport={handleGetPerformance(theseExperts[1])}
                trades={trades}
                expert={theseExperts[1]}
              />
            </div>
          </Card>
        )}
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 w-full">
        {theseExperts.length >= 3 &&
          theseExperts.slice(2, 4).map((currentExpert) => (
            <Card
              key={currentExpert.id}
              className=" hover:shadow-[0_0_25px_0_#a7e6ff] transition-all px-6 text-blueLight/80 bg-gradient-to-br min-h-[504px] from-secondary to-primary border-1 border-blueLight/30 "
            >
              <div className="flex items-center w-full justify-between">
                <Lightbulb className="bg-primary p-3 rounded-xl box-content size-10" />
                <div className="w-fit">
                  {currentExpert.imgUrl ? (
                    <Image
                      height={400}
                      width={400}
                      src={
                        process.env.NEXT_PUBLIC_BACKEND_URL +
                        currentExpert.imgUrl
                      }
                      alt="asdf"
                      className="size-20 rounded-2xl border-1 border-blueLight/30"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-blueLight py-2">
                  {currentExpert.name}
                </h1>{' '}
                {currentExpert.description}
              </div>
              <div className="w-full flex items-center justify-between text-blueLight">
                {/* Nível de Risco:
                <Badge className="rounded-2xl bg-transprent text-blueLight border-white/20">
                  Baixo
                </Badge> */}
              </div>
              <div>
                <h1 className="font-bold text-blueLight pb-4">
                  {' '}
                  Características:
                </h1>
                <div className="space-y-2">
                  {currentExpert.caracteristics.split(',').map((car) => (
                    <p key={car} className="flex items-center">
                      <Dot /> {car}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <InfoModalButton
                  btn={
                    <CustomButton
                      color="Action"
                      label="Saiba Mais"
                      css="rounded-lg lg:text-xl lg:py-6"
                    />
                  }
                  trades={trades}
                  performanceReport={handleGetPerformance(currentExpert)}
                  expert={currentExpert}
                />
              </div>
            </Card>
          ))}
      </div>
    </section>
  )
}
