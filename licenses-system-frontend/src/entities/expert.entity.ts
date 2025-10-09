import { Product } from './product.entity'

export type Expert = {
  id: string
  name: string
  status: 'pending' | 'processing' | 'success' | 'failed'
  description: string
  initDate: string
  magicNumber: string
  caracteristics: string
  first: boolean
  imgUrl?: string
  fileContentUrl?: string
  products?: Product[]
  trades?: any[]
  performances?: any[]
}
export const exx = {
  id: 'string',
  name: 'string',
  status: 'pending',
  description: 'string',
  initDate: 'string',
  magicNumber: 'string',
  caracteristics: 'string',
  first: true,
  imgUrl: 'string',
  fileContentUrl: 'string',
  products: [{}],
  trades: [{}],
  performances: [{}]
} as Expert
