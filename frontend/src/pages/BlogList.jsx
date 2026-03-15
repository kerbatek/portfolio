import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { getPosts, getTags } from '../lib/api'
import { useFetch } from '../hooks/useFetch'
import { formatDate } from '../lib/dateFormat'

export default function BlogList() {
  const { data: posts, loading, error } = useFetch(getPosts, [])
  const { data: allTags } = useFetch(getTags, [])

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

  return (
    <div className="container">
      <Nav />
      <h1 className="page-title">Blog</h1>

      {allTags?.length > 0 && (
        <p className="post-meta post-tags">
          {allTags.map(tag => (
            <Link key={tag} to={`/tags/${tag}`}>{tag}</Link>
          ))}
        </p>
      )}

      <div className="projects">
        {posts.map(post => (
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
