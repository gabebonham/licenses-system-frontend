import { Expert } from './expert.entity'
import { License } from './license.entity'

export type Product = {
  id: string
  price: number
  maxVolume: number
  expertId: string
  expert?: Expert
  parformance?: any
  name: string
  licenses: License[]
  lastLinkName: string
  webHookToken: string
  checkoutLink: string
}
