import { ButtonHTMLAttributes, useState } from 'react'
import InfoPanel from './InfoPanel'
import ServiceButton from './ServiceButton'

const InfoButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { onClick, ...rest } = props
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  return (
    <>
      <ServiceButton
        iconType="info"
        onClick={(event) => {
          setIsPanelOpen(true)
          onClick && onClick(event)
        }}
        {...rest}
      />
      <div>
        {isPanelOpen && (
          <div>
            <InfoPanel onDidDismiss={() => setIsPanelOpen(false)} />
          </div>
        )}
      </div>
    </>
  )
}

export default InfoButton
