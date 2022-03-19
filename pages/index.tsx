import InfoButton from 'components/InfoButton'
import PrefetchLink from 'components/next/PrefetchLink'
import UploadButton from 'components/UploadButton'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { createFileInput } from 'utils/virtualFileInput'
import style from './index.scss'

const Home: NextPage = () => {
  const [fileInput] = useState(
    createFileInput({
      multiple: false,
      accept: 'image/*'
    })
  )

  useEffect(() => {
    fileInput.onChange((files) => {
      if (!files) return
      for (const file of files) {
        const dataUri = file.thumbnail
      }
    })
  }, [])

  return (
    <>
      <main className="indexPage">
        <UploadButton
          label="업로드 할 이미지를<br>선택해주세요."
          onClick={() => fileInput.open()}
        />

        <PrefetchLink href={'https://github.com/hmmhmmhm/do-urgency'} />
        <InfoButton className="indexPage__infoButton" />
      </main>

      <style jsx>{style}</style>
    </>
  )
}

export default Home
