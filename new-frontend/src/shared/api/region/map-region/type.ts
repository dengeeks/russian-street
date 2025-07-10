export type MapRegionListType = {
  regions: {
    id: string;
    name: string;
    code: string;
    have_events: boolean;
    have_areas: boolean;
    count_events: number;
    count_areas: number;
    "manager": {
      "id": number,
      "email": string,
      "phone": string | null,
      "address": string | null
    } | null
  }[];
  total_events: number;
  total_areas: number
}
