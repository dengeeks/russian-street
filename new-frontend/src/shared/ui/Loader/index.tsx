import styles from "./Loader.module.css"

type LoaderProps = {
  fullScreen?: boolean
}

const Loader = ({ fullScreen = false }: LoaderProps) => {
  return (
    <div
      className={`${styles.loaderWrapper} ${fullScreen ? styles.fullScreen : ''}`}
    >
      <span className={styles.spinner} />
    </div>
  )
}

export default Loader
