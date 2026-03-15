import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import PageShell from '../components/PageShell'
import { getPage } from '../lib/api'
import { useFetch } from '../hooks/useFetch'

export default function About() {
  const { data: page, loading, error } = useFetch(() => getPage('about'), [])
  return (
    <PageShell wide loading={loading} error={error && 'Failed to load page.'}>
      <h1 className="page-title">{page?.title ?? 'About'}</h1>
      {page?.description && <p className="page-subtitle">{page.description}</p>}
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{page?.content}</ReactMarkdown>
    </PageShell>
  )
}
