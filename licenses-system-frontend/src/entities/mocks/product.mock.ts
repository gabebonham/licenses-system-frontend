import { Product } from '../product.entity'

export const productMocks: Product[] = [
  {
    id: 'prod-001',
    price: 49.99,
    maxVolume: 10000,
    expertId: 'exp-001',
    expert: {} as any,

    parformance: { winRate: 0.72, avgMonthlyReturn: 0.08 },
    name: 'Forex Precision Bot',
    licenses: [],
    lastLinkName: 'precision-bot',
    webHookToken: 'whk_32d9asd2e1',
    checkoutLink: 'https://checkout.example.com/precision-bot',
  },
  {
    id: 'prod-002',
    price: 79.9,
    maxVolume: 20000,
    expertId: 'exp-002',
    expert: {} as any,

    parformance: { winRate: 0.68, avgMonthlyReturn: 0.11 },
    name: 'Crypto Momentum AI',
    licenses: [],
    lastLinkName: 'momentum-ai',
    webHookToken: 'whk_d9231jas91',
    checkoutLink: 'https://checkout.example.com/momentum-ai',
  },
  {
    id: 'prod-003',
    price: 29.0,
    maxVolume: 5000,
    expertId: 'exp-003',
    expert: {} as any,

    parformance: { winRate: 0.61, avgMonthlyReturn: 0.05 },
    name: 'Equity Scalper',
    licenses: [],
    lastLinkName: 'equity-scalper',
    webHookToken: 'whk_9123asd8s7',
    checkoutLink: 'https://checkout.example.com/equity-scalper',
  },
]
