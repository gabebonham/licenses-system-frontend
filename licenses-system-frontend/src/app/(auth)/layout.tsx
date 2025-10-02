import Header from '@/components/shared/Header'
import { decodeJwt } from '@/lib/jwt-decode'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  if (token) {
    const tokenObj = await decodeJwt(token.value)
    if (tokenObj.role == 'admin') {
      redirect('/admin/dashboard')
    } else {
      redirect('/users/dashboard')
    }
  } else {
    return (
      <main>
        <div className=" min-h-screen">{children}</div>
      </main>
    )
  }
}
