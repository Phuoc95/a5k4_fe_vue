import axios from 'axios'

export const useApi = () => {
  const config = import.meta.env
  const baseURL = config.VITE_API_BASE_URL

  const instance = axios.create({
    baseURL,
    timeout: 10000
  })

  const get = async (endpoint: string) => {
    const response = await instance.get(endpoint)
    return response.data
  }

  const post = async (endpoint: string, data: unknown) => {
    const response = await instance.post(endpoint, data)
    return response.data
  }

  return { get, post, put: instance.put, delete: instance.delete }
}
