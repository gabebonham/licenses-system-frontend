'use server'

import { Expert, exx } from '@/entities/expert.entity'
import { User } from '@/entities/user.entity'
import { api, apiPublic } from '@/lib/api'
import axios from 'axios'

export async function getExperts() {
  try {
    const res = await api.get('/experts').then((r) => r.data)
    return { success: true, data: res }
  } catch (e) {
    return { success: false }
  }
}
export async function getPerformances(experts: Expert[]) {
  try {
    const results = [];

    for (const expert of experts) {
      const r = await axios.get(
        `${process.env.BACKEND_URL}:5002/performance/${expert.magicNumber}`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      results.push({ ...r.data, magicNumber: expert.magicNumber });
    }

    return { success: true, data: results };
  } catch (e) {
    console.error('Error fetching performances:', e);
    return { success: false };
  }
}

export async function getTrades() {
  try {
    const res = await axios
  .get(`${process.env.BACKEND_URL}:5002/trade`, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  })
  .then((r) => r.data);
    // return {
    //   success: true,
    //   data: [
    //     {
    //       id: crypto.randomUUID(),
    //       ticket: 1001,
    //       symbol: 'EURUSD',
    //       time: 1696000000,
    //       volume: 1.0,
    //       price: 1.105,
    //       profit: 120.5,
    //       type: 0, // Buy
    //       magic: 1696000000,
    //     },
    //     {
    //       id: crypto.randomUUID(),
    //       ticket: 1002,
    //       symbol: 'GBPUSD',
    //       time: 1696086400,
    //       volume: 0.5,
    //       price: 1.255,
    //       profit: -45.2,
    //       type: 1, // Sell
    //       magic: 1696000000,
    //     },
    //     {
    //       id: crypto.randomUUID(),
    //       ticket: 1003,
    //       symbol: 'USDJPY',
    //       time: 1696172800,
    //       volume: 2.0,
    //       price: 145.2,
    //       profit: 300.0,
    //       type: 0,
    //       magic: 1696000000,
    //     },
    //     {
    //       id: crypto.randomUUID(),
    //       ticket: 1004,
    //       symbol: 'AUDUSD',
    //       time: 1696259200,
    //       volume: 1.5,
    //       price: 0.68,
    //       profit: -75.0,
    //       type: 1,
    //       magic: 1696000000,
    //     },
    //     {
    //       id: crypto.randomUUID(),
    //       ticket: 1005,
    //       symbol: 'USDCAD',
    //       time: 1696345600,
    //       volume: 1.2,
    //       price: 1.34,
    //       profit: 210.0,
    //       type: 0,
    //       magic: 1696000000,
    //     },
    //   ],
    // }
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
    console.log(formData)
    const res = await api.post('/experts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return { success: true, data: res.data }
  } catch (e) {
    console.error('Error creating expert:', e)
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
    console.log(fileName != 'undefined')
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
    const res = await api.get('/experts/' + id, {
      responseType: 'blob',
    }).then(r=>r.data)
    return {success:true,data: res}
  } catch (e) {
    console.error('Error getting file:', e)
  }
}
