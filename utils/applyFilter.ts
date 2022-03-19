import { filter, fragmentShaderCode } from './radialBlurFilter'

export const filterInstance = filter({
  url: 'https://webgl2fundamentals.org/webgl/resources/images/computer-history-museum/pos-z.jpg',
  fragCode: fragmentShaderCode
})

const changeCenter = (e: TouchEvent & MouseEvent) => {
  const event = e.touches ? e.touches[0] : e
  const c = filterInstance.canvas
  const z = (window.getComputedStyle(c) as any).zoom
  const d = document.documentElement
  const x = (event.clientX + d.scrollLeft - c.offsetLeft * z) / c.width / z
  const y = (event.clientY + d.scrollTop - c.offsetTop * z) / c.height / z
  filterInstance.uniform('2f', 'mouse', x, y).apply()
}

const applyEffect = (() => {
  let power = 0
  let targ = 0
  let started = 0

  const animate = () => {
    const dt = new Date().getTime() - started
    power += dt * 1e-6 * (targ === 0 ? -1 : 1)
    power = Math[targ === 0 ? 'max' : 'min'](power, targ)
    filterInstance.uniform('1f', 'power', power).apply()
    Math.abs(power - targ) > 1e-7 && requestAnimationFrame(animate)
  }

  return (pow: number) => {
    targ = pow
    started = new Date().getTime()
    requestAnimationFrame(animate)
  }
})()

filterInstance.ready = () => {
  let c = filterInstance.canvas
  document.body.append(c)
  let z = (window.getComputedStyle(c) as any).zoom
  changeCenter({
    clientX: (c.width / 2) * z,
    clientY: (c.height / 2) * z
  } as TouchEvent & MouseEvent)
  applyEffect(0)

  filterInstance.apply()

  window.addEventListener('mousemove', (e) =>
    changeCenter(e as TouchEvent & MouseEvent)
  )
  window.addEventListener('touchmove', (e) =>
    changeCenter(e as TouchEvent & MouseEvent)
  )
}
