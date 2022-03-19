import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'
import style from './InfoButton.scss'
import {
  faQuestion,
  faCloudDownload,
  faClose
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface IInfoButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  iconType?: 'info' | 'download' | 'close'
}

const InfoButton = (props: IInfoButtonProps) => {
  const { className, iconType } = props
  return (
    <>
      <button
        className={classNames('infoButton', className, iconType)}
        title={`${iconType} button`}
      >
        {iconType === 'info' && (
          <FontAwesomeIcon icon={faQuestion} className="infoButton__icon" />
        )}
        {iconType === 'download' && (
          <FontAwesomeIcon
            icon={faCloudDownload}
            className="infoButton__icon"
          />
        )}
        {iconType === 'close' && (
          <FontAwesomeIcon icon={faClose} className="infoButton__icon" />
        )}
      </button>
      <style jsx>{style}</style>
    </>
  )
}

export default InfoButton
