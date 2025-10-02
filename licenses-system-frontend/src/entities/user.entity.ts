import { License } from './license.entity'
import { Sale } from './sale.entity'

export type User = {
  id: string
  name: string
  role: 'admin' | 'user'
  accountNumber: number
  email: string
  licenses?: License[]
  sales?: Sale[]
  createdAt?: Date
}
