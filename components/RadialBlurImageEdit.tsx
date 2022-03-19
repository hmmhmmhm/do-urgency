import classNames from 'classnames'
import { HTMLAttributes, MouseEvent, useEffect, useRef, useState } from 'react'
import { filter, fragmentShaderCode } from 'utils/radialBlurFilter'
import ImageViewer from './ImageViewer'
import style from './RadialBlurImageEdit.scss'

export interface IRadialBlurImageEditProps
  extends HTMLAttributes<HTMLDivElement> {
  className?: string
  imageUrl: string
  onClose?: () => unknown
  onDownload?: () => unknown
}

const RadialBlurImageEdit = (props: IRadialBlurImageEditProps) => {
  const { className, imageUrl, onClose, onDownload, ...rest } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [filterInstance, setFilterInstance] = useState<ReturnType<
    typeof filter
  > | null>(null)

  useEffect(() => {
    const radialBlurFilter = filter({
      url: imageUrl,
      canvasElement: canvasRef.current!,
      fragCode: fragmentShaderCode
    })

    setFilterInstance(radialBlurFilter)
  }, [])

  const changeCenter = (event: MouseEvent) => {
    if (!filterInstance) return
    const c = filterInstance.canvas
    const z = (window.getComputedStyle(c) as any).zoom
    const d = document.documentElement
    const x = (event.clientX + d.scrollLeft - c.offsetLeft * z) / c.width / z
    const y = (event.clientY + d.scrollTop - c.offsetTop * z) / c.height / z
    filterInstance.uniform('2f', 'mouse', x, y).apply()
  }

  return (
    <>
      <div className={classNames('radialBlurImageEdit', className)} {...rest}>
        <ImageViewer
          onClose={onClose}
          onDownload={onDownload}
          onClick={(event) => changeCenter(event)}
        >
          <canvas ref={canvasRef} onClick={(event) => changeCenter(event)} />
        </ImageViewer>

        <div className="radialBlurImageEdit__tip tip1">
          <p>화면을 터치하여 효과 방향을 변경할 수 있습니다.</p>
        </div>
        <div className="radialBlurImageEdit__tip tip2">
          <p>사진을 드래그해서 옮기고 확대할 수 있습니다.</p>
        </div>
      </div>
      <style jsx>{style}</style>
    </>
  )
}

export default RadialBlurImageEdit
