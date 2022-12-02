import { CustomNextPage } from 'next'
import React from 'react'
import { useQueryUser } from 'src/hooks/useQueryUser'
import { Layout } from 'src/layouts'

const User: CustomNextPage = () => {
  const { data: user, status } = useQueryUser()
  console.log(user)

  return (
    <div>
      <h1>User Description</h1>
      <h2>{user?.nickName}</h2>
      <p>{user?.email}</p>
    </div>
  )
}

User.getLayout = (page) => <Layout>{page}</Layout>
export default User
