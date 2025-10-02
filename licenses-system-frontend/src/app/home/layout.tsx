import Header from '@/components/shared/Header'
import HomeHeader from '@/components/shared/home/HomeHeader'
import HomeFooter from './components/HomeFooter'
import { cookies } from 'next/headers'
import { decodeJwt } from '@/lib/jwt-decode'
import { getProducts } from '../admin/actions/products.service'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  let tokenObj
  if (token) {
    const tokenContent = token.value
    tokenObj = await decodeJwt(tokenContent)
  }
  return (
    <main className="w-full">
      <HomeHeader token={tokenObj} />
      <div className=" min-h-screen w-full">{children}</div>
      <HomeFooter />
    </main>
  )
}
