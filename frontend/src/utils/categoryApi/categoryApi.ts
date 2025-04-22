import { title } from "process";

const baseUrl = 'https://streetsrussia.sytes.net/api/v1'

export async function getCategory () {
    try{
        let res = await fetch(`${baseUrl}/category/`, {
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

export async function getDescipline () {
    try{
        let res = await fetch(`${baseUrl}/discipline/`, {
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

export async function getDesciplineById (id:number) {
    try{
        let res = await fetch(`${baseUrl}/discipline/${id}`, {
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

export async function getSubDescipline () {
    try{
        let res = await fetch(`${baseUrl}/sub-discipline/`, {
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

export async function getSubDesciplineById (id:number) {
    try{
        let res = await fetch(`${baseUrl}/sub-discipline/${id}`, {
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