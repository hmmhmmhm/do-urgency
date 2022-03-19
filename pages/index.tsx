import InfoButton from 'components/InfoButton'
import PrefetchLink from 'components/next/PrefetchLink'
import RadialBlurImageEdit from 'components/RadialBlurImageEdit'
import UploadButton from 'components/UploadButton'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useEffect, useState } from 'react'
import JsFileDownloader from 'js-file-downloader'
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
      <NextSeo
        title="긴박한 이미지 생성기"
        description="이미지를 첨부하면 해당 이미지를 순식간에 긴박하게 만들어드립니다."
        openGraph={{
          type: 'website',
          locale: 'ko_KR',
          site_name:
            '긴박한 이미지 생성기, 이미지를 순식 간에 긴박하게 만들어줍니다',
          images: [
            {
              url: `https://i.imgur.com/tm4X9ls.png`,

              width: 1200,
              height: 630,
              alt: '긴박한 이미지 생성기, 이미지를 순식 간에 긴박하게 만들어줍니다',
              type: 'image/png'
            }
          ]
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico'
          }
        ]}
      />
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
            onDownload={(canvasElement) => {
              new JsFileDownloader({
                url: canvasElement.toDataURL(),
                filename: 'image.png'
              })
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
