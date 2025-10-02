import { Product } from './product.entity'

export type License = {
  id: string
  status: string
  product?: Product
}
