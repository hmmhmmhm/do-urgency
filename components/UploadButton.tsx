import classNames from 'classnames'
import style from './UploadButton.scss'
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonHTMLAttributes } from 'react'

export interface IUploadButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  label?: string
}

const UploadButton = (props: IUploadButtonProps) => {
  const { className, label, ...rest } = props
  return (
    <>
      <button
        className={classNames('uploadButton', className)}
        title={label?.split('<br>').join('')}
        {...rest}
      >
        <FontAwesomeIcon icon={faFileArrowUp} className="uploadButton__icon" />
        <span className="uploadButton__text">
          {label
            ? label.split('<br>').map((line, index) => {
                return <p key={index}>{line}</p>
              })
            : 'Upload'}
        </span>
      </button>

      <style jsx>{style}</style>
    </>
  )
}

export default UploadButton
