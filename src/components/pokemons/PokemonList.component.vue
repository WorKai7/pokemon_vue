<template>
    <div id="search-bar-div">
        <n-input v-model:value="searchInput" id="search-bar" type="text" placeholder="Rechercher"></n-input>
    </div>
    <n-grid v-if="filteredPokemons.length > 0" :x-gap="12" :y-gap="8" :cols="6">
        <n-grid-item v-for="pokemon in filteredPokemons">
            <div @click="deckStore.addPokemonToDeck(pokemon)">
                <PokemonCardComponent :pokemon="pokemon" />
            </div>
        </n-grid-item>
    </n-grid>
    <div v-else>
        <h1>Aucun pokémon trouvé</h1>
    </div>
</template>




<script setup lang="ts">
    import { computed, ref } from 'vue';
    import PokemonCardComponent from './PokemonCard.component.vue';
    import { useDeckStore } from '../../stores/deck.store.ts';
    import { usePokemonStore } from '../../stores/pokemon.store.ts';

    const pokemonStore = usePokemonStore();
    const deckStore = useDeckStore();

    const searchInput = ref('');
    const filteredPokemons = computed(() => {
        return pokemonStore.pokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchInput.value)
        );
    });
</script>




<style scoped>
    #search-bar-div {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    #search-bar {
        width: 750px;
        margin-top: 50px;
        margin-bottom: 20px;
    }

    h1 {
        text-align: center;
    }
</style>