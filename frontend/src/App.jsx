import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Homelab from './pages/Homelab'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import TagDetail from './pages/TagDetail'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/homelab" element={<Homelab />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/tags/:tag" element={<TagDetail />} />
      </Routes>
    </BrowserRouter>
  )
}
