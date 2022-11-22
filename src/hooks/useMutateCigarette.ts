import { Cigarette } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import useCigaretteState from 'src/state/cigaretteState'
import { EditedCigarette } from 'src/types'

export const useMutateCigarette = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const reset = useCigaretteState((state) => state.resetEditedCigarette)

  const createCigaretteMutation = useMutation(
    async (cigarette: Omit<EditedCigarette, 'id'>) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cigarette`,
        cigarette
      )
      return res.data
    },
    {
      onSuccess: (res) => {
        const previousCigarette = queryClient.getQueryData<Cigarette[]>([
          'cigarettes',
        ])
        if (previousCigarette) {
          queryClient.setQueryData(['cigarettes'], [res, ...previousCigarette])
        }
        reset()
      },
      onError: (err: any) => {
        reset()
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      },
    }
  )

  const updateCigaretteMutation = useMutation(
    async (cigarette: EditedCigarette) => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/cigarette/${cigarette.id}`,
        cigarette
      )
      return res.data
    },
    {
      onSuccess: (res) => {
        const previousCigarette = queryClient.getQueryData<Cigarette[]>([
          'cigarettes',
        ])
        if (previousCigarette) {
          queryClient.setQueryData(
            ['cigarettes'],
            previousCigarette.map((cigarette) =>
              cigarette.id === res.id ? res : cigarette
            )
          )
        }
        reset()
      },
      onError: (err: any) => {
        reset()
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      },
    }
  )

  const deleteCigaretteMutation = useMutation(
    async (id: number) => {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/cigarette/${id}`)
    },
    {
      onSuccess: (_, variables) => {
        const previousCigarettes = queryClient.getQueryData<Cigarette[]>([
          'cigarettes',
        ])
        if (previousCigarettes) {
          queryClient.setQueryData(
            ['cigarettes'],
            previousCigarettes.filter((cigarette) => cigarette.id !== variables)
          )
        }
        reset()
      },
      onError: (err: any) => {
        reset()
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      },
    }
  )

  return {
    createCigaretteMutation,
    updateCigaretteMutation,
    deleteCigaretteMutation,
  }
}
