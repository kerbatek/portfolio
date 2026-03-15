import { useParams, Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { getPosts } from '../lib/api'
import { useFetch } from '../hooks/useFetch'
import { formatDate } from '../lib/dateFormat'

export default function TagDetail() {
  const { tag } = useParams()
  const { data: posts, loading, error } = useFetch(getPosts, [])

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
      <p className="page-subtitle">Failed to load posts.</p>
      <Footer />
    </div>
  )

  const tagged = posts.filter(p => p.tags?.includes(tag))

  return (
    <div className="container">
      <Nav />
      <h1 className="page-title">#{tag}</h1>
      <p className="page-subtitle">
        {tagged.length} post{tagged.length !== 1 ? 's' : ''} ·{' '}
        <Link to="/blog" className="post-tags tag-clear">all posts</Link>
      </p>

      <div className="projects">
        {tagged.map(post => (
          <Link key={post.slug} className="project" to={`/blog/${post.slug}`}>
            <div className="project-header">
              <span className="project-name">{post.title}</span>
              <span className="project-lang">{formatDate(post.date)}</span>
            </div>
            {post.description && <p className="project-desc">{post.description}</p>}
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  )
}
