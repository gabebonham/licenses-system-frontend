import { Bot, Volleyball } from 'lucide-react'
import HomeSubMenu from './HomeSubMenu'
import MenuDrawerButton from '@/app/home/components/MenuDrawerButton'
import Link from 'next/link'

export default function HomeHeader({ token }: { token: any }) {
  return (
    <header className="fixed w-full z-90  bg-background ">
      <div className="w-full items-center px-4 flex justify-between border-b-2  backdrop-blur-2xl   h-18 lg:pl-24 lg:pr-12  ">
        <Link href={'/home'} className="flex items-center gap-x-4 ">
          <Bot className="text-blueLight" />
          <h1 className="lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blueLight to-white/70">
            H4Investimentos
          </h1>
        </Link>
        <div className="flex">
          <MenuDrawerButton token={token} />
        </div>
      </div>
    </header>
  )
}
