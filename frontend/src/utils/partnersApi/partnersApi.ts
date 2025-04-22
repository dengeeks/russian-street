import { title } from "process";

const baseUrl = 'https://streetsrussia.sytes.net/api/v1'

export async function getPartners() {
    try{
        let res = await fetch(`${baseUrl}/partners/`, {
            method: 'GET'
        });
        if(res.ok){
            let data = await res.json();
            return data;
        } else {
            throw new Error('Произошла ошибка');
        }
    }
    catch(err){
        console.error(err);
    }
}
