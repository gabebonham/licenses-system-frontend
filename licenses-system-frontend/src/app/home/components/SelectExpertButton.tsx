'use client'

import CustomButton from '@/components/shared/buttons/CustomButton'
import { Card } from '@/components/ui/card'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Expert } from '@/entities/expert.entity'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Star } from 'lucide-react'
import { useState } from 'react'

export default function SelectExpertButton({
  experts,
  setId,
}: {
  experts: Expert[]
  setId: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  function handleClick(id: string) {
    setId(id)
    setOpen(false)
  }

  function getStarRating(percentage: number): number {
    const clamped = Math.max(0, Math.min(percentage, 100))
    const stars = Math.round((clamped / 100) * 5)

    return stars === 0 && clamped > 0 ? 1 : stars
  }
  const countRatings = (ratings: any[]) => {
    if (!ratings || ratings.length === 0) return 0
    const total = ratings.reduce((sum, rating) => sum + rating.value, 0)
    return total / ratings.length
  }
  function getColor(rating: number) {
    if (rating == 1) return 'text-yellow-900'
    if (rating == 2) return 'text-yellow-800'
    if (rating == 3) return 'text-yellow-700'
    if (rating == 4) return 'text-yellow-500'
    if (rating == 5) return 'text-yellow-400'
    return 'text-blueLight2'
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="w-full ">
        <CustomButton
          label="Selecionar Experts"
          color={'Option'}
          css="w-full  py-6 text-xl px-6"
        />
      </DrawerTrigger>
      <DrawerContent className="h-full bg-grayLight ">
        <ScrollArea className="min-h-3/5 text-dark text-center ">
          {/* {experts.map((expert, idx) => (
            <div
              onClick={() => setId(expert.id)}
              className={`text-3xl flex flex-col items-center ${
                isParOuImpar(idx) ? 'bg-dark/10' : 'bg-blueLight2/30'
              }`}
            >
              <p className="py-4">{expert.name}</p>
              <Separator className="my-2 w-11/12 border-t-1 bg-dark text-dark" />
            </div>
          ))} */}
          <div className="w-full flex flex-col px-4 gap-y-8 py-8">
            {experts.map((expert) => (
              <Card
                key={expert.id}
                onClick={() => handleClick(expert.id)}
                className="cursor-pointer border-dark flex flex-row items-center justify-between w-full text-dark px-8 "
              >
                <span className="w-fit text-xl">{expert.name}</span>
                <span className="w-fit flex items-center">
                  {Array.from({
                    length: getStarRating(countRatings(expert.ratings)),
                  }).map((_, i) => (
                    <Star
                      fill="currentColor"
                      fillRule="inherit"
                      className={getColor(
                        getStarRating(countRatings(expert.ratings)),
                      )}
                    />
                  ))}
                </span>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
