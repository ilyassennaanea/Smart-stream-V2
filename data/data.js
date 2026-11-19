const API_Url = 'https://6af349b1d2377d6c3704d490.mockapi.io/api/v1/channels'
export async function getData() {
    try {
        const respense = await fetch(API_Url)
        if (!respense.ok) {
            if (respense.status == 404) {
                console.log('ressource introuvable')
                throw Error(`${respense.status}`)
            }
            if (respense.status == 500) {
                console.log('erreur serveur')
                throw Error(` ${respense.status}`)
            }
        }
        if (respense.ok) {
            console.log("success")
        }
        const data = await respense.json();
        return data;
    } catch (error) {
        console.error(error)
        alert(error)
    } finally {

        const spiner = document.getElementById('loader');
        spiner.classList.add('hidden')
    }

}
export async function updateChannel(id, changes) {
    const response = await fetch(`${API_Url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(changes)
    }).then((Response) => {
        if (!Response.ok) {
            throw new Error(`Error HTTP : ${Response.status}`);
        }
        return Response.json();
    });
}
export async function DeleteChannel(id){
    const response = await fetch(`${API_Url}/${id}`,{
        method : 'DELETE'
    })
    return response
}

export async function addChannel(channel) {
    const response = await fetch(`${API_Url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(channel)
    }).then((Response) => {
        if (!Response.ok) {
            throw new Error(`Error HTTP : ${Response.status}`);
        }
        return Response.json();
    });
}