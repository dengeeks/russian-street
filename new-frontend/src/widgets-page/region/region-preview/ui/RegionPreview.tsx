import styles from './RegionPreview.module.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import Image from 'next/image'

const RegionPreview = () => {
  return (
    <section className={`container ${styles.regionPreview}`}>
      <SectionTitle>Республика Коми</SectionTitle>
      <div className={styles.regionPreviewContent}>
        <div className={styles.regionPreviewImageWrapper}>
          <Image src="/test/events.png" alt="Республика Коми" fill />
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
