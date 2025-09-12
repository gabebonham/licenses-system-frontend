import { Card } from '@/components/ui/card'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Info, LogIn, Menu, ShoppingCart, UserRound } from 'lucide-react'
import Link from 'next/link'

export default function MenuDrawerButton() {
  const items = [
    {
      name: 'Produtos',
      link: '/home/products',
      icon: <ShoppingCart />,
    },
    {
      name: 'Sobre Nós',
      link: '',
      icon: <Info className="text-black" />,
    },
  ]
  return (
    <Drawer direction={'right'}>
      <DrawerTrigger>
        <Menu />
      </DrawerTrigger>
      <DrawerContent className="z-90">
        <div className="w-full flex flex-col px-4 gap-y-8 py-8">
          {items.map((item) => (
            <Link href={item.link}>
              <Card className="px-4 h-24 flex items-center justify-center">
                <div className="flex items-center w-full gap-x-16">
                  {item.icon}
                  {item.name}
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <DrawerFooter>
          <Card className="px-4 h-24 flex items-center justify-center">
            <div className="flex items-center w-full gap-x-16">
              <UserRound />
              Area de Assinante
            </div>
          </Card>
          <Card className="px-4 h-24 flex items-center justify-center">
            <div className="flex items-center w-full gap-x-16">
              <LogIn />
              Login
            </div>
          </Card>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
