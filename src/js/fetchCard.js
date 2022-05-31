import axios from "axios";
import Notiflix from 'notiflix';

const API_KEY = '27740187-027ced381d2a859459665934d';
const BASE_URL = 'https://pixabay.com/api/';

export const imageParams = {
    q: "",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: 40,
    page: 1
}

const createAxios = axios.create({
    baseURL: `${BASE_URL}?key=${API_KEY}`
});

export const fetchCard = async (params) => {
    try {
        const result = await createAxios.get('', { params });
        return result;
    } catch {
        Notiflix.Notify.failure('Sorry, its data error');
    }
}