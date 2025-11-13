'use client'

import VoteProfileModalButton from '@/app/users/components/VoteModalButton'
import CustomButton from '@/components/shared/buttons/CustomButton'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { copyFile } from 'fs'
import { Check, Star } from 'lucide-react'
interface Props {
  id: string
  name: string
  userId: string | undefined
  price: string
  description: string
  caracteristics: string
  link: string
  ratings: any
}
export default function CopyCard({
  id,
  name,
  userId,
  price,
  description,
  caracteristics,
  ratings,
  link,
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
    <Card className="border-1 border-blueDark shadow-xl bg-blueLight px-8 flex flex-col justify-between ">
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between">
          <h1 className="text-xl lg:text-3xl">{name}</h1>
          <h1 className="text-xl  flex">
            {Array.from({ length: getStarRating(countRatings(ratings)) }).map(
              (_, i) => (
                <Star
                  className={getColor(getStarRating(countRatings(ratings)))}
                />
              ),
            )}
          </h1>
        </div>
        <ScrollArea className="max-h-34 h-34">{description}</ScrollArea>
        <ScrollArea className="max-h-28 h-28    ">
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
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="text-center text-blueDark2 text-2xl font-bold">
          R$ <span className="font-medium">{price}</span>
        </div>
        <div className="space-y-2">
          <CustomButton
            label="Saiba Mais"
            color="Action"
            css="text-xl py-6"
            href={link}
          />
          {!!userId && !hasVoted(ratings) ? (
            <VoteProfileModalButton userId={userId} copyId={id} />
          ) : (
            <p className="text-center text-xl flex items-center justify-center">
              Avaliado
              <Check />
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}
