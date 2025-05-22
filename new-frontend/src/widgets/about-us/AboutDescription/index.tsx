import styles from "./AboutDescription.module.css";

const AboutDescription = () => {
  return (
    <section className={`container section-spacing-top ${styles.aboutDescription}`}>
      МЫ Родились из уличных дисциплин. Каждый, кто начинал тренироваться на улице,&nbsp;
      <span>находил</span> себе новые знакомства, дружбу, окружение, <span>которое помогало развивать</span> свои
      сильные стороны.<br />
      Эта <span>история про</span> пацанов и девчонок, которые воспринимают улицу как свой дом и находят там <span>смысл жизни.</span>
    </section>
  )
};

export default AboutDescription;