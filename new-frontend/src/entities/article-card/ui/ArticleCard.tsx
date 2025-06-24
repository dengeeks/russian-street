import "./ArticleCard.css";
import Link from 'next/link'
import Image from 'next/image'

const ArticleCard = () => {
  return (
    <article className="article-card">
      <Link href="/" className="article-card-link">
        <div className="article-img-wrapper">
        <Image src="/assets/test/events.png" fill alt="общая карточка"/>
        </div>
        <div className="article-card-info">
          <span className="article-card-info-title">
               Регулярно проводим силовые тренировки на свежем воздухе
          </span>
          <p>15 июня, г.Кемерово</p>
        </div>
      </Link>
    </article>
  )
}

export default ArticleCard;