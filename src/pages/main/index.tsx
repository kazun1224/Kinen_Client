import { Button } from '@mantine/core'
import axios from 'axios'
import { CustomNextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { Layout } from 'src/layouts'
import { useQueryClient } from '@tanstack/react-query'

const Main: CustomNextPage = () => {
  const router = useRouter()

  const logout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
    router.push('/')
  }

  return (
    <div>
      <ProgressCard />
      <CigaretteItem />

      <Button onClick={logout}>logout</Button>
    </div>
  )
}

Main.getLayout = (page) => <Layout>{page}</Layout>
export default Main

import { Text, Progress, Card } from '@mantine/core'
export function ProgressCard() {
  return (
    <Card
      withBorder
      radius="md"
      p="xl"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      })}
    >
      <Text size="xs" transform="uppercase" weight={700} color="dimmed">
        Monthly goal
      </Text>
      <Text size="lg" weight={500}>
        $5.431 / $10.000
      </Text>
      <Progress value={54.31} mt="md" size="lg" radius="xl" />
    </Card>
  )
}

import { Paper } from '@mantine/core'
import { useQueryCigarettes } from 'src/hooks/useQueryCigarettes'

function CigaretteItem() {
  const { data: cigarettes, status } = useQueryCigarettes()
  // console.log(cigarettes);

  if (status === 'loading') {
    return <Text>Loading...</Text>
  }

  if (status === 'error') {
    return <Text>データの取得に失敗しました。</Text>
  }

  return (
    <>
      {cigarettes.map((cigarette) => {
        return (
          <Paper shadow="md" p="md" withBorder key={cigarette.id}>
            <Text>{cigarette.name}</Text>
            <Text>{cigarette.amount}</Text>
          </Paper>
        )
      })}
    </>
  )
}
