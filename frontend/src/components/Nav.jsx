import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

export default function Nav() {
  const location = useLocation()
  const { theme, toggle } = useTheme()

  const isBlogActive = location.pathname.startsWith('/blog') || location.pathname.startsWith('/tags')

  return (
    <nav className="nav">
      <Link to="/" className={location.pathname === '/' ? 'nav-active' : ''}>mrembiasz</Link>
      <Link to="/about" className={location.pathname === '/about' ? 'nav-active' : ''}>about</Link>
      <Link to="/homelab" className={location.pathname === '/homelab' ? 'nav-active' : ''}>homelab</Link>
      <Link to="/blog" className={isBlogActive ? 'nav-active' : ''}>blog</Link>
      <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
        {theme === 'dark' ? (
          <svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>
        ) : (
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
        )}
      </button>
    </nav>
  )
}
