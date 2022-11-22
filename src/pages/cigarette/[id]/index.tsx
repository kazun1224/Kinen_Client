import { Text } from '@mantine/core'
import { Cigarette } from '@prisma/client'
import { CustomNextPage } from 'next'
import { useRouter } from 'next/router'
import { useQueryCigaretteById } from 'src/hooks/useQueryCigarettes'
import { useQueryUser } from 'src/hooks/useQueryUser'
import { Layout } from 'src/layouts'

const CigaretteForm: CustomNextPage = () => {
  const router = useRouter()

  const { data: cigarette, status } = useQueryCigaretteById(router.query.id)

  if (status === 'loading') {
    return <Text>Loading...</Text>
  }

  if (status === 'error') {
    return <Text>データの取得に失敗しました。</Text>
  }

  return <div>{cigarette.name}</div>
}

CigaretteForm.getLayout = (page) => <Layout>{page}</Layout>
export default CigaretteForm
