import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import PageShell from '../components/PageShell'
import { getPage } from '../lib/api'
import { useFetch } from '../hooks/useFetch'
import { markdownComponents } from '../lib/markdownComponents'

export default function Homelab() {
  const { data: page, loading, error } = useFetch(() => getPage('homelab'), [])
  return (
    <PageShell loading={loading} error={error && 'Failed to load page.'} wide>
      <h1 className="page-title">{page?.title ?? 'Homelab'}</h1>
      {page?.description && <p className="page-subtitle">{page.description}</p>}
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {page?.content}
      </ReactMarkdown>
    </PageShell>
  )
}
