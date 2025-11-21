import { getProducts } from '../admin/actions/products.service'
import HomePageComponent from './pages/HomePageComponent'
import {
  getExperts,
  getPerformances,
  getTrades,
} from '../admin/actions/experts.service'
import { cookies } from 'next/headers'
import { decodeJwt } from '@/lib/jwt-decode'
import { getUserById } from '../admin/actions/users.service'
import { getRatings } from '../users/actions/ratings.service'
import {
  getCopies,
  getPerformancesForCopies,
} from '../admin/actions/copies.service'
import { getPartners } from '../admin/actions/partners.service'
export default async function HomePage() {
  const res = await getExperts()
  const resCopies = await getCopies()
  const resTrades = await getTrades()
  const ratings = await getRatings()
  const partners = await getPartners()
  const performances = await getPerformances(res.success, res.data)
  const performancesCopy = await getPerformancesForCopies(
    resCopies.success,
    resCopies.data,
  )
  const cookieStore = await cookies()

  const token = await decodeJwt(cookieStore.get('token')?.value as string)
  let user = { success: false, data: { id: '' } } as any
  if (token) {
    user = await getUserById(token!.id)
  }
  return (
    <main className="w-full ">
      <HomePageComponent
        copies={(resCopies.success && resCopies.data) || []}
        items={(partners.success && partners.data) || []}
        trades={resTrades.data ?? []}
        res={res}
        performances={performances?.data ?? []}
        performancesCopy={performancesCopy?.data ?? []}
        ratings={ratings.data}
        userId={user.success && user?.data?.id}
      />
    </main>
  )
}
