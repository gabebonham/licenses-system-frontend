'use server'

import { Copy } from '@/entities/copy.entity'
import { api } from '@/lib/api'
import axios from 'axios'

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
  magicNumber?: string,
  title?: string,
  description?: string,
  caracteristics?: string,
  broker?: string,
  openAccountLink?: string,
  performance?: string,
  minimumCapital?: string,
  link?: string,
  type?: string,
  image?: File,
) {
  try {
    const formData = new FormData()
    if (magicNumber !== undefined) formData.append('magicNumber', magicNumber)
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
  magicNumber?: string,
  title?: string,
  description?: string,
  caracteristics?: string,
  broker?: string,
  openAccountLink?: string,
  performance?: string,
  minimumCapital?: string,
  link?: string,
  type?: string,
  image?: File,
) {
  try {
    const formData = new FormData()
    if (magicNumber !== undefined) formData.append('magicNumber', magicNumber)
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
    if (type !== undefined) formData.append('type', type)
    if (image instanceof File && image.size > 0) {
      formData.append('image', image)
    }
    const res = await api.patch('/copies/' + id, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return { success: res.status == 201 || res.status == 200, data: res.data }
  } catch (e) {
    console.error('Error updating copy:', e)
    return { success: false }
  }
}
export async function patchCopyFile(formData: FormData) {
  try {
    const res = await api.patch('/copies/' + formData.get('id'), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  } catch (e) {
    console.error('Error updating copy:', e)
  }
}
export async function getPerformancesForCopies(
  success: boolean,
  copies: Copy[] = [],
) {
  try {
    const results: any[] = []
    if (!success) {
      return { success: true, data: results }
    }
    for (const copy of copies) {
      const r = await axios.get(
        `http://168.231.92.131:5002/performance/${copy.magicNumber}`,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      if (r.status == 200)
        results.push({ ...r.data, magicNumber: copy.magicNumber })
    }
    return { success: true, data: results }
  } catch (e) {
    console.error('Error fetching performances:', e)
    return { success: false }
  }
}
