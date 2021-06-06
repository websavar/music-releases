import { authAxios, accessToken } from "./api";

const errorHandler = (err) => {
    if (err.response) {
        // client received an error response (5xx, 4xx)
        if (err.response.status === 404) console.log('Request failed; API address not found!');
        if (err.response.status === 500) console.log('Internal server error!');
    } else if (err.request) {
        console.log('Client never received a response, or request never left');
    } else {
        console.log('Error: ', err);
    }
}

const discogs = {
    fetchDicogs: async (query = "*", currentPage = 1, pageLimit = 50) => {
        const result = await authAxios
            .get('search?token=' + accessToken + '&q=' + query + '&page=' + currentPage + '&per_page=' + pageLimit)
            .catch(error => errorHandler(error));

        return result?.data;
    }
};

export default discogs;
