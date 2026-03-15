import { useParams, Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import PostCard from '../components/PostCard'
import { getPosts } from '../lib/api'
import { useFetch } from '../hooks/useFetch'

export default function TagDetail() {
  const { tag } = useParams()
  const { data: posts, loading, error } = useFetch(getPosts, [])
  const tagged = posts?.filter(p => p.tags?.includes(tag)) ?? []

  return (
    <PageShell loading={loading} error={error && 'Failed to load posts.'}>
      <h1 className="page-title">#{tag}</h1>
      <p className="page-subtitle">
        {tagged.length} post{tagged.length !== 1 ? 's' : ''} ·{' '}
        <Link to="/blog" className="post-tags tag-clear">all posts</Link>
      </p>
      <div className="projects">
        {tagged.map(post => <PostCard key={post.slug} post={post} />)}
      </div>
    </PageShell>
  )
}
