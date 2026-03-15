import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({ startOnLoad: false, theme: 'neutral' })

export default function MermaidBlock({ children }) {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      mermaid.run({ nodes: [ref.current] })
    }
  }, [children])

  return (
    <pre className="mermaid" ref={ref}>
      {children}
    </pre>
  )
}
