export const getAllItems = () => {
    // const url = "http://localhost:3001/items/";
    const url = "/items/";
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
        }).then((items) => {
            return items;
        }).catch((error) => {
            console.log(error);
        });
}

export const getItemById = (targetItemId) => {
    //DB CALL: UPDATE USER
    // const url = "http://localhost:3001/items/" + targetItemId;
    const url = "/items/" + targetItemId;

    const request = new Request(url, {
        method: "GET",
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
        }).catch((error) => {
            console.log(error);
        });
}