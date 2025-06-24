import styles from './DirectionDetails.module.css'
import Button from '@/shared/ui/Button'
import SectionTitle from '@/shared/ui/SectionTitle'

const DirectionDetails = () => {
  return (
    <section className={`container section-spacing-bottom ${styles.directionDetails}`}>
      <div className={styles.directionDetails__content}>
        <SectionTitle>Паркур</SectionTitle>
        <p className={styles.directionDetails__description}>
          Паркур — искусство рационального преодоления препятствий и перемещения по городу из точки А в точку Б. В нем человек преодолевает физические препятствия (стены, заборы, дома и т.д.), при помощи возможностей своего тела. При этом препятствия он преодолевает как можно быстрее и эффективнее (это означает, что он не делает движений, которые отнимают слишком много энергии и время).
          <br/>
          <br/>
          Паркур не просто физические усилия, техника и набор элементов передвижения, а ещё эмоциональный и духовный смысл. Мы играем и получаем удовольствие от движения. Говоря о препятствиях, мы говорим не только о физических и психологических преградах. Паркур учит быть сильным, быть полезным. Он учит уверенности в себе, своих силах. Он учит стремлению к постоянному развитию.
        </p>
      </div>
      <Button className="red">мероприятия</Button>
    </section>
  )
}

export default DirectionDetails
