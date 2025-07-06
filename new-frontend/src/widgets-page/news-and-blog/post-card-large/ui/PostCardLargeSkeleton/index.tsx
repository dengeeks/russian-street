import './PostCardLargeSkeleton.css'

const PostCardLargeSkeleton = () => {
  return (
    <article className="container postCardLargeLoader Skeleton">
      <div className="textPlaceholder date" />
      <div className="textPlaceholder title" />
      <div className="textPlaceholder date" />
      <div className="imagePlaceholder" />
    </article>
  )
}

export default PostCardLargeSkeleton
