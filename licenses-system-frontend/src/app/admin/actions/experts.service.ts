'use server'

import { Expert } from '@/entities/expert.entity'
import { expertMocks } from '@/entities/mocks/expert.mock'
import { api, apiPublic } from '@/lib/api'
import axios from 'axios'

export async function getExperts() {
  try {
    const res = await api.get('/experts')
    return {
      success: res.status == 200,
      data: res.data,
    }
  } catch (e) {
    return { success: false }
  }
}
export async function getPerformances(
  success: boolean,
  experts: Expert[] = [],
) {
  try {
    const results: any[] = []
    if (!success) {
      return { success: true, data: results }
    }
    for (const expert of experts) {
      const r = await axios.get(
        `http://168.231.92.131:5002/performance/${expert.magicNumber}`,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      if (r.status == 200)
        results.push({ ...r.data, magicNumber: expert.magicNumber })
    }
    return { success: true, data: results }
  } catch (e) {
    console.error('Error fetching performances:', e)
    return { success: false }
  }
}

export async function getTrades() {
  try {
    const res = await axios
      .get(`http://168.231.92.131:5002/trade`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then((r) => r.data)

    return { success: true, data: res }
  } catch (e) {
    return { success: false }
  }
}

export async function deleteExpert(id: string) {
  try {
    const res = await api.delete('/experts/' + id).then((r) => r.data)
    return { success: true, data: res }
  } catch (e) {
    return { success: false }
  }
}
export async function createExpert(
  name: string,
  description: string,
  magic: string,
  initAmount: string,
  caracteristics: string,
  initDate?: Date,
  image?: File,
  fileContent?: File,
) {
  try {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('magicNumber', magic)
    formData.append('initAmount', initAmount)
    formData.append('caracteristics', caracteristics)
    image && formData.append('image', image)
    fileContent && formData.append('fileContent', fileContent)
    initDate && formData.append('initDate', initDate.toISOString())
    const res = await api.post('/experts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return { success: true, data: res.data }
  } catch (e) {
    console.error('Error creating expert:', e)
    return { success: false }
  }
}
export async function editExpert(
  id: string,
  name?: string,
  description?: string,
  magic?: string,
  initAmount?: string,
  caracteristics?: string,
  initDate?: Date,
) {
  try {
    const formData = {
      name: !!name ? name : undefined,
      description: !!description ? description : undefined,
      magicNumber: !!magic ? magic : undefined,
      initAmount: !!initAmount ? initAmount : undefined,
      caracteristics: !!caracteristics ? caracteristics : undefined,
      initDate: !!initDate ? initDate : undefined,
    }
    const res = await api.patch('/experts/' + id, formData)

    return { success: true, data: res.data }
  } catch (e) {
    console.error('Error patching expert:', e)
    return { success: false }
  }
}
export async function uploadFile(formData: FormData) {
  try {
    const newFormData = new FormData()
    const fileName = (formData.get('archive')?.valueOf() as File).name
    newFormData.append(
      'fileContent',
      formData.get('archive')?.valueOf() as File,
    )
    if (fileName != 'undefined') {
      const res = await api.patch(
        (('/experts/' + formData.get('id')?.valueOf()) as string) +
          '/fileContent',
        newFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      )
    }
  } catch (e) {
    console.error('Error creating expert:', e)
  }
}

export async function setFirst(id: string, current: boolean) {
  try {
    const newFormData = new FormData()
    const res = await api.patch(
      '/experts/' + id,
      { first: !current },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (e) {
    console.error('Error creating expert:', e)
  }
}
export async function downloadFile(id: string) {
  try {
    const res = await api
      .get('/experts/' + id, {
        responseType: 'blob',
      })
      .then((r) => r.data)
    return { success: true, data: res }
  } catch (e) {
    console.error('Error getting file:', e)
  }
}
