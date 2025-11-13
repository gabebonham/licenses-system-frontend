'use client'
import { Card } from '@/components/ui/card'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { logout } from '@/lib/logout'
import { Info, LogIn, Menu, ShoppingCart, Star, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function MenuDrawerButton({ token }: { token: any }) {
  const router = useRouter()
  const handleScroll = (target: string) => {
    const section = document.getElementById(target)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const logoutHandler = () => {
    logout()
    router.refresh()
  }
  const items = [
    {
      name: 'Produtos',
      link: 'productsSection',
      icon: <ShoppingCart />,
    },
    {
      name: 'Sobre Nós',
      link: 'aboutSection',
      icon: <Info className="" />,
    },
    {
      name: 'Avaliações',
      link: 'ratingsSection',
      icon: <Star className="" />,
    },
    {
      name: 'Copies',
      link: 'copiesSection',
      icon: <ShoppingCart className="" />,
    },
  ]
  return (
    <Drawer direction={'right'}>
      <DrawerTrigger className="cursor-pointer">
        <Menu className="text-blueDark brightness-150 contrast-200" />
      </DrawerTrigger>
      <DrawerContent className="z-90 border-dark bg-gradient-to-br from-blueLight to-blueLight2 text-xl">
        <div className="w-full flex flex-col px-4 gap-y-8 py-8">
          {items.map((item) => (
            <Card
              key={item.name}
              onClick={() => handleScroll(item.link)}
              className="cursor-pointer border-dark text-dark px-4 "
            >
              <div className="flex items-center w-full gap-x-16">
                {item.icon}
                {item.name}
              </div>
            </Card>
          ))}
        </div>
        <DrawerFooter>
          {token && (
            <Card
              onClick={() =>
                router.push(
                  token.role == 'admin'
                    ? '/admin/dashboard'
                    : '/users/dashboard',
                )
              }
              className="cursor-pointer border-dark text-dark px-4 bg-white"
            >
              <div className="flex items-center w-full gap-x-16">
                <UserRound />
                Area de Assinante
              </div>
            </Card>
          )}
          {token ? (
            <Card
              onClick={logoutHandler}
              className="cursor-pointer border-dark text-dark px-4 bg-white"
            >
              <div className="flex items-center w-full gap-x-16">
                <LogIn />
                Logout
              </div>
            </Card>
          ) : (
            <Card
              onClick={() => router.push('/login')}
              className="cursor-pointer border-dark text-dark px-4 bg-white"
            >
              <div className="flex items-center w-full gap-x-16">
                <LogIn />
                Login
              </div>
            </Card>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
