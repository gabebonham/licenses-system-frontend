import { Product } from './product.entity'

export type Expert = {
  id: string
  name: string
  status: 'pending' | 'processing' | 'success' | 'failed'
  description: string
  initDate: string
  initAmount?: number
  magicNumber: string
  caracteristics: string
  first: boolean
  ratings: any[]
  imgUrl?: string
  fileContentUrl?: string
  products?: Product[]
  trades?: any[]
  performances?: any[]
}
