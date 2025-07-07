import { MediaFormatType } from '@/shared/api/type'

export type JoinStreetType = MediaFormatType & {
  text: string;
} | null

export type MissionType = {
  image: string;
} | null

export type InfoType = {
  person: number;
  discipline: number;
  organization: number;
  event: number;
} | null


export type AboutUsType = {
  join_street: JoinStreetType;
  mission: MissionType;
  info: InfoType;
}