import { CustomNextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import { Layout } from 'src/layouts';

const Create:CustomNextPage = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Create</h1>
    </div>
  )
}

Create.getLayout = (page) => <Layout>{page}</Layout>

export default Create

