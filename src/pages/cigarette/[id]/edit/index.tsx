import { CustomNextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import { Layout } from 'src/layouts';

const Edit:CustomNextPage = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Edit</h1>
    </div>
  )
}

Edit.getLayout = (page) => <Layout>{page}</Layout>

export default Edit

