import './ArticleCardSkeleton.css'
import Image from 'next/image'

const ArticleCardSkeleton = () => {
  return (
    <article className="articleCardSkeleton">
      <Image src="/png/skeleton/article1.png" fill alt="Скелетон карточки" sizes="388px"/>
    </article>
  )
}

export default ArticleCardSkeleton
