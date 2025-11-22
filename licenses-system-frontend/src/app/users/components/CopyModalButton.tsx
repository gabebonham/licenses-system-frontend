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
import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import CustomInput from '@/components/shared/inputs/CustomInput'
import { toast } from 'sonner'
import { editUser } from '@/app/admin/actions/users.service'
import { createRating } from '../actions/ratings.service'
import { ArrowDown, Star } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import GraphComponent from '@/components/shared/GraphComponent'
import GraphComponentCopy from '@/components/shared/GraphComponentCopy'
interface Props {
  id: string
  title: string
  userId: string | undefined
  performance: number
  description: string
  caracteristics: string
  link: string
  minimumCapital: number
  broker: string
  type: string
  imageUrl: string | undefined
  ratings: any
  manualLink: string
  openAccountLink: string
  performancesCopy: any
  trades: any[]
}
export default function CopyModalButton({
  id,
  title,
  userId,
  performance,
  description,
  caracteristics,
  ratings,
  imageUrl,
  link,
  minimumCapital,
  broker,
  type,
  openAccountLink,
  manualLink,
  performancesCopy,
  trades,
}: Props) {
  performancesCopy = performancesCopy.performanceCopy
  const [value, setValue] = useState<boolean>(true)
  const [scrollDirection, setScrollDirection] = useState(null)
  const [prevScrollY, setPrevScrollY] = useState(0)

  const viewportRef = useRef<HTMLDivElement | null>(null)

  const [isActive, activate] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()
  const handler = async () => {
    try {
      const finalName = manualLink?.split('/').pop() as string
      // Call the backend endpoint to download the file
      const response = await fetch(`/api/download/manual/${id}`, {
        method: 'POST',
        body: JSON.stringify({ name: finalName }),
      })

      if (!response.ok) {
        throw new Error('Error fetching the file')
      }

      // Create a blob from the response data
      const blob = await response.blob()

      // Create a temporary link to trigger the download
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = finalName // Set the download filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up the URL object
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }
  function getStarRating(percentage: number): number {
    const clamped = Math.max(0, Math.min(percentage, 100))
    const stars = Math.round((clamped / 100) * 5)

    return stars === 0 && clamped > 0 ? 1 : stars
  }
  function getColor(rating: number) {
    if (rating == 1) return 'text-yellow-900'
    if (rating == 2) return 'text-yellow-800'
    if (rating == 3) return 'text-yellow-700'
    if (rating == 4) return 'text-yellow-500'
    if (rating == 5) return 'text-yellow-400'
    return 'text-blueLight2'
  }
  const countRatings = (ratings: any[]) => {
    if (!ratings || ratings.length === 0) return 0
    const total = ratings.reduce((sum, rating) => sum + rating.value, 0)
    return total / ratings.length
  }
  const hasVoted = (ratings: any[]) => {
    return ratings.some((rating) => rating.userId == userId)
  }
  useEffect(() => {
    const element = document.getElementById('asdf')

    if (!element) return // evita o erro

    const onScroll = () => setValue(false)
    const onScrollEnd = () => setValue(true)

    element.addEventListener('scroll', onScroll)
    element.addEventListener('scrollend', onScrollEnd)

    return () => {
      element.removeEventListener('scroll', onScroll)
      element.removeEventListener('scrollend', onScrollEnd)
    }
  }, [])
  if (performancesCopy)
    return (
      <Dialog open={isActive} onOpenChange={activate}>
        <DialogTrigger asChild>
          <CustomButton
            action={() => activate(true)}
            label="Gráfico"
            color="Action"
            css="w-full lg:py-6 lg:rounded-xl lg:px-6 lg:text-xl"
          />
        </DialogTrigger>
        <DialogContent className="lg:max-h-3/4 h-11/12 lg:h-full lg:min-h-8/12 min-w-8/12 w-full  lg:px-6 z-90  bg-gradient-to-b to-blueLight2 from-grayLight border-dark rounded-2xl ">
          <DialogTitle className="lg:text-4xl lg:py-0 py-3 lg:w-8/12 pl-4 font-medium items-center flex justify-between ">
            {/* <p className="text-3xl">{title}</p>
            <h1 className="text-xl  flex">
              {Array.from({
                length: getStarRating(countRatings(ratings)),
              }).map((_, i) => (
                <Star
                  className={getColor(getStarRating(countRatings(ratings)))}
                />
              ))}
            </h1> */}
          </DialogTitle>
          <DialogDescription className="h-3/7 lg:h-4/6 w-full flex flex-col items-center">
            <ScrollArea className="h-full w-full">
              <div className="flex flex-col items-center w-full h-full min-w-0 overflow-hidden gap-y-12 ">
                <div className="flex lg:flex-row flex-col items-center gap-x-12 w-full min-w-0 ">
                  <div className="w-full lg:w-4/5 h-full">
                    {trades && (
                      <GraphComponentCopy name={title} trades={trades} />
                    )}
                  </div>
                  <div className="flex hidden h-fit lg:flex flex-col place-items-center w-full lg:w-1/3 gap-y-2 lg:gap-y-10  ">
                    <CustomButton
                      label="Manual"
                      color="Option"
                      css="text-lg lg:py-5 basis-1/2 !rounded-md bg-transprent"
                      action={handler}
                    />
                    <a
                      href={openAccountLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-fit"
                    >
                      <CustomButton
                        label="Criar Conta"
                        color="Action"
                        css="text-lg h-full lg:py-5 basis-1/2 !rounded-md hover:bg-transparent"
                      />
                    </a>
                    <a
                      href={link}
                      className="w-full h-fit "
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CustomButton
                        label="Assinar Copy"
                        color="Option"
                        css="text-lg h-full lg:py-5 basis-1/2 !rounded-md bg-transprent"
                      />
                    </a>
                  </div>
                </div>
                <div className="grid text-xl grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-4 place-items-center w-full px-4 min-w-0">
                  <p className="w-full flex justify-between">
                    <span className="font-bold"> Negociações:</span>
                    <span>{performancesCopy?.trades ?? 0}</span>
                  </p>
                  <p className="w-full flex justify-between">
                    <span className="font-bold"> Negociações com lucro:</span>
                    <span> {performancesCopy?.winningTrades ?? 0}</span>
                  </p>
                  <p className="w-full flex justify-between">
                    <span className="font-bold"> Negociações com perda:</span>
                    <span> {performancesCopy?.losingTrades ?? 0}</span>
                  </p>
                  <p className="w-full flex justify-between">
                    <span className="font-bold"> Melhor negociação:</span>
                    <span> {performancesCopy?.bestTrade.toFixed(2) ?? 0}</span>
                  </p>
                  <p className="w-full flex justify-between">
                    <span className="font-bold"> Fator de lucro:</span>
                    <span>
                      {' '}
                      {performancesCopy?.profitFactor.toFixed(2) ?? 0}
                    </span>
                  </p>
                  <p className="w-full flex justify-between">
                    <span className="font-bold"> Lucro médio:</span>
                    <span>
                      {' '}
                      {performancesCopy?.averageProfit.toFixed(2) ?? 0}
                    </span>
                  </p>
                  <p className="w-full flex justify-between">
                    <span className="font-bold"> Drawdown:</span>
                    <span> {performancesCopy?.drawdown.toFixed(2) ?? 0}</span>
                  </p>
                  <p className="w-full flex justify-between">
                    <span className="font-bold"> Pior negociação:</span>
                    <span> {performancesCopy?.worstTrade.toFixed(2) ?? 0}</span>
                  </p>
                  <p className="w-full flex justify-between">
                    <span className="font-bold"> Performance:</span>
                    <span> {performance.toFixed(2) ?? 0}%</span>
                  </p>
                  <p className="w-full flex justify-between">
                    <span className="font-bold"> Capital Mínimo:</span>
                    <span> {minimumCapital.toFixed(2) ?? 0}</span>
                  </p>
                  <p className="w-full flex justify-between">
                    <span className="font-bold"> Corretora:</span>
                    <span> {broker}</span>
                  </p>
                  <p className="w-full flex justify-between">
                    <span className="font-bold"> Tipo de Corretora:</span>
                    <span> {type}</span>
                  </p>
                </div>
                <div className="flex lg:hidden  flex-col items-center w-full lg:w-1/3 gap-y-2 lg:gap-y-12 py-4 ">
                  <CustomButton
                    label="Manual"
                    color="Option"
                    css="text-xl lg:py-8 basis-1/2 !rounded-md bg-transparent"
                    action={handler}
                  />
                  <CustomButton
                    label="Criar Conta"
                    color="Action"
                    css="text-xl lg:py-8 basis-1/2 !rounded-md "
                    href={openAccountLink}
                  />
                  <CustomButton
                    label="Assinar Copy"
                    color="Option"
                    css="text-xl lg:py-8 basis-1/2 !rounded-md bg-transparent"
                    href={link}
                  />
                </div>
              </div>
            </ScrollArea>

            <DialogFooter className=" items-center pt-2 h-full  flex flex-row w-full !justify-center border-t-dark/50 border-t-1 ">
              <ArrowDown className="animate-bounce text-dark " />
            </DialogFooter>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    )
}
