import { useEffect } from 'react'

const SITE_NAME = 'Mateusz Rembiasz'
const BASE_URL = 'https://mrembiasz.pl'

function setMeta(property, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function useMeta({ title, description, type = 'website', path = '' }) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${SITE_NAME}` : SITE_NAME
    document.title = fullTitle
    setMeta('description', description ?? '')
    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', description ?? '', 'property')
    setMeta('og:type', type, 'property')
    setMeta('og:url', `${BASE_URL}${path}`, 'property')
  }, [title, description, type, path])
}
