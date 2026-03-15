import MermaidBlock from '../components/MermaidBlock'

export function makeMarkdownComponents(onMermaidReady) {
  return {
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
