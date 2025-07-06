export type RegionManagerType = {
  uuid: string;
  email: string;
  first_name: string;
  last_name: string | null;
  phone_number: string | null;
  avatar: string | null;
  address: string | null;
  social_links: {
    url: string;
    social_media: {
      image: string;
    }
  }[]
}
