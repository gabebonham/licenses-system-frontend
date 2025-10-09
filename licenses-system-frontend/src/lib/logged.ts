'use client'
import Cookies from 'js-cookie'
export function isLogged() {
  return !!Cookies.get('token')
}