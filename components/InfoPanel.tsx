import classNames from 'classnames'
import globalStyle from './InfoPanel.global.scss'
import { CupertinoPane } from 'cupertino-pane'
import { useEffect, useRef } from 'react'

export interface IInfoPanelProps {
  className?: string
  show?: boolean
  onDidDismiss?: () => unknown
}

const InfoPanel = (props: IInfoPanelProps) => {
  const { className, onDidDismiss } = props

  const drawerRef = useRef<CupertinoPane>()
  const panelRef = useRef<HTMLDivElement>(null)

  const createPanel = () => {
    if (!panelRef.current) return

    drawerRef.current = new CupertinoPane(panelRef.current, {
      parentElement: 'body',
      initialBreak: 'top',
      breaks: {
        top: { enabled: true, height: 370 },
        middle: { enabled: false },
        bottom: { enabled: false }
      },
      backdrop: true,
      backdropOpacity: 0.4,
      topperOverflow: false,
      buttonClose: true,
      bottomOffset: 8,
      onBackdropTap: () => drawerRef.current?.destroy({ animate: true }),
      onDidDismiss: () => onDidDismiss?.()
    })
    drawerRef.current?.present({ animate: true })
  }

  useEffect(() => {
    createPanel()
  }, [])

  return (
    <>
      <div ref={panelRef} style={{ display: 'none' }}>
        <div className={classNames('infoPanel', className)}>
          <div className="picture"></div>
          <div className="content">
            <div className="info">
              <div className="left-side">
                <h1>긴박한 이미지 생성기</h1>
                <p>
                  이미지를 첨부하면 해당 이미지를
                  <br />
                  순식간에 긴박하게 만들어드립니다.
                </p>
              </div>
              <div className="right-side"></div>
            </div>

            <a href="https://github.com/hmmhmmhm/do-urgency" target={'_blank'}>
              <div className="description">
                <div className="powered">
                  <div className="icon">
                    <img
                      src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                      alt="nike-app"
                    />
                  </div>
                  <div className="title">
                    <div className="by">Made by</div>
                    <div className="name">hmmhmmhm</div>
                  </div>
                </div>
                <div className="store">Github</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <style jsx global>
        {globalStyle}
      </style>
    </>
  )
}

export default InfoPanel
