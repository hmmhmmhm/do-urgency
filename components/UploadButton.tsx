import classNames from 'classnames'
import style from './UploadButton.scss'

export interface IUploadButtonProps {
  className?: string
}

const UploadButton = (props: IUploadButtonProps) => {
  return (
    <>
      <div className={classNames('uploadButton', props.className)}>
        {/* TODO */}
      </div>
      <style jsx>{style}</style>
    </>
  )
}

export default UploadButton
