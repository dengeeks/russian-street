import { PartnerType } from '@/entities/partner-card/model/type'

export type PartnerListType = {
  category: string;
  children?: PartnerType[];
}