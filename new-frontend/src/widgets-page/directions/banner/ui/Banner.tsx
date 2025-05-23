import './Banner.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import Image from 'next/image'

const Banner = () => {
  return (
    <section className="bannerDirections container section-spacing-bottom">
      <div className="bannerDirectionsBlock">
        <SectionTitle className="bannerDirectionsTitle">спорт</SectionTitle>
        <div className="bannerDirectionsImage">
          <Image src="/test/directions/1.png" alt="спорт" fill />
        </div>
      </div>
      <div className="bannerDirectionsBlock">
        <SectionTitle className="bannerDirectionsTitle">искусство</SectionTitle>
        <div className="bannerDirectionsImage">
          <Image src="/test/directions/4.png" alt="искусство" fill />
        </div>
      </div>
      <div className="bannerDirectionsBlock">
        <SectionTitle className="bannerDirectionsTitle">музыка</SectionTitle>
        <div className="bannerDirectionsImage">
          <Image src="/test/directions/2.png" alt="музыка" fill />
        </div>
      </div>
      <div className="bannerDirectionsBlock">
        <SectionTitle className="bannerDirectionsTitle">танцы</SectionTitle>
        <div className="bannerDirectionsImage">
          <Image src="/test/directions/3.png" alt="танцы" fill />
        </div>
      </div>


    </section>

  )
}

export default Banner
