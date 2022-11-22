import { Cigarette } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { NextRouter, useRouter } from 'next/router'

export const useQueryCigarettes = () => {
  const router = useRouter()
  const getCigarettes = async () => {
    const { data } = await axios.get<Cigarette[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/cigarette`
    )
    return data
  }
  return useQuery<Cigarette[]>({
    queryKey: ['cigarettes'],
    queryFn: getCigarettes,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push('/')
    },
  })
}

export const useQueryCigaretteById = ( cigaretteId:any) => {


  const router = useRouter()

  const getCigarette = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/cigarette/${cigaretteId}`
    )
    return data
  }
  return useQuery<Cigarette>({
    queryKey: ['cigarettes', cigaretteId],
    queryFn: getCigarette,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push('/main')
    },
  })
}
