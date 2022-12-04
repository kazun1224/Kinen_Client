import { Total } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

export const useMutateTotal = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const updateTotalMutationByCigarette = useMutation(
    async (cigaretteId: number) => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/total/cigarette`,
        { cigaretteId }
      )
      return res.data
    },
    {
      onSuccess: (res) => {
        const previousTotal = queryClient.getQueryData<Total>(['total'])
        if (previousTotal) {
          queryClient.setQueryData(['total'], res)
        }
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      },
    }
  )

  const updateTotalMutationByCarton = useMutation(
    async (cigaretteId: number) => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/total/carton`,
        { cigaretteId }
      )
      return res.data
    },
    {
      onSuccess: (res) => {
        const previousTotal = queryClient.getQueryData<Total>(['total'])
        if (previousTotal) {
          queryClient.setQueryData(['total'], res)
        }
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      },
    }
  )

  return { updateTotalMutationByCigarette, updateTotalMutationByCarton }
}
