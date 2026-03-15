import { parseFrontmatter } from '../lib/frontmatter'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const raw = Object.values(
  import.meta.glob('../content/about.md', { query: '?raw', import: 'default', eager: true })
)[0] ?? ''
const { data, content } = parseFrontmatter(raw)

export default function About() {
  return (
    <div className="container">
      <Nav />
      <h1 className="page-title">{data.title ?? 'About'}</h1>
      {data.description && <p className="page-subtitle">{data.description}</p>}
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
      <Footer />
    </div>
  )
}
