'use client'
import Cookies from 'js-cookie'
export function logout() {
  Cookies.remove('token')
}
