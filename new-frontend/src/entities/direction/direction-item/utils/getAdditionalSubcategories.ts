import { SubDiscipline } from '@/shared/api/direction/disciplines/type'

export const getAdditionalSubcategories = (
  all: SubDiscipline[],
  current: SubDiscipline[]
): SubDiscipline[] => {
  const currentSlugs = new Set(current.map(item => item.id))
  return all.filter(item => !currentSlugs.has(item.id))
}
