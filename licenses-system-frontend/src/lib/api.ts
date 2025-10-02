'use server'
import axios from 'axios'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const api = axios.create({
  baseURL: `${process.env.BACKEND_URL}:5005/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

const apiPublic = axios.create({
  baseURL: `${process.env.BACKEND_URL}:5004/auth`,
  headers: { 'Content-Type': 'application/json' },
})
// Request interceptor
api.interceptors.request.use(async (config) => {
  const cookieSession = await cookies()
  const token = cookieSession.get('token') // Get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token.value}` // Attach token to headers
  }
  return config
})

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      redirect('/login')
    }
    return Promise.reject(error)
  },
)

export { api, apiPublic }
