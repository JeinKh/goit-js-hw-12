import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
export { getPosts }
//----------------------------------

async function getPosts(searchQuery, page = 1, perPage = 15) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '44085737-801aedd726c9c1496368a8656';
    // const params = new URLSearchParams({
    // key: '44085737-801aedd726c9c1496368a8656',
    // q: imageName,
    // image_type: 'photo',
    // orientation: 'horizontal',
    // safesearch: true
    // })

    const url = `${BASE_URL}`;

    try {
        const response = await axios(url, {
            params: {
                key: API_KEY,
                q: searchQuery,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                page: page,
                per_page: perPage
            }
        });
        return response.data;
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: `Something went wrong. ${error.message}`
        })
    }

};