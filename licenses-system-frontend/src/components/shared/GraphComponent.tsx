'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from 'recharts'

type Trade = {
  id: string
  ticket: number
  symbol: string
  time: number
  volume: number
  profit: number
  type: number
  magic: number
}

interface Props {
  trades: Trade[]
}

// Possible symbols
const symbols = ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'BTCUSD']

export function generateMockTrades(count = 500): Trade[] {
  const trades: Trade[] = []
  let ticketCounter = 1000

  for (let i = 0; i < count; i++) {
    const symbol = symbols[Math.floor(Math.random() * symbols.length)]
    const profit = parseFloat((Math.random() * 200 - 100).toFixed(2)) // profit -100 to +100
    const volume = parseFloat((Math.random() * 5 + 0.1).toFixed(2)) // volume 0.1 to 5
    const type = Math.random() > 0.5 ? 0 : 1 // 0 = buy, 1 = sell
    const magic = Math.floor(Math.random() * 1000)

    trades.push({
      id: crypto.randomUUID(),
      ticket: ticketCounter++,
      symbol,
      time: i + 1, // sequential time
      volume,
      profit,
      type,
      magic,
    })
  }

  return trades
}

export default function GraphComponent({ trades }: Props) {
  // Sort trades by time
  const sorted = [...trades].sort((a, b) => a.time - b.time)
  // Build cumulative profit
  let cumulative = 0
  const equityData = sorted.map((t, index) => {
    cumulative += t.profit
    return {
      trade: `#${index + 1}`,
      resultado: cumulative,
      profit: t.profit,
      symbol: t.symbol,
    }
  })
  console.log('trades')
  console.log(trades)

  return (
    <div className="flex w-full flex-col items-center ">
      <div className="w-full">
        <h2 className="text-xl font-semibold mb-2">Curva De Capital</h2>
        <ResponsiveContainer width="100%" height={500} className={''}>
          <LineChart data={equityData} className=''  margin={{ top: 0, right: 40, bottom: 0, left: -20 }} >
            <CartesianGrid strokeDasharray="3 3"     />
            <XAxis dataKey="trade" />
            <YAxis />
            <Tooltip />
            <Line
              activeDot={false}
              type="monotone"
              dataKey="resultado"
              stroke="#4bc0c0"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* <div>
        <h2 className="text-xl font-semibold mb-2">Profit per Trade</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={equityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="trade" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="profit"
              fill="#4bc075"
              // optional: color negative profits red
              label={{ position: 'top' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  )
}
