'use client'

import CopyModalButton from '@/app/users/components/CopyModalButton'
import VoteProfileModalButton from '@/app/users/components/VoteModalButton'
import CustomButton from '@/components/shared/buttons/CustomButton'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { copyFile } from 'fs'
import { Check, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
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
  performancesCopy: any[]
  magicNumber: number
  trades: any[]
}
export default function CopyCard({
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
  magicNumber,
  trades,
}: Props) {
  const getTargets = () => {
    const performanceCopy = performancesCopy.find(
      (per) => per.magicNumber == magicNumber,
    )
    return {
      copy: {
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
        magicNumber,
      },
      performanceCopy,
    }
  }
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

  return (
    <Card
      className={`border-1 border-blueDark shadow-xl  px-4 flex flex-col justify-between `}
    >
      <div className="flex flex-col px-4 gap-y-4 justify-center rounded-xl  ">
        <div className="flex flex-col lg:flex-row items-start lg:items-center  lg:justify-between ">
          <div className="flex flex-col items-start">
            <div className="text-xl lg:text-3xl flex items-center gap-x-4 py-4 text-start">
              <h3>{title}</h3>
              <h1 className="text-xl  flex">
                {Array.from({
                  length: getStarRating(countRatings(ratings)),
                }).map((_, i) => (
                  <Star
                    fill="currentColor"
                    fillRule="inherit"
                    className={getColor(getStarRating(countRatings(ratings)))}
                  />
                ))}
              </h1>
            </div>
            <Badge className="rounded-xl bg-blueLight2 text-mainDark lg:text-md">
              <span className="font-medium">Performance: {performance}</span>%
            </Badge>
          </div>
          <div className="hidden lg:block">
            {imageUrl && (
              <Image
                className="w-32 rounded-xl"
                width={50}
                height={50}
                alt={id}
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL + imageUrl}`}
              />
            )}
          </div>
        </div>

        <ScrollArea className="max-h-34 h-34">{description}</ScrollArea>
        <ScrollArea className="max-h-28 max-h-28 min-h-12    ">
          <div className="flex flex-wrap gap-y-2  gap-x-4">
            {caracteristics.split(',').map((car) => (
              <Badge
                key={car}
                className="bg-blueLight2 text-blueDark text-sm rounded-xl flex-wrap"
              >
                {car}
              </Badge>
            ))}
          </div>
        </ScrollArea>
        <div className="text-center">
          <span className="text-mainBlack font-bold">Capital Inicial:</span>{' '}
          {minimumCapital} |
          <span className="text-mainBlack font-bold"> Corretora:</span> {broker}{' '}
          | <span className="text-mainBlack font-bold">Tipo de Conta:</span>{' '}
          {type}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        <CustomButton
          label="Manual"
          color="Action"
          css="lg:text-lg py-5 lg:rounded-lg basis-1/2"
          action={handler}
        />
        <a href={openAccountLink} target="_blank" rel="noopener noreferrer">
          <CustomButton
            label="Criar Conta"
            color="Action"
            css="lg:text-lg py-5 lg:rounded-lg basis-1/2"
          />
        </a>
        {!!userId && !hasVoted(ratings) ? (
          <VoteProfileModalButton userId={userId} copyId={id} />
        ) : (
          <p className="text-center text-xl flex w-full items-center justify-center ">
            Avaliado
            <Check />
          </p>
        )}
        <a href={link} target="_blank" rel="noopener noreferrer">
          <CustomButton
            label="Assinar Copy"
            color="Option"
            css="lg:text-lg py-5 lg:rounded-lg basis-1/2"
          />
        </a>
      </div>
      <div>
        {trades && trades.length > 0 && (
          <CopyModalButton
            trades={trades.filter(
              (trd) => trd.magic == getTargets().copy?.magicNumber,
            )}
            manualLink={manualLink}
            openAccountLink={openAccountLink}
            broker={broker}
            minimumCapital={minimumCapital}
            type={type}
            imageUrl={imageUrl}
            link={link}
            ratings={ratings}
            key={id}
            id={id}
            userId={userId}
            caracteristics={caracteristics}
            title={title}
            description={description}
            performance={performance}
            performancesCopy={getTargets()}
          />
        )}
      </div>
    </Card>
  )
}
