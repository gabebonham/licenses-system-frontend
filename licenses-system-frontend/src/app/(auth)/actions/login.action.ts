'use server'

import { apiPublic } from '@/lib/api'
import { logger } from '@/lib/log.logger'
import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  try {
    const log = await logger()
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = await cookies()
    if (!email) {
      throw new Error('Email não preenchido')
    }
    if (!password) {
      throw new Error('Senha não preenchida')
    }
    const res = await apiPublic
      .post('/login', { email: email.toLowerCase(), password })
      .then((r) => r.data)
    cookieStore.set('token', res.token)
    return { success: true, admin: res.role == 'admin' }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : String(e) }
  }
}
