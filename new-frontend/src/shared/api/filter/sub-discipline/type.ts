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
  type: 'event' | 'area';
  region_id?: string;
  starting_date?: string;
  ending_date?: string;
}