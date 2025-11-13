'use server'

import { api } from '@/lib/api'

export async function getCopies() {
  try {
    const res = await api.get('/copies')
    return {
      success: res.status == 200,
      data: res.data,
    }
  } catch (e) {
    return { success: false }
  }
}

export async function deleteCopy(id: string) {
  try {
    const res = await api.delete('/copies/' + id).then((r) => r.data)
    return { success: true, data: res }
  } catch (e) {
    return { success: false }
  }
}
export async function createCopy(
  name: string,
  description: string,
  link: string,
  price: string,
  caracteristics: string,
) {
  try {
    const formData = { name, description, link, price, caracteristics }
    const res = await api.post('/copies', formData)
    return { success: res.status == 201, data: res.data }
  } catch (e) {
    console.error('Error creating copy:', e)
    return { success: false }
  }
}
export async function patchCopy(
  id: string,
  name?: string,
  description?: string,
  link?: string,
  price?: string,
  caracteristics?: string,
) {
  try {
    const formData = {
      name: !!name ? name : undefined,
      description: !!description ? description : undefined,
      link: !!link ? link : undefined,
      caracteristics: !!caracteristics ? caracteristics : undefined,
      price: !!price ? parseFloat(price) : undefined,
    }
    const res = await api.patch('/copies/' + id, formData)
    return { success: true, data: res.data }
  } catch (e) {
    console.error('Error patching copy:', e)
    return { success: false }
  }
}
