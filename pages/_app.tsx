import type { AppProps } from 'next/app'
import tailwindStyle from './_app.scss'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { pageview } from 'utils/googleAnalytics'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => pageview(url)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, minimal-ui, width=device-width, viewport-fit=cover"
        />
        <meta
          name="naver-site-verification"
          content="880d54d70f5931580d52103c45da00329ee3d31b"
        />
      </Head>

      <style jsx global>
        {tailwindStyle}
      </style>

      <Component {...pageProps} />
    </>
  )
}

export default App
