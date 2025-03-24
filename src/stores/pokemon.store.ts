import {defineStore} from 'pinia';
import { getPokemons } from '../api/pokemon.api';
import { ref } from 'vue';
import type { Pokemon } from '../types/common.type';

export const usePokemonStore = defineStore('pokemon', () => {
    const getPokemonsList = async () => {
        try {
            const pokemons = await getPokemons();
            return pokemons;
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }

    const pokemons = ref<Pokemon[]>([]);

    return {getPokemonsList, pokemons};
});
