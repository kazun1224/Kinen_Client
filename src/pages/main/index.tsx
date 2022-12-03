import { CustomNextPage } from 'next'
import { useRouter } from 'next/router'
import React, { ComponentProps, useEffect, useState } from 'react'
import { Layout } from 'src/layouts'

const Main: CustomNextPage = () => {
  const router = useRouter()

  return (
    <div>
      <ProgressCard />
      <CigaretteItem />
    </div>
  )
}

Main.getLayout = (page) => <Layout>{page}</Layout>
export default Main

import { Text, Progress, Card, Skeleton, Button } from '@mantine/core'
export const ProgressCard = () => {
  const { data: total, status } = useQueryTotal()
  // console.log(total)

  if (status === 'loading') {
    return (
      <div className="py-20">
        <Skeleton visible={true}>
          <Card
            withBorder
            radius="md"
            p="xl"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            })}
          >
          </Card>
        </Skeleton>
      </div>
    )
  }

  if (status === 'error') {
    return <Text>データの取得に失敗しました。</Text>
  }
  return (
    <div className="py-20">
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
            今までに使用した金額
          </Text>
          <Text size="lg" weight={500}>
            {total?.totalAmount}円
          </Text>
          <Progress
            value={Number(total?.totalAmount)}
            mt="md"
            size="lg"
            radius="xl"
          />
        </Card>
    </div>
  )
}

import { Paper } from '@mantine/core'
import { useQueryCigarettes } from 'src/hooks/useQueryCigarettes'
import Link from 'next/link'
import { error, log } from 'console'
import { useQueryTotal } from 'src/hooks/useQueryTotal'
import { useMutateTotal } from 'src/hooks/useMutateTotal'

export const CigaretteItem = () => {
  const { data: cigarettes, status } = useQueryCigarettes()
  // console.log(cigarettes);
  const {updateTotalMutation}=useMutateTotal()

  const calcCigarette:ComponentProps<"form">["onSubmit"] = (e):void => {
    e.preventDefault()
    const cigaretteId= e.currentTarget.cigaretteId.value
    updateTotalMutation.mutate(cigaretteId
    )
  }

  if (status === 'loading') {
    return <Text>Loading...</Text>
  }

  if (status === 'error') {
    return <Text>データの取得に失敗しました。</Text>
  }

  return (
    <div className="p-5">
      {cigarettes.map((cigarette) => {
        return (
          <div  key={cigarette.id}>
          <Link
            href={`/cigarette/${cigarette.id}`}

            className="mb-10  block last:mb-0"
          >
            <Paper withBorder className="p-5 ">
              <Text>{cigarette.name}</Text>
              <Text>{cigarette.amount}</Text>
            </Paper>
          </Link>
          <form onSubmit={calcCigarette}>

            <button name="cigaretteId" value={cigarette.id}>一箱</button>
          </form>
          </div>
        )
      })}
    </div>
  )
}
