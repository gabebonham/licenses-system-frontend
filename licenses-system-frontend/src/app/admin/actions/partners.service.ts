'use server'

import { api } from '@/lib/api'

export async function getPartners() {
  try {
    const res = await api.get('/partners')
    return { success: res.status == 200, data: res.data }
  } catch (e) {
    console.log(e)
    return { success: false }
  }
}
export async function deletePartner(id: string) {
  try {
    const res = await api.delete('/partners/' + id)
    return { success: res.status == 200, data: res.data }
  } catch (e) {
    console.log(e)
    return { success: false }
  }
}
export async function createPartner(name: string, link: string, image: File) {
  try {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('link', link)
    image && formData.append('image', image)
    const res = await api.post('/partners', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return { success: true, data: res.data }
  } catch (e) {
    console.error('Error creating partner:', e)
    return { success: false }
  }
}
