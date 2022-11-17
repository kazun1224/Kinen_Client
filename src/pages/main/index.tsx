import { Button } from '@mantine/core'
import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'

const Main = () => {
  const router = useRouter();
  const logout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
    router.push('/')
  }

  return (
    <div><Button onClick={logout}>logout</Button></div>
  )
}

export default Main
