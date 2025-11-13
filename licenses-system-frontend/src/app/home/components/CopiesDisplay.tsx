'use client'

import CopiesCarousel from './CopiesCarousel'
import CopyCard from './CopyCard'

export default function CopiesDisplay({
  userId,
  copies,
}: {
  userId: string
  copies: any[]
}) {
  // const copies = [
  //   {
  //     id: '5',
  //     name: 'AstraFX Momentum',
  //     description:
  //       'AstraFX Momentum focuses on short-term market movements using a hybrid algorithm that combines price action with volatility signals. Designed for high-frequency traders seeking consistent daily gains with moderate risk exposure. Ideal for pairs like EUR/USD and GBP/USD.',
  //     caracteristics: [
  //       'Average monthly ROI: 8–12%',
  //       'Risk per trade: 1.2%',
  //       'Max drawdown: 9%',
  //       'Scalping and intraday compatible',
  //       'AI-assisted position sizing',
  //       'Operates on MetaTrader 5',
  //       'Real-time copy execution',
  //       '24/7 monitoring system',
  //     ],
  //     price: '149',
  //   },
  //   {
  //     id: '4',
  //     name: 'NeuralEdge Quant',
  //     description:
  //       'NeuralEdge Quant leverages deep reinforcement learning to optimize trade timing and reduce drawdowns. Built for traders who want an AI-driven copy system that adapts automatically to changing volatility conditions in Forex and commodities.',
  //     caracteristics: [
  //       'Machine learning core engine',
  //       'Adaptive risk balancing',
  //       'Optimized for XAU/USD and USD/JPY',
  //       'Low latency copy execution',
  //       'Dynamic stop-loss recalibration',
  //     ],
  //     price: '199',
  //   },
  //   {
  //     id: '3',
  //     name: 'AtlasTrader V3',
  //     description:
  //       'AtlasTrader V3 is a trend-following copy system designed for stability and long-term growth. It follows institutional-grade indicators to identify medium-term momentum, with strict risk management and position control.',
  //     caracteristics: [
  //       'Focus: Swing trading (H4/D1)',
  //       'Average monthly ROI: 5–9%',
  //       'Max open trades: 4',
  //       'Supports major FX pairs and indices',
  //       'Auto-compounding feature',
  //     ],
  //     price: '129',
  //   },
  //   {
  //     id: '2',
  //     name: 'TitanGrid SmartCopy',
  //     description:
  //       'TitanGrid SmartCopy operates a controlled grid strategy optimized for range-bound markets. It manages exposure dynamically, reducing grid density when volatility spikes. Ideal for steady growth with low intervention.',
  //     caracteristics: [
  //       'Grid-based risk control system',
  //       'Smart exposure limiter',
  //       'Optimized for EUR/USD',
  //       'Auto capital protection layer',
  //       'Supports MT4/MT5 integration',
  //     ],
  //     price: '99',
  //   },
  //   {
  //     id: '1',
  //     name: 'QuantumPips AutoTrader',
  //     description:
  //       'QuantumPips AutoTrader is a hands-free copy trading solution for traders who value automation and diversification. It copies trades from a top-performing portfolio managed by professional quant analysts.',
  //     caracteristics: [
  //       'Live performance verified via MyFxBook',
  //       'Monthly average gain: 10–15%',
  //       'Risk control via dynamic leverage',
  //       'Compatible with major brokers',
  //       'Mobile notifications for trade updates',
  //     ],
  //     price: '179',
  //   },
  // ]

  return (
    <div id="copiesSection" className="px-8 lg:px-24 py-18 text-blueLight ">
      <div>
        <h1 className="text-3xl lg:text-7xl font-bold ">PORTAL DE COPIES</h1>
        <p className="lg:text-2xl lg:max-w-2/3 py-8 ">
          Navegue GRÁTIS pelo mercado de opções B3 através do nosso portal. Veja
          aqui uma amostra das ações com maior volume em opções agora:
        </p>
      </div>
      <div className="hidden lg:grid grid-cols-3 gap-24 ">
        {copies.map((copy) => (
          <CopyCard
            link={copy.link}
            ratings={copy.ratings}
            key={copy.id}
            id={copy.id}
            userId={userId}
            caracteristics={copy.caracteristics}
            name={copy.name}
            description={copy.description}
            price={copy.price}
          />
        ))}
      </div>
      <div className="lg:hidden">
        <CopiesCarousel userId={userId} copies={copies} />
      </div>
    </div>
  )
}
