import { useRef, useState, MouseEvent } from 'react'
import type { OptionType } from '../model/type'
import { useMobileDetection } from '@/shared/hooks/useIsMobile'

export function useSelectMenuController(
  options: OptionType[],
  value?: string,
  placeholder?: string
) {

  const menuRef = useRef<HTMLDivElement>(null)
  const [hoveredItem, setHoveredItem] = useState<{
    id: string
    top: number
    left: number
    count_events?: number
    count_areas?: number
  } | null>(null)
  const isMobile = useMobileDetection()


  const getSelectedLabel = () =>
    options.find(opt => opt.id === value)?.name || placeholder || ''

  const handleMouseEnter = (e: MouseEvent<HTMLLIElement>, data: OptionType) => {
    if (isMobile) return
    const rect = e.currentTarget.getBoundingClientRect()
    const containerRect = menuRef.current?.getBoundingClientRect()
    if (containerRect) {
      const tooltipWidth = 220
      setHoveredItem({
        id: data.id,
        top: rect.top - containerRect.top,
        left: rect.left - containerRect.left - tooltipWidth - 17,
        count_events: data.count_events,
        count_areas: data.count_areas
      })
    }
  }


  return {
    menuRef,
    hoveredItem,
    setHoveredItem,
    getSelectedLabel,
    handleMouseEnter
  }
}
