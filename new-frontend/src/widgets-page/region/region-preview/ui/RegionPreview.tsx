import styles from './RegionPreview.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import Image from 'next/image'

const RegionPreview = () => {
  return (
    <section className={`container ${styles.regionPreview}`}>
      <SectionTitle>Республика Коми</SectionTitle>
      <div className={styles.regionPreviewContent}>
        <div className={styles.regionPreviewImageWrapper}>
          <Image src="/assets/test/events.png" alt="Республика Коми" fill priority sizes="
    (min-width: 1180px) 600px,
    (min-width: 1080px) 550px,
    (min-width: 1025px) 500px,
    (min-width: 1024px) 650px,
    (min-width: 690px) 650px,
    (max-width: 689px) calc(100vw - 32px)" />
        </div>
        <p className={styles.regionPreviewDescription}>
          Республика Коми — край несметных природных богатств и территория самобытной культуры
          северных народов. В недрах региона хранятся все элементы таблицы Менделеева. Отсюда берет
          начало российская нефтяная промышленность. Здесь огромные лесные просторы пересечены сетью
          полноводных хрустальных рек.
          <br /><br />
          Республику по праву называют родиной лыж. Фрагмент древнейшей лыжи с головой лося можно
          увидеть в отделе этнографии Национального музея Республики Коми, ее возраст — более 8
          тысяч лет.
        </p>
      </div>
    </section>
  )
}

export default RegionPreview
