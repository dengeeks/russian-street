import './ArticleCardSkeleton.css'
import Image from 'next/image'

const ArticleCardSkeleton = () => {
  const randomId = Math.floor(Math.random() * 4) + 1 // от 1 до 4

  return (
    <article className="articleCardSkeleton">
      <Image
        src={`/assets/webp/skeleton/article${randomId}.webp`}
        fill
        alt="Скелетон карточки"
        sizes="388px"
      />
    </article>
  )
}

export default ArticleCardSkeleton
