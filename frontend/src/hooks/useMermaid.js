import { useCallback, useMemo, useRef, useState } from 'react'
import { makeMarkdownComponents } from '../lib/markdownComponents'

function countMermaidBlocks(content) {
  return (content?.match(/^```mermaid$/gm) ?? []).length
}

export function useMermaid(content) {
  const readyCount = useRef(0)
  const [mermaidDone, setMermaidDone] = useState(false)
  const mermaidTotal = useMemo(() => countMermaidBlocks(content), [content])

  const onMermaidReady = useCallback(() => {
    readyCount.current += 1
    if (readyCount.current >= mermaidTotal) setMermaidDone(true)
  }, [mermaidTotal])

  const markdownComponents = useMemo(
    () => makeMarkdownComponents(onMermaidReady),
    [onMermaidReady]
  )

  return { mermaidLoading: mermaidTotal > 0 && !mermaidDone, markdownComponents }
}
