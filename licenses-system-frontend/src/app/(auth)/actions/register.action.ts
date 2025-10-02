'use server'

import { apiPublic } from '@/lib/api'
import { logger } from '@/lib/log.logger'

export async function register(formData: FormData) {
  try {
    const log = await logger()
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const name = formData.get('name') as string
    if (!email) {
      throw new Error('Email não preenchido')
    }
    if (!name) {
      throw new Error('Nome não preenchido')
    }
    if (confirmPassword != password) {
      throw new Error('Senhas diferentes')
    }
    const res = await apiPublic
      .post('/register', { name, email, password, role: 'admin' })
      .then((r) => r.data)
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : String(e) }
  }
}
