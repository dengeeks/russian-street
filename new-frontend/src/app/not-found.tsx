import '@/shared/styles/page404.css'
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="notFoundContainer">
      <div className="notFoundCode">404</div>
      <div className="notFoundMessage">
        Кажется, мы удалили эту страницу, или она находится в работе.
        Попробуйте вернуться на главную.
      </div>
      <Link href="/" className="button red">На главную</Link>
    </section>
  )
}
