declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void
  }
}

export const pageview = (url: string) => {
  if (!process.env.NEXT_PUBLIC_GOOGLE_ANALYTIC || !window.gtag) return
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!, {
    page_path: url
  })
}

// log specific events happening.
export const event = ({
  action,
  params
}: {
  action: string
  params: Record<string, string>
}) => {
  window.gtag('event', action, params)
}
