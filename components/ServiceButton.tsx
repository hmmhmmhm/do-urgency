import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'
import style from './ServiceButton.scss'
import {
  faQuestion,
  faCloudDownload,
  faClose
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface IServiceButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  iconType?: 'info' | 'download' | 'close'
}

const ServiceButton = (props: IServiceButtonProps) => {
  const { className, iconType, ...rest } = props
  return (
    <>
      <button
        className={classNames('serviceButton', className, iconType)}
        title={`${iconType} button`}
        {...rest}
      >
        {iconType === 'info' && (
          <FontAwesomeIcon icon={faQuestion} className="serviceButton__icon" />
        )}
        {iconType === 'download' && (
          <FontAwesomeIcon
            icon={faCloudDownload}
            className="serviceButton__icon"
          />
        )}
        {iconType === 'close' && (
          <FontAwesomeIcon icon={faClose} className="serviceButton__icon" />
        )}
      </button>
      <style jsx>{style}</style>
    </>
  )
}

export default ServiceButton
