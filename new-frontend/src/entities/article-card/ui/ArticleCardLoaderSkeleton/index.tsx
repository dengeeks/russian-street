import './ArticleCardLoaderSkeleton.css'
import '@/shared/styles/skeleton.css'

const ArticleCardLoaderSkeleton = () => {
  return (
    <article className="articleCardLoader Skeleton">
      <div className="imagePlaceholder" />
      <div className="textPlaceholder title" />
      <div className="textPlaceholder date" />
    </article>
  )
}

export default ArticleCardLoaderSkeleton
