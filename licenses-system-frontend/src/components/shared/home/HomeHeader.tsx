'use client'
import MenuDrawerButton from '@/app/home/components/MenuDrawerButton'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/../public/images/Vector.png'
import CustomButton from '../buttons/CustomButton'

export default function HomeHeader({ token }: { token: any }) {
  const menuItems = [
    {
      label: 'Início',
      link: 'presentationSection',
    },
    {
      label: 'Produtos',
      link: 'productsSection',
    },
    {
      label: 'Sobre nós',
      link: 'aboutSection',
    },
    {
      label: 'Copies',
      link: 'copiesSection',
    },
    {
      label: 'Avaliações',
      link: 'ratingsSection',
    },
  ]
  const handleScroll = (target: string) => {
    const section = document.getElementById(target)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <header className="fixed w-full z-90   ">
      <div className="lg:py-12 w-full items-center px-4 flex justify-between border-b-2  backdrop-blur-2xl   h-18 lg:pl-24 lg:pr-12  ">
        <Link href={'/home'} className="flex items-center gap-x-4 ">
          <Image
            src={logo}
            alt="logo"
            className="w-16 lg:w-24"
            width={800}
            height={800}
          />
        </Link>
        <div className="hidden lg:flex flex items-center gap-x-22 text-2xl font-medium">
          {menuItems.map((item) => (
            <p
              onClick={() => handleScroll(item.link)}
              key={item.label}
              className="cursor-pointer [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)] transition-all duration-200 hover:[text-shadow:2px_2px_4px_rgba(191,234,255,0.5)]"
            >
              {item.label}
            </p>
          ))}
        </div>
        <div className="hidden lg:block">
          {!token ? (
            <CustomButton label="Login" color="Action" href="/login" />
          ) : (
            <div className="flex items-center gap-x-4">
              <CustomButton
                label="Dashboard"
                color="Action"
                href="/users/dashboard"
                css="w-1/2"
              />
              <CustomButton label="Logout" color="Action" css="w-1/2" logout />
            </div>
          )}
        </div>
        <div className="lg:hidden ">
          <MenuDrawerButton token={token} />
        </div>
      </div>
    </header>
  )
}
