import styles from "./EventMap.module.css"

const EventMap = () => {
  return (
    <section className={`container section-spacing-top ${styles.eventMapSection}`}>
      <iframe
        className={styles.eventMapIframe}
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A90c9c41c27645e685c0fcb9a931ca7c31f870f5ea1a75d4b7071608018a6c43c&amp;source=constructor"
        allowFullScreen
      ></iframe>
    </section>
  )
}

export default EventMap;