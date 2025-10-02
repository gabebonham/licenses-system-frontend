'use client'
import CustomButton from '@/components/shared/buttons/CustomButton'
import { logout } from '@/lib/logout'
import { Bot } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PrivateHeader() {
  const router = useRouter()
  const logoutHandler = () => {
    logout()
    router.refresh()
  }
  return (
    <header className="fixed w-full z-90  bg-background ">
      <div className="w-full items-center px-4 flex justify-between border-b-2  backdrop-blur-2xl   h-18 lg:pl-24 lg:pr-12  ">
        <div
          onClick={() => router.push('/home')}
          className="cursor-pointer flex items-center gap-x-4 "
        >
          <Bot className="text-blueLight" />
          <h1 className="lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blueLight to-white/70">
            H4Investimentos
          </h1>
        </div>
        <div>
          <CustomButton action={logoutHandler} color="Action" label="Logout" />
        </div>
      </div>
    </header>
  )
}
