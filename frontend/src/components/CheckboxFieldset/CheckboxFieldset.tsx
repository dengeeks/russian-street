import React, { useMemo, useState } from "react";
import { CheckBox } from "../../UI/CheckBox/CheckBox";
import { CheckBoxPlusMinus } from "../../UI/CheckBoxPlusMinus/CheckBoxPlusMinus";
import './CheckboxFieldset.css';
import { CheckboxFieldsetProps, SubDiscipline } from "./CheckboxFieldsetProps";
import { getDesciplineById, getSubDescipline } from "../../utils/categoryApi/categoryApi";

export function CheckboxFieldset({ disciplineId, subDiscipline }: CheckboxFieldsetProps) {

    const [disciplineName, setDisciplineName] = useState('');

    const [filterSubdiscipline, setFilterSubdiscipline] = useState<SubDiscipline[] | null>(null);

    const [watchCategory, setWatchCategory] = useState(true);
    const [watchAll, setWatchAll] = useState(false);

    function toggleWatchCategory() {
        setWatchCategory(!watchCategory);
    }

    function toggleWatchAll() {
        setWatchAll(!watchAll);
    }

    useMemo(async() => {
    let res = await getDesciplineById(disciplineId);
    setDisciplineName(res.name);
    const filteredDiscipline = subDiscipline?.filter(item => item.discipline.id === disciplineId);
    if(filteredDiscipline !== undefined) {
        setFilterSubdiscipline(filteredDiscipline);
    }
    }, [])

    return (
        <fieldset className="checkbox-fieldset">
        <CheckBoxPlusMinus id={`checkbox_plus-minus_id_${disciplineId}`} onClick={toggleWatchCategory}>{disciplineName}</CheckBoxPlusMinus>
        { watchCategory &&  <>
        { watchAll && filterSubdiscipline?.map(subDiscipline => <CheckBox id={`checkbox_id_${subDiscipline.id}`} key={subDiscipline.id}>{subDiscipline.name}</CheckBox>)}
        { !watchAll && filterSubdiscipline?.slice(0,3).map(subDiscipline => <CheckBox id={`checkbox_id_${subDiscipline.id}`} key={subDiscipline.id}>{subDiscipline.name}</CheckBox>)}
        
        <button onClick={toggleWatchAll} className="watch-all-button">cмотреть всё</button>
        </>}
        </fieldset>

    )
}