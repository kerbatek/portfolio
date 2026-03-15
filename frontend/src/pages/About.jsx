import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { getPage } from '../lib/api'
import { useFetch } from '../hooks/useFetch'

export default function About() {
  const { data: page, loading, error } = useFetch(() => getPage('about'), [])

  if (loading) return (
    <div className="container">
      <Nav />
      <p className="page-subtitle">Loading...</p>
      <Footer />
    </div>
  )

  if (error) return (
    <div className="container">
      <Nav />
      <p className="page-subtitle">Failed to load page.</p>
      <Footer />
    </div>
  )

  return (
    <div className="container">
      <Nav />
      <h1 className="page-title">{page.title ?? 'About'}</h1>
      {page.description && <p className="page-subtitle">{page.description}</p>}
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
        {page.content}
      </ReactMarkdown>
      <Footer />
    </div>
  )
}
