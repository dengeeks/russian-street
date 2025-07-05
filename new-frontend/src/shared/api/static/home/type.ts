export type PromotionalVideoType = {
  video_url: string;
} | null;

type AboutUsType = {
  discipline: number;
  regions: number;
  media_publications: number;
  event: number;
  person: number;
}| null;

type MissionAndGoalsTextType = {
  mission: string;
  goal: string;
}| null

export type OrganizationInfoType = {
  iframe: string;
  address: string;
  work_time: string;
  email: string;
  phone: string,
} | null

type OrderedImage = {
  image: string;
  order: number;
};

export type StreetImages = OrderedImage[];
export type MissionImages = OrderedImage[];

export type HomeType = {
  promotional_video: PromotionalVideoType;
  about_us: AboutUsType;
  mission_and_goals_text: MissionAndGoalsTextType;
  organization_info: OrganizationInfoType;
  street_images: StreetImages;
  mission_images: MissionImages;
}
