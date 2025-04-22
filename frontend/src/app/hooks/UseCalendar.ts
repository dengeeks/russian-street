import React, { useState } from "react"

export function UseCalendar() {

    const [currentDate, setcurrentDate] = useState(1);
    const [totalDays, settotalDays] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]);
    const [prevDays, setPrevDays] = useState(0);
    const [nextDays, setNextDays] = useState(19);
    const days = totalDays.slice(prevDays,nextDays);

    const [date, setDate] = useState(1);

    function prevDaysClick() {
        if(prevDays > 0) {
            setPrevDays(state => state -= 12);
            setNextDays(state => state -= 12);
        }
    }

    function nextDaysClick() {
        if(nextDays < totalDays.length){
            setPrevDays(state => state += 12);
            setNextDays(state => state += 12);
        }
    }

    return { currentDate, setcurrentDate, prevDays, setPrevDays, nextDays, setNextDays, days, prevDaysClick, nextDaysClick }
}