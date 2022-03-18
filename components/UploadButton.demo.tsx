import { demo } from 'frontbook-react'

export default demo({
  w: 6,
  h: 12,
  controls: {
    className: {
      type: 'string',
      defaultValue: ''
    },
    label: {
      type: 'string',
      defaultValue: '업로드 할 이미지를<br>선택해주세요.'
    }
  },
  renderProps: (props) => {
    return { ...props }
  }
})
