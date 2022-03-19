import InfoButton from 'components/InfoButton'
import UploadButton from 'components/UploadButton'
import type { NextPage } from 'next'
import style from './index.scss'

const Home: NextPage = () => {
  return (
    <>
      <main className="indexPage">
        <UploadButton label="업로드 할 이미지를<br>선택해주세요." />

        <InfoButton iconType="info" className="indexPage__infoButton" />
      </main>

      <style jsx>{style}</style>
    </>
  )
}

export default Home
