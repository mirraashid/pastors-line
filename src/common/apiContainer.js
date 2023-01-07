import axios from 'axios';

const BASE_URL = "https://api.dev.pastorsline.com/api";

//ideally we will be stroing this token in redux/local storage and then get it from there
const BEARER_TOKEN = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNjc2NDM5MjI0LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjYwODg3MjI0fQ.X6EnuvO5j5n9WLNrQUyJ9M4ABtDQpfsrjfWnts3GmPs";
 
/**
 * fetch ContactData
 * @param {any} params
 */
 export const fetchContacts = (params) => axios({
    method: 'GET',
    url: BASE_URL + "/contacts.json",
    headers: {
        'Authorization': BEARER_TOKEN
    },
    params,
});