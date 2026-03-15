import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import PageShell from '../components/PageShell'
import { getPost } from '../lib/api'
import { useFetch } from '../hooks/useFetch'
import { markdownComponents } from '../lib/markdownComponents'
import { formatDate } from '../lib/dateFormat'

export default function BlogPost() {
  const { slug } = useParams()
  const { data: post, loading, error } = useFetch(() => getPost(slug), [slug])
  return (
    <PageShell loading={loading} error={(error || (!loading && !post)) && 'Post not found.'}>
      <h1 className="page-title">{post?.title}</h1>
      <div className="post-meta">
        <span>{formatDate(post?.date)}</span>
        {post?.tags?.length > 0 && (
          <span className="post-tags">
            {post.tags.map(tag => (
              <Link key={tag} to={`/tags/${tag}`}>{tag}</Link>
            ))}
          </span>
        )}
      </div>
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {post?.content}
        </ReactMarkdown>
      </div>
    </PageShell>
  )
}
