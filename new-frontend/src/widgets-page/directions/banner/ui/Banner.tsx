import './Banner.css'
import SectionTitle from '@/shared/ui/SectionTitle'
import Image from 'next/image'
import type { DisciplinesType } from '@/shared/api/direction/disciplines/type'
import { getImageUrl } from '@/shared/utils/getImageUrl'

interface BannerProps {
  data: DisciplinesType[];
} 

const Banner = ({data}: BannerProps) => {
  return (
    <section className="bannerDirections container section-spacing-bottom">
      {data.map(discipline => (
        <div className="bannerDirectionsBlock" key={discipline.id}>
          <SectionTitle className="bannerDirectionsTitle">{discipline.name}</SectionTitle>
          <div className="bannerDirectionsImage">
            <Image
              src={getImageUrl(discipline.first_image)}
              alt={discipline.name}
              fill
              sizes="(max-width: 767px) calc(90vw - 32px), 100%"
              priority
            />
          </div>
        </div>
      ))}

    </section>
  )
}

export default Banner
