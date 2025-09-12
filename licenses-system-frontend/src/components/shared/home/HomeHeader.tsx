import { Volleyball } from 'lucide-react'
import HomeSubMenu from './HomeSubMenu'
import MenuDrawerButton from '@/app/home/components/MenuDrawerButton'

export default function HomeHeader() {
  return (
    <header className="fixed w-full z-90 backdrop-blur-2xl ">
      <div className="w-full items-center flex justify-between border-b-2 bg-gradient-to-b from-black/20 to-primary border-b-white/90 h-18 px-4 bg-primary/60 ">
        <div>
          <Volleyball />
        </div>
        <div>
          <MenuDrawerButton />
        </div>
      </div>
    </header>
  )
}
