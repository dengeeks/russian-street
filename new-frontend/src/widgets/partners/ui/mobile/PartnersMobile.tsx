'use client'
import './PartnersMobile.css'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import PartnerCard from '@/entities/partner-card'
import SelectMenu from '@/shared/ui/SelectMenu'
import {partnerList} from '@/widgets/partners/model/mock/partners'
import { useState } from 'react'

const PartnersMobile = () => {
  const filteredList = partnerList.filter(cat => cat.children?.length)

  const [selectedCategory, setSelectedCategory] = useState(filteredList[0]?.category || '')

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val)
  }

  const currentCategory = filteredList.find(cat => cat.category === selectedCategory)

  if (!currentCategory || !currentCategory.children) return null

  return (
    <div className="partners-mobile">
      <SelectMenu
        options={filteredList.map(item => item.category)}
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
            {currentCategory.children.map((partner, index) => (
              <SwiperSlide key={index}>
                <PartnerCard {...partner} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  )
}

export default PartnersMobile
