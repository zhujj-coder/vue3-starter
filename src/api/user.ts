import { request } from '@/lib/request'

export interface User {
  id: number
  name: string
  email: string
}

export function getUser(id: number, config?: { signal?: AbortSignal }) {
  return request<User>({ url: `/users/${id}`, method: 'GET', ...config })
}

export function listUsers(params?: { page?: number; pageSize?: number }) {
  return request<{ items: User[]; total: number }>({
    url: '/users',
    method: 'GET',
    params,
  })
}

export function createUser(payload: Pick<User, 'name' | 'email'>) {
  return request<User>({ url: '/users', method: 'POST', data: payload })
}
