'use server'

import { logger } from '@/lib/log.logger'

export async function login(formData: FormData) {
  try {
    const log = await logger()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (email !== 'marcelao@gmail.com') {
      throw new Error('Credenciais inválidas')
    }

    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : String(e) }
  }
}
