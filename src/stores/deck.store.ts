import {defineStore} from 'pinia';
import { deleteDeck, getDecks, postDeck } from '../api/deck.api';
import type { DeckInput, Pokemon } from '../types/common.type';
import { ref } from 'vue';

export const useDeckStore = defineStore('deck', () => {
    const saveDeck = async (deck: DeckInput) => {
        try {
            await postDeck(deck);
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }

    const fetchDecks = async () => {
        try {
            const decks = await getDecks();
            return decks;
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }

    const removeDeck = async (id: number) => {
        try {
            await deleteDeck(id);
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }

    const pokemonsInDeck = ref<Pokemon[]>([]);

    const addPokemonToDeck = (pokemon: Pokemon) => {
        pokemonsInDeck.value.push(pokemon);
    }

    const removeCardFromDeck = (index: number) => {
        pokemonsInDeck.value.splice(index, 1);
    }

    return {saveDeck, pokemonsInDeck, addPokemonToDeck, removeCardFromDeck, fetchDecks, removeDeck}
});
