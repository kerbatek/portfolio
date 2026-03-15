import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import PostCard from '../components/PostCard'
import { getPosts } from '../lib/api'
import { useFetch } from '../hooks/useFetch'

export default function BlogList() {
  const { data: posts, loading, error } = useFetch(getPosts, [])
  const allTags = posts ? [...new Set(posts.flatMap(p => p.tags ?? []))].sort() : []

  return (
    <PageShell loading={loading} error={error && 'Failed to load posts.'}>
      <h1 className="page-title">Blog</h1>
      {allTags.length > 0 && (
        <p className="post-meta post-tags">
          {allTags.map(tag => (
            <Link key={tag} to={`/tags/${tag}`}>{tag}</Link>
          ))}
        </p>
      )}
      <div className="projects">
        {posts?.map(post => <PostCard key={post.slug} post={post} />)}
      </div>
    </PageShell>
  )
}
