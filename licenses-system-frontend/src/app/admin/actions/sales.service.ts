'use server'

import { User } from '@/entities/user.entity'
import { api, apiPublic } from '@/lib/api'

export async function getSales() {
  try {
    const res = await api.get('/sales').then((r) => r.data)
    return { success: true, data: res }
  } catch (e) {
    return { success: false }
  }
}
