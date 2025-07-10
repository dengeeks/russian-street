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

  const currentCategory = filteredList.find(cat => cat.partner_type === selectedCategory)

  if (!currentCategory || !currentCategory.partners) return null

  const partnerTypes = filteredList.map(item => ({
    id: item.partner_type,
    name: item.partner_type
  }))

  return (
    <div className="partners-mobile">
      <SelectMenu
        value={selectedCategory}
        options={partnerTypes}
        onChange={(val) => {
          if (val !== undefined && val !== selectedCategory) {
            setSelectedCategory(val)
          }}}
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
