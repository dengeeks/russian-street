import { SubCategory } from '../model/type'

export const getAdditionalSubcategories = (
  all: SubCategory[],
  current: SubCategory[]
): SubCategory[] => {
  const currentSlugs = new Set(current.map(item => item.slug))
  return all.filter(item => !currentSlugs.has(item.slug))
}
