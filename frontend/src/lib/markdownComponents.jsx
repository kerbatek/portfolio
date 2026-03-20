import { Link } from 'react-router-dom'
import MermaidBlock from '../components/MermaidBlock'

export function makeMarkdownComponents(onMermaidReady) {
  return {
    a({ href, children }) {
      const isInternal = href && !href.startsWith('http') && !href.startsWith('//')
      return isInternal
        ? <Link to={href}>{children}</Link>
        : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
    },
    pre({ children }) {
      const child = Array.isArray(children) ? children[0] : children
      if (child?.props?.className === 'language-mermaid') {
        return (
          <MermaidBlock onReady={onMermaidReady}>
            {String(child.props.children).trim()}
          </MermaidBlock>
        )
      }
      return <pre>{children}</pre>
    },
    code({ className, children }) {
      return <code className={className}>{children}</code>
    },
  }
}
