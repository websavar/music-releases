import axios from "axios";
const apiUrl = "https://api.discogs.com/database/";

export const accessToken = 'dIbgeUKMnREdRbPtsjIvrQIsFkPgVLMTqCggSDsl';

// axios.interceptors.request.use(
//     config => {
//         config.headers.authorization = `Bearer ${accessToken}`;
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// )

// const discogsApi = axios.create({
//     baseURL: apiUrl
// });


export const authAxios = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: `token ${accessToken}`
    }
});

// export const discogsApi = axios.get("https://api.discogs.com/database/search?page=2&per_page=70&token=dIbgeUKMnREdRbPtsjIvrQIsFkPgVLMTqCggSDsl");


// const discogsApi = axios.create({
//     baseURL: apiUrl
// });
// authAxios.defaults.headers.common['Authorization'] = accessToken;

// export default authAxios;
