const BASE_URL = 'https://workout-routine-builder-api.herokuapp.com'; 

async function api(body, endpoint, auth) {
    let headers = {
        Accept: '/',
		'Content-Type': 'application/json',
    };

    if(auth)
        headers['Authorization'] = `Bearer ${auth}`;
    return await fetch(BASE_URL + endpoint.url, 
        { 
            method: endpoint.method, 
            headers,
            body: JSON.stringify(body)
        })
        .then(res => {
      		console.log(res);
            return res;
        }).catch((e)=>{console.log(e);});
}

console.log(api({"email": "uhiuh@gmail.com", "name": "test", "password": "klejg094" },{url:'/users/create',method:'POST'}))