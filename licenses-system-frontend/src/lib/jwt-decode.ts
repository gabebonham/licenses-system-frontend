import jwt, { JwtPayload } from 'jsonwebtoken'
import { logger } from './log.logger'

export async function decodeJwt(token: string) {
  const decoded = jwt.decode(token) as JwtPayload | null
  const log = await logger()

  if (decoded) {
    log.warn('JWT decoded')
    return decoded
  } else {
    log.warn('JWT not decoded')
    return null
  }
}
