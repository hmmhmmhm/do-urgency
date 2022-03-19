import { demo } from 'frontbook-react'

export default demo({
  w: 6,
  h: 12,
  controls: {
    imageUrl: {
      type: 'string',
      defaultValue:
        'https://images.unsplash.com/photo-1570989086575-503363bb091b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80'
    }
  },
  renderProps: (props) => {
    return { ...props }
  }
})
