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
import { preloadImage } from 'utils/prefetch'
import isMobile from 'is-mobile'

const Home: NextPage = () => {
  const [imageUrl, setImageUrl] = useState(null as string | null)
  const [fileInput, setFileInput] = useState(
    null as null | ReturnType<typeof initiateFileInput>
  )

  const [isKakaoBrower, setKakaoBrower] = useState(false)
  useEffect(() => {
    const isKakao = navigator.userAgent.match('KAKAOTALK')
    setKakaoBrower(Boolean(isKakao))
  }, [])

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

  useEffect(() => {
    // Fixing iOS vh issues
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    // Fixing iOS prefetch image issue
    preloadImage('https://i.imgur.com/FT8r0pM.png')
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

        <PrefetchLink href="https://github.com/hmmhmmhm/do-urgency" />
        <InfoButton className="indexPage__infoButton" />

        {imageUrl && imageUrl.length > 0 && (
          <RadialBlurImageEdit
            className="indexPage__edit"
            imageUrl={imageUrl}
            onDownload={async (canvasElement) => {
              if (isKakaoBrower) {
                alert(
                  '카카오 인앱 브라우저에선 이미지를 꾹 눌러서 나오는 패널에서 다운로드 받아주세요.'
                )
                return
              }

              if (isMobile()) {
                alert(
                  '모바일 브라우저에선 이미지를 꾹 눌러서 나오는 패널에서 다운로드 받아야 사진첩에 보관이 가능합니다.'
                )
              }

              await new JsFileDownloader({
                url: canvasElement.toDataURL(),
                filename: 'image.png',
                forceDesktopMode: true,
                nativeFallbackOnError: true,
                contentType: 'image/png'
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
