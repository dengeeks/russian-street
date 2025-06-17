import { PartnerType } from '@/entities/partner-card'

export type PartnerListType = {
  category: string;
  children?: PartnerType[];
}