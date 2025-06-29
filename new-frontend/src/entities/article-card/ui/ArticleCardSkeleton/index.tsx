import './ArticleCardSkeleton.css'
import Image from 'next/image'

const ArticleCardSkeleton = () => {
  return (
    <article className="articleCardSkeleton">
      <Image src="/assets/webp/skeleton/article1.webp" fill alt="Скелетон карточки" sizes="388px"/>
    </article>
  )
}

export default ArticleCardSkeleton
