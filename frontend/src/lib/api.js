const BASE = '/api'

async function get(path) {
  const res = await fetch(BASE + path)
  if (!res.ok) throw new Error(`${res.status}`)
  return res.json()
}

export const getPosts = () => get('/posts')
export const getPost  = (slug) => get(`/posts/${slug}`)
export const getPage  = (slug) => get(`/pages/${slug}`)
