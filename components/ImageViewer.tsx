import classNames from 'classnames'
import style from './ImageViewer.scss'
import { useSpring, animated, AnimatedComponent } from '@react-spring/web'
import { createUseGesture, dragAction, pinchAction } from '@use-gesture/react'
import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react'
import ServiceButton from './ServiceButton'

const useGesture = createUseGesture([dragAction, pinchAction])

export interface IImageViewerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  imageUrl?: string
  onClose?: () => unknown
  onDownload?: () => unknown
  onChangePosition?: (props: { x: number; y: number; zoom: number }) => unknown
  children?: ReactNode
}

const ImageViewer = (props: IImageViewerProps) => {
  const {
    className,
    imageUrl,
    onClose,
    onDownload,
    children,
    onChangePosition,
    ...rest
  } = props
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [offsetZoom, setOffsetZoom] = useState(1)

  useEffect(() => {
    const handler = (e: Event) => e.preventDefault()
    document.addEventListener('gesturestart', handler)
    document.addEventListener('gesturechange', handler)
    document.addEventListener('gestureend', handler)
    return () => {
      document.removeEventListener('gesturestart', handler)
      document.removeEventListener('gesturechange', handler)
      document.removeEventListener('gestureend', handler)
    }
  }, [])

  const [springStyle, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    rotateZ: 0
  }))

  const ref = useRef<AnimatedComponent<'div'> & HTMLDivElement>(null)

  useEffect(() => {
    if (!onChangePosition) return
    onChangePosition({
      x: offset.x,
      y: offset.y,
      zoom: offsetZoom
    })
  }, [offset, offsetZoom])

  useGesture(
    {
      onDrag: ({ pinching, cancel, offset: [x, y] }) => {
        if (pinching) return cancel()
        api.start({ x, y })
        setOffset({ x, y })
      },
      onPinch: ({
        origin: [ox, oy],
        first,
        movement: [ms],
        offset: [s, a],
        memo
      }) => {
        if (first) {
          const { width, height, x, y } = ref.current?.getBoundingClientRect()!
          const tx = ox - (x + width / 2)
          const ty = oy - (y + height / 2)
          memo = [springStyle.x.get(), springStyle.y.get(), tx, ty]
        }

        const x = memo[0] - (ms - 1) * memo[2]
        const y = memo[1] - (ms - 1) * memo[3]
        api.start({ scale: s, rotateZ: a, x, y })
        setOffset({ x, y })
        setOffsetZoom(s)
        return memo
      }
    },
    {
      target: ref,
      drag: { from: () => [springStyle.x.get(), springStyle.y.get()] },
      pinch: { scaleBounds: { min: 0.05, max: 2 }, rubberband: true }
    }
  )

  return (
    <>
      <div className={classNames('imageViewer', className)} {...rest}>
        <animated.div ref={ref} style={springStyle}>
          {!children && imageUrl && (
            <img
              src={imageUrl}
              alt="rendered image"
              onDragStart={(event) => event.preventDefault()}
            />
          )}

          {children && children}
        </animated.div>

        <ServiceButton
          className="imageViewer__download"
          iconType="download"
          onClick={onDownload}
        />
        <ServiceButton
          className="imageViewer__close"
          iconType="close"
          onClick={onClose}
        />
      </div>

      <style jsx>{style}</style>
    </>
  )
}

export default ImageViewer
