export type SubDiscipline = {
  id: string;
  name: string;
};


export type DisciplinesType = {
  id: string;
  name: string;
  first_image: string;
  second_image: string;
  first_description: string;
  sub_disciplines: SubDiscipline[];
  main_page_info: string;
}

