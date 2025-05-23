export type SubCategory = {
  title: string;
  slug: string;
}

export type DirectionType = {
  title: string;
  img: string;
  description: string;
  sub_category: SubCategory[]
}