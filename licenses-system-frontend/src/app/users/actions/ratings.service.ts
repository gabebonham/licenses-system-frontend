'use server'

import { api } from '@/lib/api'

export async function createRating(
  userId: string,
  description: string,
  value: number,
  expertId?: string,
  copyId?: string,
) {
  try {
    const res = await api.post('/ratings', {
      userId,
      description,
      value,
      expertId,
      copyId,
    })
    return { success: res.status == 201, status: res.status }
  } catch (e) {
    console.log(e)
    return { success: false }
  }
}
export async function getRatings() {
  try {
    const res = await api.get('/ratings')
    return {
      success: res.status == 200,
      status: res.status,
      data: res.status == 200 ? res.data : [],
    }
  } catch (e) {
    console.log(e)
    return { success: false, data: [] }
  }
}
