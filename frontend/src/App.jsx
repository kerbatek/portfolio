import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Homelab from './pages/Homelab'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import PageShell from './components/PageShell'

function NotFound() {
  return (
    <PageShell>
      <h1 className="page-title">404</h1>
      <p className="page-subtitle">Page not found.</p>
    </PageShell>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/homelab" element={<Homelab />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/tags/:tag" element={<Blog />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
