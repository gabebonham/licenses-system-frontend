'use client'

import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

export default function FilterCard() {
  return (
    <Card className="w-full">
      <div className="w-full flex flex-col px-4">
        <div>
          <p>Categoria</p>
          <div className="flex items-center">
            <Checkbox />
            <Label>Categoria 1</Label>
          </div>
          <div className="flex items-center">
            <Checkbox />
            <Label>Categoria 2</Label>
          </div>
          <div className="flex items-center">
            <Checkbox />
            <Label>Categoria 3</Label>
          </div>
          <div className="flex items-center">
            <Checkbox />
            <Label>Categoria 4</Label>
          </div>
          <div className="flex items-center">
            <Checkbox />
            <Label>Categoria 5</Label>
          </div>
          <div className="flex items-center">
            <Checkbox />
            <Label>Categoria 6</Label>
          </div>
        </div>
        <div>
          <p>Preço</p>
          <Slider defaultValue={[33]} max={100} step={1} />
        </div>
      </div>
    </Card>
  )
}
