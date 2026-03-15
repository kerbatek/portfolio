import { useCallback, useMemo, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import PageShell from '../components/PageShell'
import { getPage } from '../lib/api'
import { useFetch } from '../hooks/useFetch'
import { makeMarkdownComponents } from '../lib/markdownComponents'

function countMermaidBlocks(content) {
  return (content?.match(/^```mermaid$/gm) ?? []).length
}

export default function Homelab() {
  const { data: page, loading, error } = useFetch(() => getPage('homelab'), [])
  const readyCount = useRef(0)
  const [mermaidDone, setMermaidDone] = useState(false)

  const mermaidTotal = useMemo(() => countMermaidBlocks(page?.content), [page?.content])

  const onMermaidReady = useCallback(() => {
    readyCount.current += 1
    if (readyCount.current >= mermaidTotal) setMermaidDone(true)
  }, [mermaidTotal])

  const markdownComponents = useMemo(
    () => makeMarkdownComponents(onMermaidReady),
    [onMermaidReady]
  )

  const isLoading = loading || (mermaidTotal > 0 && !mermaidDone)

  return (
    <PageShell loading={isLoading} error={error && 'Failed to load page.'} wide>
      <h1 className="page-title">{page?.title ?? 'Homelab'}</h1>
      {page?.description && <p className="page-subtitle">{page.description}</p>}
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {page?.content}
      </ReactMarkdown>
    </PageShell>
  )
}
