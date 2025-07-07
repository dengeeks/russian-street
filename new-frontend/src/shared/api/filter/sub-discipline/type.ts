import { EventOrAreaType } from '@/shared/api/type'

export type FilterSubDisciplinesType = {
  discipline: {
    id: string;
    name: string
  }
  subdisciplines: {
    id: string;
    name: string;
  }[]
}


export type SubDisciplinesFilterType = {
  type: EventOrAreaType;
  region_id?: string;
  starting_date?: string;
  ending_date?: string;
}