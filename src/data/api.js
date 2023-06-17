import { user } from 'data/user.js';
import state from 'data/state.js';

export const api = async (action, collectionName, data) => {
    state.loading.true();
    return fetch('/.netlify/functions/request', {
        method: 'POST',
        body: JSON.stringify({
            action,
            collectionName,
            data
        })
    }).then((res) => {
        return res.json().then((body) => {
            return {body, status: res.status}
        })
    })
    .catch((res) => {
       alert(res);
       return res;
    })
    .finally((res) => {
        state.loading.false();
        return res;
    })
}



