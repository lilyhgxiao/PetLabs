import { setState, setEmptyState } from "./helpers";
import { getState } from "statezero";

export const getAllItems = () => {
    const url = "http://localhost:3001/items/";
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
        })
    
    return null;
}