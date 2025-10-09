import { useApi } from './useApi'

export const useHomePage = () => {
  const { get } = useApi()

  const fetchHomeData = async () => {
    try {
      const data = await get('/')
      return data
    } catch (error) {
      console.error('Error fetching home data:', error)
      throw error
    }
  }

  return { fetchHomeData }
}
