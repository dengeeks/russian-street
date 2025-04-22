const baseUrl = 'https://streetsrussia.sytes.net/api/v1'

export async function getRegion () {
    try{
        let res = await fetch(`${baseUrl}/region/`, {
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

  export async function getRegionById (id:number) {
    try{
        let res = await fetch(`${baseUrl}/region/${id}`, {
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

  export async function getCity () {
    try{
        let res = await fetch(`${baseUrl}/city/`, {
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

  export async function getCityById (id:number) {
    try{
        let res = await fetch(`${baseUrl}/city/${id}`, {
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