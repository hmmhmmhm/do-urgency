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

  const [offset, setOffset] = useState({ x: 0, y: 0, zoom: 1 })

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
    const canvas = filterInstance.canvas
    const bounds = canvas.getBoundingClientRect()
    const actualX = event.pageX - bounds.left
    const actualY = event.pageY - bounds.top
    const x = actualX / (canvas.width * offset.zoom)
    const y = actualY / (canvas.height * offset.zoom)
    filterInstance.uniform('2f', 'mouse', x, y).apply()
  }

  return (
    <>
      <div className={classNames('radialBlurImageEdit', className)} {...rest}>
        <ImageViewer
          onClose={onClose}
          onDownload={onDownload}
          onClick={(event) => {
            event.stopPropagation()
            changeCenter(event)
          }}
          onChangePosition={({ x, y, zoom }) => setOffset({ x, y, zoom })}
        >
          <canvas
            ref={canvasRef}
            onClick={(event) => {
              event.stopPropagation()
              changeCenter(event)
            }}
          />
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
