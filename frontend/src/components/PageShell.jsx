import Nav from './Nav'
import Footer from './Footer'

export default function PageShell({ loading, error, wide, children }) {
  const cls = `container${wide ? ' container--wide' : ''}`
  return (
    <div className={cls}>
      <Nav />
      {loading ? (
        <p className="page-subtitle">Loading...</p>
      ) : error ? (
        <p className="page-subtitle">{error}</p>
      ) : (
        children
      )}
      <Footer />
    </div>
  )
}
