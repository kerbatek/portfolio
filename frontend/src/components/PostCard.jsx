import { Link } from 'react-router-dom'
import { formatDate, formatDateShort } from '../lib/dateFormat'

export default function PostCard({ post, short = false }) {
  return (
    <Link className="project" to={`/blog/${post.slug}`}>
      <div className="project-header">
        <span className="project-name">{post.title}</span>
        <span className="project-lang">{short ? formatDateShort(post.date) : formatDate(post.date)}</span>
      </div>
      {post.description && <p className="project-desc">{post.description}</p>}
    </Link>
  )
}
