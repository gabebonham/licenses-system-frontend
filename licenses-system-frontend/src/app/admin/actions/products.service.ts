'use server'

import { api } from '@/lib/api'

export async function getProducts() {
  try {
    const res = await api.get('/products')
    return { success: res.status == 200, data: res.data }
  } catch (e) {
    return { success: false }
  }
}

export async function createProducts(
  name: string,
  price: number,
  maxVolume: number,
  expertId: string,
  lastLinkName: string,
  webHookToken: string,
  checkoutLink: string,
) {
  try {
    const data = {
      name,
      price,
      maxVolume,
      expertId,
      lastLinkName,
      webHookToken,
      checkoutLink,
    }
    const res = await api.post('/products', data)
    return { success: true, data: res.data }
  } catch (e: any) {
    const errorMsg =
      e.response?.data?.message || e.message || 'Failed to create product'
    console.error('Error creating product:', e)
    return { success: false, error: errorMsg }
  }
}
export async function deleteProduct(id: string) {
  try {
    const res = await api.delete('/products/' + id).then((r) => r.data)
    return { success: true }
  } catch (e) {
    return { success: false }
  }
}
