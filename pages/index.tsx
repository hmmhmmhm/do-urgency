import InfoButton from 'components/InfoButton'
import PrefetchLink from 'components/next/PrefetchLink'
import UploadButton from 'components/UploadButton'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import style from './index.scss'

const Home: NextPage = () => {
  const router = useRouter()

  return (
    <>
      <main className="indexPage">
        <UploadButton label="업로드 할 이미지를<br>선택해주세요." />

        <PrefetchLink href={'https://github.com/hmmhmmhm/do-urgency'} />
        <InfoButton className="indexPage__infoButton" />
      </main>

      <style jsx>{style}</style>
    </>
  )
}

export default Home
