import { useCallback, useMemo, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import PageShell from '../components/PageShell'
import { getPost } from '../lib/api'
import { useFetch } from '../hooks/useFetch'
import { makeMarkdownComponents } from '../lib/markdownComponents'
import { formatDate } from '../lib/dateFormat'

function countMermaidBlocks(content) {
  return (content?.match(/^```mermaid$/gm) ?? []).length
}

export default function BlogPost() {
  const { slug } = useParams()
  const { data: post, loading, error } = useFetch(() => getPost(slug), [slug])
  const readyCount = useRef(0)
  const [mermaidDone, setMermaidDone] = useState(false)

  const mermaidTotal = useMemo(() => countMermaidBlocks(post?.content), [post?.content])

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
    <PageShell wide loading={isLoading} error={(error || (!loading && !post)) && 'Post not found.'}>
      <h1 className="page-title">{post?.title}</h1>
      <div className="post-meta">
        <span>{formatDate(post?.date)}</span>
        {post?.tags?.length > 0 && (
          <span className="post-tags">
            {post.tags.map(tag => (
              <Link key={tag} to={`/tags/${tag}`}>{tag}</Link>
            ))}
          </span>
        )}
      </div>
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {post?.content}
        </ReactMarkdown>
      </div>
    </PageShell>
  )
}
