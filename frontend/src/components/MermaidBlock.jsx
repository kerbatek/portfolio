import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

let counter = 0

async function renderTheme(source, theme, themeVariables = {}) {
  mermaid.initialize({ startOnLoad: false, theme, themeVariables })
  const id = `mermaid-${++counter}`
  const { svg } = await mermaid.render(id, source)
  return svg
}

export default function MermaidBlock({ children, onReady }) {
  const [light, setLight] = useState('')
  const [dark, setDark] = useState('')
  const [ready, setReady] = useState(false)
  const source = String(children).trim()
  const onReadyRef = useRef(onReady)
  useEffect(() => { onReadyRef.current = onReady })

  useEffect(() => {
    let cancelled = false
    async function renderBoth() {
      const lightSvg = await renderTheme(source, 'neutral', { primaryTextColor: '#ffffff' })
      const darkSvg = await renderTheme(source, 'dark')
      if (!cancelled) {
        setLight(lightSvg)
        setDark(darkSvg)
        setReady(true)
        onReadyRef.current?.()
      }
    }
    renderBoth()
    return () => { cancelled = true }
  }, [source])

  return (
    <div className={`mermaid-diagram${ready ? ' mermaid-ready' : ''}`}>
      <div className="mermaid-light" dangerouslySetInnerHTML={{ __html: light }} />
      <div className="mermaid-dark" dangerouslySetInnerHTML={{ __html: dark }} />
    </div>
  )
}
