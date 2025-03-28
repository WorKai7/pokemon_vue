import axios from "axios";

const apiUrl = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export const getPokemons = async () => {
    const response: any = await apiUrl.get("/pokemon-cards");
    console.log(response.data);
    return response.data;
}