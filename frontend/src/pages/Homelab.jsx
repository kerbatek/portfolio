import { parseFrontmatter } from '../lib/frontmatter'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { markdownComponents } from '../lib/markdownComponents'

const raw = Object.values(
  import.meta.glob('../content/homelab.md', { query: '?raw', import: 'default', eager: true })
)[0] ?? ''
const { data, content } = parseFrontmatter(raw)

export default function Homelab() {
  return (
    <div className="container container--wide">
      <Nav />
      <h1 className="page-title">{data.title ?? 'Homelab'}</h1>
      {data.description && <p className="page-subtitle">{data.description}</p>}
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
      <Footer />
    </div>
  )
}
