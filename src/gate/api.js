import axios from "axios";

const apiUrl = "https://api.discogs.com/database/";

export const accessToken = 'dIbgeUKMnREdRbPtsjIvrQIsFkPgVLMTqCggSDsl';

export const authAxios = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: `token ${accessToken}`
    }
});
