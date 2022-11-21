import 'src/styles/globals.css'
import type { AppProps, CustomAppPage } from 'next/app'
import { useEffect } from 'react'
import { MantineProvider } from '@mantine/core'
import { useLoading } from '../hooks/useLoading'
import axios from 'axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const MyApp: CustomAppPage = ({ Component, pageProps }) => {
  const { pageLoading, loadingComponent } = useLoading()
  const getLayout = Component.getLayout ?? ((page) => page)

  axios.defaults.withCredentials = true

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
      )
      axios.defaults.headers.common['csrf-token'] = data.csrfToken
    }
    getCsrfToken()
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
          fontFamily: 'Verdana, sans-serif',
        }}
      >
        {pageLoading
          ? loadingComponent
          : getLayout(<Component {...pageProps} />)}
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default MyApp
