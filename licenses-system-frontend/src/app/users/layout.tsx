import { cookies } from 'next/headers'
import PrivateHeader from './components/PrivateHeader'
import { redirect } from 'next/navigation'
import { decodeJwt } from '@/lib/jwt-decode'

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  if (!token) {
    redirect('/login')
  }
  const tokenObj = await decodeJwt(token.value)

  if (tokenObj!.role != 'user') {
    redirect('/admin/dashboard')
  }
  return (
    <main>
      <div className=" min-h-screen">
        <PrivateHeader />
        {children}
      </div>
    </main>
  )
}
