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
  title?: string,
  description?: string,
  caracteristics?: string,
  broker?: string,
  openAccountLink?: string,
  performance?: string,
  minimumCapital?: string,
  manualLink?: string,
  link?: string,
  type?: string,
  image?: File,
) {
  try {
    const formData = new FormData()
    if (title !== undefined) formData.append('title', title)
    if (description !== undefined) formData.append('description', description)
    if (link !== undefined) formData.append('link', link)
    if (broker !== undefined) formData.append('broker', broker)
    if (caracteristics !== undefined)
      formData.append('caracteristics', caracteristics)
    if (openAccountLink !== undefined)
      formData.append('openAccountLink', openAccountLink)
    if (performance !== undefined) formData.append('performance', performance)
    if (minimumCapital !== undefined)
      formData.append('minimumCapital', minimumCapital)
    if (manualLink !== undefined) formData.append('manualLink', manualLink)
    if (type !== undefined) formData.append('type', type)
    if (image !== undefined) formData.append('image', image)
    const res = await api.post('/copies', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return { success: res.status == 201, data: res.data }
  } catch (e) {
    console.error('Error creating copy:', e)
    return { success: false }
  }
}
export async function patchCopy(
  id: string,
  title?: string,
  description?: string,
  caracteristics?: string,
  broker?: string,
  openAccountLink?: string,
  performance?: string,
  minimumCapital?: string,
  manualLink?: string,
  link?: string,
  type?: string,
  image?: File,
) {
  try {
    const formData = new FormData()
    if (title !== undefined) formData.append('title', title)
    if (description !== undefined) formData.append('description', description)
    if (link !== undefined) formData.append('link', link)
    if (broker !== undefined) formData.append('broker', broker)
    if (caracteristics !== undefined)
      formData.append('caracteristics', caracteristics)
    if (openAccountLink !== undefined)
      formData.append('openAccountLink', openAccountLink)
    if (performance !== undefined) formData.append('performance', performance)
    if (minimumCapital !== undefined)
      formData.append('minimumCapital', minimumCapital)
    if (manualLink !== undefined) formData.append('manualLink', manualLink)
    if (type !== undefined) formData.append('type', type)
    if (image !== undefined) formData.append('image', image)
    const res = await api.patch('/copies/' + id, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return { success: res.status == 201, data: res.data }
  } catch (e) {
    console.error('Error updating copy:', e)
    return { success: false }
  }
}
