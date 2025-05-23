export type TeamType = {
  fio: string;
  img: string;
  description: string;
}

export type TeamListType = {
  category: string;
  children?: TeamType[];
}