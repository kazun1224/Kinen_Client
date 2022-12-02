import { Total } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

export const useQueryTotal = () => {
  const router = useRouter()

  const getTotal = async () => {
    const { data } = await axios.get<Total>(`${process.env.NEXT_PUBLIC_API_URL}/total`)
    return data
  }

  return useQuery<Total>({
    queryKey: ['total'],
    queryFn: getTotal,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/')
      }
    },
  })
}
