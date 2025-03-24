import axios from "axios";
import type { DeckInput } from "../types/common.type";

const apiUrl = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export const postDeck = async (deck: DeckInput) => {
    const token = localStorage.getItem("token");
    await apiUrl.post("/decks", deck, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getDecks = async () => {
    const token = localStorage.getItem("token");
    const response: any = await apiUrl.get("/decks", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

export const deleteDeck = async (id: number) => {
    const token = localStorage.getItem("token");
    await apiUrl.delete(`/decks/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}