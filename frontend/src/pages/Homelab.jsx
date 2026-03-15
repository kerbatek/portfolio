import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { getPage } from '../lib/api'
import { useFetch } from '../hooks/useFetch'
import { markdownComponents } from '../lib/markdownComponents'

export default function Homelab() {
  const { data: page, loading, error } = useFetch(() => getPage('homelab'), [])

  if (loading) return (
    <div className="container container--wide">
      <Nav />
      <p className="page-subtitle">Loading...</p>
      <Footer />
    </div>
  )

  if (error) return (
    <div className="container container--wide">
      <Nav />
      <p className="page-subtitle">Failed to load page.</p>
      <Footer />
    </div>
  )

  return (
    <div className="container container--wide">
      <Nav />
      <h1 className="page-title">{page.title ?? 'Homelab'}</h1>
      {page.description && <p className="page-subtitle">{page.description}</p>}
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {page.content}
      </ReactMarkdown>
      <Footer />
    </div>
  )
}
