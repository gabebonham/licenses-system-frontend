'use client'

import CustomButton from '@/components/shared/buttons/CustomButton'
import GraphComponent from '@/components/shared/GraphComponent'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Expert } from '@/entities/expert.entity'
import { CircleAlert, Dot, Info } from 'lucide-react'
import { useEffect, useState } from 'react'
import SelectExpertButton from './SelectExpertButton'
import { Separator } from '@radix-ui/react-menubar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
function ExpertDesktopPannel({
  expert,
  trades,
  performance,
}: {
  expert: Expert | undefined
  trades: any[]
  performance: any
}) {
  if (!expert) return 'Expert não selecionado.'
  return (
    <div className="space-y-8 ">
      <p className="text-justify text-2xl  ">{expert.description}</p>
      <div className="flex content-stretch h-full">
        <div className="h-full  w-2/3">
          <div className="flex text-2xl font-medium items-center justify-around py-8">
            <p className="w-1/3 flex items-center justify-between">
              <span>Capital Inicial:</span>
              <span>{(expert.initAmount as number).toFixed(2)}</span>
            </p>{' '}
            <p className="w-1/4 flex items-center justify-between">
              <span>Rentabilidade:</span>
              <span>
                {(
                  trades
                    .map((trd) => trd.profit)
                    .reduce((acc, curr) => acc + curr, 0) /
                  (expert.initAmount as number)
                ).toFixed(2)}
              </span>
            </p>
          </div>
          <GraphComponent
            name={expert.name}
            trades={trades.filter((trd) => trd.magic == expert?.magicNumber)}
          />
          <div className="w-full gap-2 text-grayDark space-x-4 space-y-2 justify-between  h-full  ">
            {expert.caracteristics.split(',').map((car) => (
              <Badge className="text-xl rounded-2xl px-4">{car}</Badge>
            ))}
          </div>
        </div>
        <div className="space-y-8 py-4 w-1/3     flex-col flex justify-center">
          {expert.products && expert.products.length ? (
            <div className="px-4 h-7/12 flex gap-y-12 flex-col justify-center text-black/50">
              {expert.products?.map((product) => (
                <Button className="hover:bg-blueDark hover:text-grayLight cursor-pointer rounded-lg grid grid-cols-2 w-full px-4 h-1/3 py-4 bg-grayLight place-content-between text-blueDark border-dark border-1">
                  <p className="text-xl font-medium text-start lg:text-2xl">
                    {product.name}
                  </p>
                  <p className="w-full"></p>
                  <p className="w-full"></p>
                  <p className="lg:text-2xl text-end">R${product.price},00</p>
                </Button>
              ))}
            </div>
          ) : (
            <div className="px-4  h-10/12 flex gap-y-12 flex-col justify-center text-black/50">
              <div className="border-dashed bg-grayDark/10 border-1 flex items-center gap-x-4 justify-center border-black/40 rounded-xl h-1/3 text-center text-2xl content-center">
                <CircleAlert />
                Produto Indisponível
              </div>
              <div className="border-dashed bg-grayDark/10 border-1 flex items-center gap-x-4 justify-center border-black/40 rounded-xl h-1/3 text-center text-2xl content-center">
                <CircleAlert />
                Produto Indisponível
              </div>
              <div className="border-dashed bg-grayDark/10 border-1 flex items-center gap-x-4 justify-center border-black/40 rounded-xl h-1/3 text-center text-2xl content-center">
                <CircleAlert />
                Produto Indisponível
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="min-h-52 h-52">
        <div className="flex font-medium text-2xl gap-x-4 items-stretch h-full ">
          <div className="w-full h-fit gap-y-6 grid grid-cols-4 gap-x-12">
            <p className="w-full flex items-center justify-between">
              <span>Negociações:</span>
              <span>{performance?.trades.toFixed(2)}</span>
            </p>
            <p className="w-full flex items-center justify-between">
              <span>Fator de lucro:</span>
              <span>{performance?.profitFactor.toFixed(2)}</span>
            </p>
            <p className="w-full flex items-center justify-between">
              <span>Negociações com lucro:</span>
              <span>{performance?.winningTrades.toFixed(2)}</span>
            </p>
            <p className="w-full flex items-center justify-between">
              <span>Negociações com perda:</span>
              <span>{performance?.losingTrades.toFixed(2)}</span>
            </p>
            <p className="w-full flex items-center justify-between">
              <span>Melhor negociação:</span>
              <span>{performance?.bestTrade.toFixed(2)}</span>
            </p>{' '}
            <p className="w-full flex items-center justify-between">
              <span>Pior negociação:</span>
              <span>{performance?.worstTrade.toFixed(2)}</span>
            </p>
            <p className="w-full flex items-center justify-between">
              <span>Lucro médio:</span>
              <span>{performance?.averageProfit.toFixed(2)}</span>
            </p>
            <p className="w-full flex items-center justify-between">
              <span>Drawdown:</span>
              <span>{performance?.drawdown.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
function ExpertInfoPannel({
  expert,
  performance,
  trades,
}: {
  expert: Expert
  performance: any
  trades: any[]
}) {
  return (
    <div>
      <div className="space-y-6 ">
        <div className="text-grayDark space-x-2 space-y-1">
          {expert.caracteristics.split(',').map((car) => (
            <Badge className=" rounded-2xl px-4">{car}</Badge>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-start">
          <p className="w-full  flex items-center justify-between">
            <span>Negociações:</span>
            <span>{performance?.trades.toFixed(2)}</span>
          </p>
          <p className="w-full flex items-center justify-between">
            <span>Fator de lucro:</span>
            <span>{performance?.profitFactor.toFixed(2)}</span>
          </p>
          <p className="w-full flex items-center justify-between">
            <span>Negociações com lucro:</span>
            <span>{performance?.winningTrades.toFixed(2)}</span>
          </p>
          <p className="w-full flex items-center justify-between">
            <span>Negociações com perda:</span>
            <span>{performance?.losingTrades.toFixed(2)}</span>
          </p>
          <p className="w-full flex items-center justify-between">
            <span>Melhor negociação:</span>
            <span>{performance?.bestTrade.toFixed(2)}</span>
          </p>{' '}
          <p className="w-full flex items-center justify-between">
            <span>Pior negociação:</span>
            <span>{performance?.worstTrade.toFixed(2)}</span>
          </p>
          <p className="w-full flex items-center justify-between">
            <span>Capital Inicial:</span>
            <span>{(expert.initAmount as number).toFixed(2)}</span>
          </p>{' '}
          <p className="w-full flex items-center justify-between">
            <span>Rentabilidade:</span>
            <span>
              {(
                trades
                  .map((trd) => trd.profit)
                  .reduce((acc, curr) => acc + curr, 0) /
                (expert.initAmount as number)
              ).toFixed(2)}
            </span>
          </p>
          <p className="w-full flex items-center justify-between">
            <span>Lucro médio:</span>
            <span>{performance?.averageProfit.toFixed(2)}</span>
          </p>
          <p className="w-full flex items-center justify-between">
            <span>Drawdown:</span>
            <span>{performance?.drawdown.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
function ExpertProductsPannel({ expert }: { expert: Expert }) {
  return (
    <div>
      <div className="space-y-4 py-4">
        {expert.products && expert.products.length ? (
          expert.products?.map((product) => (
            <Button className="hover:bg-blueDark hover:text-grayLight cursor-pointer rounded-lg grid grid-cols-2 w-full px-4 h-fit py-4 bg-grayLight place-content-between text-blueDark border-dark border-1">
              <p className="text-xl font-medium text-start lg:text-2xl">
                {product.name}
              </p>
              <p className="w-full"></p>
              <p className="w-full"></p>
              <p className="text-2xl text-end">R${product.price},00</p>
            </Button>
          ))
        ) : (
          <div className="px-4 flex-1 h-full flex gap-y-12 flex-col justify-center text-black/50">
            <div className="border-dashed bg-grayDark/10 py-18 border-1 flex items-center gap-x-4 justify-center border-black/40 rounded-xl h-full text-center text-xl content-center">
              <CircleAlert />
              Produto Indisponível
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
function ExpertGraph({ expert, trades }: { expert: Expert; trades: any[] }) {
  return (
    <div>
      <div className="py-6">
        <GraphComponent name={expert.name} trades={trades} />
      </div>
    </div>
  )
}

function ExpertMobilePannel({
  expert,
  trades,
  performance,
}: {
  expert: Expert | undefined
  trades: any[]
  performance: any
}) {
  if (!expert) return 'Expert não selecionado.'
  return (
    <div>
      <p className="w-full text-justify py-4">{expert.description}</p>
      <div>
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="w-full ">
            <TabsTrigger value="info">INFORMAÇÕES</TabsTrigger>
            <TabsTrigger value="graph">GRÁFICO</TabsTrigger>
            <TabsTrigger value="products">PRODUTOS</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <ExpertInfoPannel
              trades={trades}
              performance={performance}
              expert={expert}
            />
          </TabsContent>
          <TabsContent value="graph">
            <ExpertGraph expert={expert} trades={trades} />
          </TabsContent>
          <TabsContent value="products">
            <ExpertProductsPannel expert={expert} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
export default function ExpertPannel({
  experts,
  trades,
  currentExpertId,
  setCurrentExpertId,
  performances,
}: {
  experts: Expert[]
  trades: any[]
  currentExpertId: string
  setCurrentExpertId: (value: string) => void
  performances: any[]
}) {
  const [localId, setLocalId] = useState<string>(currentExpertId)
  useEffect(() => {
    setLocalId(currentExpertId)
  }, [currentExpertId])
  const getTargets = () => {
    const expert = experts.find((exp) => exp.id == localId)
    const performance = performances.find(
      (per) => per.magicNumber == expert?.magicNumber,
    )
    return { expert, performance }
  }
  return (
    <div>
      <div className="flex items-center lg:gap-x-2 w-full lg:max-w-1/2 hidden lg:flex">
        {experts.map((expert) => (
          <CustomButton
            key={expert.id}
            label={expert.name}
            color={localId == expert.id ? 'Action' : 'Option'}
            css="w-1/3 lg:py-6 lg:text-xl"
            action={() => setCurrentExpertId(expert.id as string)}
          />
        ))}
      </div>
      <div className="flex items-center lg:gap-x-2 w-full lg:max-w-1/2 lg:hidden">
        <SelectExpertButton
          experts={experts}
          setId={(id: string) => setCurrentExpertId(id)}
        />
      </div>
      <h1 className="text-center text-xl font-medium pt-8 pb-4 lg:text-start lg:text-4xl lg:py-10">
        {experts.find((exp) => exp.id == localId)?.name}
      </h1>
      <div className="hidden lg:block">
        <ExpertDesktopPannel
          performance={getTargets().performance}
          expert={getTargets().expert}
          trades={trades.filter(
            (trd) => trd.magic == getTargets().expert?.magicNumber,
          )}
        />
      </div>
      <div className="lg:hidden">
        <ExpertMobilePannel
          performance={getTargets().performance}
          expert={getTargets().expert}
          trades={trades.filter(
            (trd) => trd.magic == getTargets().expert?.magicNumber,
          )}
        />
      </div>
    </div>
  )
}
