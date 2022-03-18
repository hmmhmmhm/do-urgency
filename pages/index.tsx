import UploadButton from 'components/UploadButton'
import type { NextPage } from 'next'
import style from './index.scss'

const Home: NextPage = () => {
  return (
    <>
      <main className="indexPage">
        <UploadButton label="업로드 할 이미지를<br>선택해주세요." />
      </main>

      <style jsx>{style}</style>
    </>
  )
}

export default Home
