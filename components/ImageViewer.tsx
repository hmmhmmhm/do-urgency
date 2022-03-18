import classNames from 'classnames'
import style from './ImageViewer.scss'
import { useSpring, animated, AnimatedComponent } from '@react-spring/web'
import { createUseGesture, dragAction, pinchAction } from '@use-gesture/react'
import { useEffect, useRef } from 'react'

const useGesture = createUseGesture([dragAction, pinchAction])

export interface IImageViewerProps {
  className?: string
  imageUrl?: string
}

const ImageViewer = (props: IImageViewerProps) => {
  const { imageUrl } = props

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

  useGesture(
    {
      onDrag: ({ pinching, cancel, offset: [x, y], ...rest }) => {
        if (pinching) return cancel()
        api.start({ x, y })
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
        return memo
      }
    },
    {
      target: ref,
      drag: { from: () => [springStyle.x.get(), springStyle.y.get()] },
      pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true }
    }
  )

  return (
    <>
      <div className={classNames('imageViewer', props.className)}>
        <animated.div ref={ref} style={springStyle}>
          <img
            src={imageUrl}
            alt="rendered image"
            onDragStart={(event) => event.preventDefault()}
          />
        </animated.div>
      </div>

      <style jsx>{style}</style>
    </>
  )
}

export default ImageViewer
