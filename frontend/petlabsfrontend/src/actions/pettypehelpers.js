export const getPetType = (petTypeName) => {
    const url = "http://localhost:3001/pettypes/";
    const request = new Request(url, {
        method: "get",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    return fetch(request)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        }).then((pTypes) => {
            for (let i = 0; i < pTypes.length; i++) {
                if (pTypes[i].name === petTypeName) {
                    console.log("Successfully retrieved " + pTypes[i].name)
                    return pTypes[i];
                }
            }
        }).catch((error) => {
            console.log(error);
        });
}

export const getAllPetTypes = () => {
    const url = "http://localhost:3001/pettypes";
    const request = new Request(url, {
        method: "get",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    return fetch(request)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        }).then((pettypes) => {
            return pettypes;
        }).catch((error) => {
            console.log(error);
        });
}


export const updatePetTypeState = (state) => {
    //DB CALL: UPDATE PET
    //if it succeeds call:
    return true
}