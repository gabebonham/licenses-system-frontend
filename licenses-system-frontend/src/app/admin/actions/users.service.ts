'use server'

import { User } from '@/entities/user.entity'
import { api, apiPublic } from '@/lib/api'

export async function getUsers() {
  try {
    const res = await api.get('/user').then((r) => r.data)
    return { success: true, data: res }
  } catch (e) {
    return { success: false }
  }
}
export async function getUserById(id: string) {
  try {
    const res = await api.get('/user/' + id).then((r) => r.data)
    return { success: true, data: res }
  } catch (e) {
    console.log(e)
    return { success: false }
  }
}
export async function deleteUser(id: string) {
  try {
    const res = await api.delete('/user/' + id).then((r) => r.data)
    return { success: true, data: res }
  } catch (e) {
    return { success: false }
  }
}

export async function editUser(
  id: string,
  name?: string,
  email?: string,
  accountNumber?: number,
) {
  try {
    console.log(accountNumber)
    console.log(name)
    const data: any = {}
    if (name !== undefined) data.Name = name
    if (email !== undefined) data.Email = email
    if (accountNumber) data.AccountNumber = Number(accountNumber)

    const res = await api.patch('/user/' + id, data).then((r) => r.data)
  } catch (e) {
    console.log(e)
  }
}

export async function createUser(
  name: string,
  password: string,
  email: string,
  role: string,
) {
  try {
    const res = await apiPublic
      .post('/register', { name, email, password, role })
      .then((r) => r.data)
    return { success: true, data: res }
  } catch (e) {
    return { success: false }
  }
}
