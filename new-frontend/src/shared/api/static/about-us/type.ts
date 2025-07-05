export type JoinStreetType = {
  format_type: 'video_url' | 'image';
  video_url: string | null;
  image: string | null;
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