import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import PrivateHeader from './components/PrivateHeader'
import { decodeJwt } from '@/lib/jwt-decode'
import { getUsers } from './actions/users.service'

export default async function AdminLayout({
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
  if (tokenObj!.role != 'admin') {
    redirect('/users/dashboard')
  }
  return (
    <main>
      <div className="min-h-screen">
        <PrivateHeader />
        {children}
      </div>
    </main>
  )
}
