export interface SubDiscipline {
    discipline: {
        id: number,
        name: string
    },
    id: number,
    name: string
}

export interface CheckboxFieldsetProps {
    disciplineId: number;
    subDiscipline: SubDiscipline[] | null
}
