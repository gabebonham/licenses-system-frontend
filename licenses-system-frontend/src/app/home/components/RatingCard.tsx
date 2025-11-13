'use client'

import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Star } from 'lucide-react'
import Link from 'next/link'
interface Props {
  userName: string
  description: string
  rating: number
  copy: any
}
export default function RatingCard({
  userName,
  description,
  rating,
  copy,
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
  return (
    <Card className="border-blueDark text-blueDark h-full">
      <div className="space-y-4 px-6">
        <div className="space-y-2 flex flex-col lg:flex-row items-start justify-between">
          <h1 className="text-2xl font-medium border-blueDark">{userName}</h1>
          <h1 className="text-xl  flex">
            {Array.from({ length: getStarRating(rating) }).map((_, i) => (
              <Star className={getColor(getStarRating(rating))} />
            ))}
          </h1>
        </div>
        <ScrollArea className="max-h-34 h-34">{description}</ScrollArea>
      </div>
      {copy?.link && (
        <div className="border-t-1 border-t-border-blueDark px-6">
          {/* <div>{props.copy.img}</div> */}
          <div className="py-3">
            <Link href={copy.link} className="text-2xl font-medium">
              {copy.name}
            </Link>
          </div>
        </div>
      )}
    </Card>
  )
}
