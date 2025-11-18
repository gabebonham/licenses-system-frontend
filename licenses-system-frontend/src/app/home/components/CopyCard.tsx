'use client'

import VoteProfileModalButton from '@/app/users/components/VoteModalButton'
import CustomButton from '@/components/shared/buttons/CustomButton'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { copyFile } from 'fs'
import { Check, Star } from 'lucide-react'
import Image from 'next/image'
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
}: Props) {
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
      className={` border-1 border-blueDark shadow-xl  px-4 flex flex-col justify-between `}
    >
      <div className="flex flex-col px-4 gap-y-4 justify-center rounded-xl  ">
        <div className="flex flex-col lg:flex-row items-center  lg:justify-between ">
          <div className="flex flex-col items-start">
            <div className="text-xl lg:text-3xl flex items-center gap-x-4 py-4 text-start">
              <h3>{title}</h3>
              <h1 className="text-xl  flex">
                {Array.from({
                  length: getStarRating(countRatings(ratings)),
                }).map((_, i) => (
                  <Star
                    className={getColor(getStarRating(countRatings(ratings)))}
                  />
                ))}
              </h1>
            </div>
            <Badge className="rounded-xl bg-blueLight2 text-mainDark text-lg">
              <span className="font-medium">Performance: {performance}</span>%
            </Badge>
          </div>
          <div>
            {imageUrl && (
              <Image
                className="w-32 rounded-xl"
                width={50}
                height={50}
                alt={id}
                src={`http://localhost:5005${imageUrl}`}
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
          css="text-xl py-6 basis-1/2"
          href={manualLink}
        />
        <CustomButton
          label="Criar Conta"
          color="Action"
          css="text-xl py-6 basis-1/2"
          href={openAccountLink}
        />
        {!!userId && !hasVoted(ratings) ? (
          <VoteProfileModalButton userId={userId} copyId={id} />
        ) : (
          <p className="text-center text-xl flex w-full items-center justify-center ">
            Avaliado
            <Check />
          </p>
        )}
        <CustomButton
          label="Assinar Copy"
          color="Option"
          css="text-xl py-6 basis-1/2"
          href={link}
        />
      </div>
    </Card>
  )
}
