'use client'

import CustomButton from '@/components/shared/buttons/CustomButton'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
interface Props {
  name: string
  price: string
  description: string
  caracteristics: string[]
}
export default function ExpertCard({
  name,
  price,
  description,
  caracteristics,
}: Props) {
  return (
    <Card className="border-1 border-blueDark shadow-xl bg-blueLight px-8 flex flex-col justify-between ">
      <div className="flex flex-col gap-y-4">
        <div>
          <h1 className="text-3xl">{name}</h1>
        </div>
        <ScrollArea className="max-h-34 h-34">{description}</ScrollArea>
        <div className="flex flex-wrap gap-y-2 gap-x-4 max-w-full">
          {caracteristics.map((car) => (
            <Badge
              key={car}
              className="bg-blueLight2 text-blueDark text-sm rounded-xl h-fit break-words"
            >
              {car}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="text-center text-blueDark2 text-2xl font-bold">
          R$ <span className="font-medium">{price}</span>
        </div>
        <div>
          <CustomButton label="Saiba Mais" color="Action" css="text-xl py-6" />
        </div>
      </div>
    </Card>
  )
}
