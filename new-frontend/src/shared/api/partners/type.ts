export type PartnerType = {
  name: string
  image: string
  description: string
  url: string
}

export type PartnerListType = {
  partner_type: string
  partners: PartnerType[]
}[]