import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Loading } from 'src/components/Loading'

export const useLoading = () => {
  // loadingのロジック
  const router = useRouter()
  const [pageLoading, setPageLoading] = useState(false)

  useEffect(() => {
    const handleStart = (url: any) =>
      url !== router.asPath && setPageLoading(true)
    const handleComplete = () => setPageLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  const loadingComponent = <Loading />
  return { pageLoading, loadingComponent }
}
