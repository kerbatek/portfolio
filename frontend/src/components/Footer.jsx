const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      mateusz rembiasz · {year}
    </footer>
  )
}
