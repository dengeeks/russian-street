'use client'
import './PartnersMobile.css'
import 'swiper/css'
import 'swiper/css/pagination'
import type { PartnerListType } from '@/shared/api/partners/type'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import PartnerCard from '@/entities/partner-card'
import SelectMenu from '@/shared/ui/SelectMenu'
import { useState } from 'react'


interface PartnersMobileProps {
  data: PartnerListType;
}

const PartnersMobile = ({data}: PartnersMobileProps) => {
  const filteredList = data.filter(cat => cat.partners?.length)

  const [selectedCategory, setSelectedCategory] = useState(filteredList[0]?.partner_type || '')

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val)
  }

  const currentCategory = filteredList.find(cat => cat.partner_type === selectedCategory)

  if (!currentCategory || !currentCategory.partners) return null

  return (
    <div className="partners-mobile">
      <SelectMenu
        options={filteredList.map(item => item.partner_type)}
        onChange={handleCategoryChange}
      />
      <Swiper
        modules={[Pagination]}
        slidesPerView="auto"
        loop
        pagination={{
          clickable: true
        }}
        className="SwiperPagination">
            {currentCategory.partners.map((partner, index) => (
              <SwiperSlide key={index}>
                <PartnerCard {...partner} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  )
}

export default PartnersMobile
