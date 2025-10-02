'use server'

import { User } from '@/entities/user.entity'
import { api, apiPublic } from '@/lib/api'

export async function createLicence(
  userId: string,
  productId: string,
  status: string,
) {
  try {
    const res = await api
      .post('/licenses', { userId, productId, status })
      .then((r) => r.data)
    return { success: true, data: res }
  } catch (e) {
    console.log(e)
    return { success: false }
  }
}

export async function deleteLicense(id: string) {
  try {
    const res = await api.delete('/licenses/' + id).then((r) => r.data)
    return { success: true, data: res }
  } catch (e) {
    return { success: false }
  }
}

export async function toggleLicenseStatus(id: string, value: string) {
  try {
    const res = await api
      .patch('/licenses/' + id, { status: value })
      .then((r) => r.data)
    return { success: true, data: res }
  } catch (e) {
    console.log(e)
    return { success: false }
  }
}

export async function getLicenses() {
  try {
    const res = await api.get('/licenses').then((r) => r.data)
    return { success: true, data: res }
  } catch (e) {
    return { success: false }
  }
}
