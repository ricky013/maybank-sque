/* eslint-disable @typescript-eslint/no-explicit-any */
import { HEADER_REQUEST } from '../../helpers/header-request'
import api from './apiAxiosInterceptor'

export const POST_AUTH = async (path: string, dataBody: any) => {
  try {
    const response = await api.post(path, dataBody, {
      withCredentials: true
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const GET = async (path: string, id?: string) => {
  try {
    const response = await api.get(id ? `${path}/${id}` : path, HEADER_REQUEST)
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const POST = async (path: string, dataBody: any) => {
  try {
    const response = await api.post(path, dataBody, HEADER_REQUEST)
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const POST_FORM_DATA = async (path: string, dataBody: any) => {
  try {
    const response = await api.post(path, dataBody, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const PUT_FORM_DATA = async (path: string, dataBody: any, id: string) => {
  try {
    const url = id ? `${path}/${id}` : path
    const response = await api.put(url, dataBody, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const PUT = async (path: string, dataBody: any, id: string) => {
  try {
    const url = id ? `${path}/${id}` : path
    const response = await api.put(url, dataBody, HEADER_REQUEST)
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const DELETE = async (path: string, id: string) => {
  try {
    const response = await api.delete(id ? `${path}/${id}` : path, HEADER_REQUEST)
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}
