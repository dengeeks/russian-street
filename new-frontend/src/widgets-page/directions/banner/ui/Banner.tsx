import './Banner.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import Image from 'next/image'

const Banner = () => {
  return (
    <section className="bannerDirections container section-spacing-bottom">
      <div className="bannerDirectionsBlock">
        <SectionTitle className="bannerDirectionsTitle">спорт</SectionTitle>
        <div className="bannerDirectionsImage">
          <Image src="/assets/test/directions/1.png" alt="спорт" fill sizes="(max-width: 767px) calc(90vw - 32px), 100%" />
        </div>
      </div>
      <div className="bannerDirectionsBlock">
        <SectionTitle className="bannerDirectionsTitle">искусство</SectionTitle>
        <div className="bannerDirectionsImage">
          <Image src="/assets/test/directions/4.png" alt="искусство" fill sizes="(max-width: 767px) calc(90vw - 32px), 100%"/>
        </div>
      </div>
      <div className="bannerDirectionsBlock">
        <SectionTitle className="bannerDirectionsTitle">музыка</SectionTitle>
        <div className="bannerDirectionsImage">
          <Image src="/assets/test/directions/2.png" alt="музыка" fill sizes="(max-width: 767px) calc(90vw - 32px), 100%"/>
        </div>
      </div>
      <div className="bannerDirectionsBlock">
        <SectionTitle className="bannerDirectionsTitle">танцы</SectionTitle>
        <div className="bannerDirectionsImage">
          <Image src="/assets/test/directions/3.png" alt="танцы" fill sizes="(max-width: 767px) calc(90vw - 32px), 100%"/>
        </div>
      </div>


    </section>

  )
}

export default Banner
