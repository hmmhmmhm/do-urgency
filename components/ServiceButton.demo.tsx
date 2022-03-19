import { demo } from 'frontbook-react'

export default demo({
  controls: {
    iconType: {
      type: 'select',
      defaultValue: {
        defaultValue: 'download',
        selectableValues: ['info', 'download', 'close']
      }
    }
  },
  renderProps: (props) => {
    return { ...props }
  }
})
