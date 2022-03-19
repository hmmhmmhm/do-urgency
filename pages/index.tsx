import InfoButton from 'components/InfoButton'
import PrefetchLink from 'components/next/PrefetchLink'
import RadialBlurImageEdit from 'components/RadialBlurImageEdit'
import UploadButton from 'components/UploadButton'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { createFileInput } from 'utils/virtualFileInput'
import style from './index.scss'

const Home: NextPage = () => {
  const [imageUrl, setImageUrl] = useState(null as string | null)
  const [fileInput, setFileInput] = useState(
    null as null | ReturnType<typeof initiateFileInput>
  )

  const initiateFileInput = () => {
    return createFileInput({
      multiple: false,
      accept: 'image/*'
    })
  }

  useEffect(() => {
    const fileInputInstance = initiateFileInput()
    setFileInput(fileInputInstance)
    fileInputInstance.onChange((files) => {
      if (!files) return
      setImageUrl(files[0].thumbnail as string)
      fileInputInstance.reset()
    })
  }, [])

  return (
    <>
      <main className="indexPage">
        <UploadButton
          label="업로드 할 이미지를<br>선택해주세요."
          onClick={() => fileInput?.open()}
        />

        <PrefetchLink href={'https://github.com/hmmhmmhm/do-urgency'} />
        <InfoButton className="indexPage__infoButton" />

        {imageUrl && imageUrl.length > 0 && (
          <RadialBlurImageEdit
            className="indexPage__edit"
            imageUrl={imageUrl}
            onDownload={() => {
              //
            }}
            onClose={() => {
              setImageUrl(null)
            }}
          />
        )}
      </main>

      <style jsx>{style}</style>
    </>
  )
}

export default Home
