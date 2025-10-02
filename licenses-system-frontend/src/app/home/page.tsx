import { getProducts } from '../admin/actions/products.service'
import HomePageComponent from './pages/HomePageComponent'
import {
  getExperts,
  getPerformances,
  getTrades,
} from '../admin/actions/experts.service'
export default async function HomePage() {
  const res = await getExperts()
  const resTrades = await getTrades()
  const filteredPerformances = await getPerformances()
  const tr = [
    {
      id: crypto.randomUUID(),
      ticket: 1001,
      symbol: 'EURUSD',
      time: 1696000000,
      volume: 1.0,
      price: 1.105,
      profit: 120.5,
      type: 0, // Buy
      magic: 1696000000,
    },
    {
      id: crypto.randomUUID(),
      ticket: 1002,
      symbol: 'GBPUSD',
      time: 1696086400,
      volume: 0.5,
      price: 1.255,
      profit: -45.2,
      type: 1, // Sell
      magic: 1696000000,
    },
    {
      id: crypto.randomUUID(),
      ticket: 1003,
      symbol: 'USDJPY',
      time: 1696172800,
      volume: 2.0,
      price: 145.2,
      profit: 300.0,
      type: 0,
      magic: 1696000000,
    },
    {
      id: crypto.randomUUID(),
      ticket: 1004,
      symbol: 'AUDUSD',
      time: 1696259200,
      volume: 1.5,
      price: 0.68,
      profit: -75.0,
      type: 1,
      magic: 1696000000,
    },
    {
      id: crypto.randomUUID(),
      ticket: 1005,
      symbol: 'USDCAD',
      time: 1696345600,
      volume: 1.2,
      price: 1.34,
      profit: 210.0,
      type: 0,
      magic: 1696000000,
    },
  ]
  return (
    <main className="w-full">
      <HomePageComponent
        trades={tr}
        res={res}
        performances={res.data?.performances ?? []}
      />
    </main>
  )
}
