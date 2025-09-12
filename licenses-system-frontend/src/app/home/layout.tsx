import Header from '@/components/shared/Header'
import HomeHeader from '@/components/shared/home/HomeHeader'
import HomeFooter from './components/HomeFooter'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="w-full">
      <HomeHeader />
      <div className=" min-h-screen w-full">{children}</div>
      <HomeFooter />
    </main>
  )
}
