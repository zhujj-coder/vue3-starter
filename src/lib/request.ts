import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios'
import { API_BASE } from '@/env'
import { toastError } from './toast'

export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

export class ApiError extends Error {
  readonly code: number
  readonly raw: unknown
  constructor(message: string, code: number, raw: unknown) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.raw = raw
  }
}

const instance: AxiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.set('Authorization', `Bearer ${token}`)
  return config
})

instance.interceptors.response.use(
  (response) => {
    const body = response.data as ApiResponse | undefined
    if (body && typeof body === 'object' && 'code' in body && 'data' in body) {
      if (body.code >= 200 && body.code < 300) {
        return body.data
      }
      toastError(body.message || `请求失败 (${body.code})`)
      return Promise.reject(new ApiError(body.message || 'Business Error', body.code, body))
    }
    return response.data
  },
  (error) => {
    const message = error.response?.data?.message || error.message || '网络请求失败'
    toastError(message)
    return Promise.reject(new ApiError(message, error.response?.status ?? 0, error.response?.data))
  },
)

export async function request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
  return instance.request<unknown, T>(config)
}

export default instance
