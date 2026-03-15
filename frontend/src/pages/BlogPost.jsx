import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { getPost } from '../lib/api'
import { useFetch } from '../hooks/useFetch'
import { markdownComponents } from '../lib/markdownComponents'
import { formatDate } from '../lib/dateFormat'

export default function BlogPost() {
  const { slug } = useParams()
  const { data: post, loading, error } = useFetch(() => getPost(slug), [slug])

  if (loading) return (
    <div className="container">
      <Nav />
      <p className="page-subtitle">Loading...</p>
      <Footer />
    </div>
  )

  if (error || !post) return (
    <div className="container">
      <Nav />
      <p className="page-subtitle">Post not found.</p>
      <Footer />
    </div>
  )

  return (
    <div className="container">
      <Nav />
      <h1 className="page-title">{post.title}</h1>
      <div className="post-meta">
        <span>{formatDate(post.date)}</span>
        {post.tags?.length > 0 && (
          <span className="post-tags">
            {post.tags.map(tag => (
              <Link key={tag} to={`/tags/${tag}`}>{tag}</Link>
            ))}
          </span>
        )}
      </div>
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {post.content}
        </ReactMarkdown>
      </div>
      <Footer />
    </div>
  )
}
