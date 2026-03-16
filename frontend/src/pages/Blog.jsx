import { useParams, Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import PostCard from '../components/PostCard'
import { getPosts } from '../lib/api'
import { useFetch } from '../hooks/useFetch'
import { useMeta } from '../hooks/useMeta'

export default function Blog() {
  const { tag } = useParams()
  const { data: posts, loading, error } = useFetch(getPosts, [])
  useMeta({ title: tag ? `#${tag}` : 'Blog', path: tag ? `/tags/${tag}` : '/blog' })

  const allTags = posts ? [...new Set(posts.flatMap(p => p.tags ?? []))].sort() : []
  const filtered = tag ? posts?.filter(p => p.tags?.includes(tag)) : posts

  return (
    <PageShell loading={loading} error={error && 'Failed to load posts.'}>
      <h1 className="page-title">{tag ? `#${tag}` : 'Blog'}</h1>
      {allTags.length > 0 && (
        <p className="post-meta post-tags">
          <Link to="/blog" className={!tag ? 'tag-active' : ''}>any</Link>
          {allTags.map(t => (
            <Link key={t} to={`/tags/${t}`} className={t === tag ? 'tag-active' : ''}>{t}</Link>
          ))}
        </p>
      )}
      <div className="projects">
        {filtered?.map(post => <PostCard key={post.slug} post={post} />)}
      </div>
    </PageShell>
  )
}
