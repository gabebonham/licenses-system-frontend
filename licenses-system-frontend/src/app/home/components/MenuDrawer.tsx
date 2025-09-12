'use client'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
type DirectionType = 'top' | 'bottom' | 'left' | 'right' | undefined
interface Props {
  trigger: React.ReactNode
  direction: DirectionType
}
export default function MenuDrawer({ trigger, direction }: Props) {
  return (
    <Drawer direction={direction}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="z-90">
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
      </DrawerContent>
    </Drawer>
  )
}
