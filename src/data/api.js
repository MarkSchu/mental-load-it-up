import { user } from 'data/user.js';


export const api = async (action, collection, data) => {
    return fetch('/.netlify/functions/request', {
        method: 'POST',
        body: JSON.stringify({
            action,
            userId: user.id(),
            collection,
            data
        })
    })
    .then((response) => {
        if (response.status < 300) {
            return response.json().then((body) => {
                return {
                    body,
                    status: response.status,
                    statusText: response.statusText
                }
            })
        }
        return {
            status: response.status,
            statusText: response.statusText
        }
    });
}


