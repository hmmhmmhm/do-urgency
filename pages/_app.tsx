import type { AppProps } from 'next/app'
import tailwindStyle from './_app.scss'
import Head from 'next/head'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, minimal-ui, width=device-width, viewport-fit=cover"
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
