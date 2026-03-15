import MermaidBlock from '../components/MermaidBlock'

export const markdownComponents = {
  code({ className, children }) {
    if (className === 'language-mermaid') {
      return <MermaidBlock>{String(children).trim()}</MermaidBlock>
    }
    return <code className={className}>{children}</code>
  },
}
