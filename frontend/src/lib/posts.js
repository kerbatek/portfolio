import { parseFrontmatter } from './frontmatter'

const files = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true })

export const posts = Object.entries(files).map(([path, raw]) => {
  const slug = path.split('/').pop().replace(/\.md$/, '')
  const { data, content } = parseFrontmatter(raw)
  return { slug, ...data, content }
}).sort((a, b) => new Date(b.date) - new Date(a.date))

export const allTags = [...new Set(posts.flatMap(p => p.tags ?? []))].sort()

export function getPost(slug) {
  return posts.find(p => p.slug === slug)
}

export function getPostsByTag(tag) {
  return posts.filter(p => p.tags?.includes(tag))
}
