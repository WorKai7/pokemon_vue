<template>
    <div v-if="pokemonStore.pokemons.length > 0">
        <n-split direction="vertical">
            <template #1>
                <div id="deck">
                    <PokemonDeckComponent/>
                </div>
            </template>
            <template #2>
                <PokemonListComponent/>
            </template>
        </n-split>
    </div>
    <!-- Loader trouvé sur W3Schools -->
    <div v-else class="loader"></div>
</template>





<script setup lang="ts">
    import { useMessage } from 'naive-ui';
    import { usePokemonStore } from '../stores/pokemon.store.ts';
    import { onMounted } from 'vue';
    import PokemonListComponent from '../components/pokemons/PokemonList.component.vue';
    import PokemonDeckComponent from '../components/pokemons/PokemonDeck.component.vue';

    const message = useMessage();
    const pokemonStore = usePokemonStore();

    onMounted(async () => {
        try {
            pokemonStore.pokemons = await pokemonStore.getPokemonsList();
        } catch (error: any) {
            message.error("Erreur");
            console.log(error.message)
        }
    });
</script>





<style scoped>
    .loader {
        border: 16px solid #f3f3f3; /* Light grey */
        border-top: 16px solid #3498db; /* Blue */
        border-radius: 50%;
        width: 300px;
        height: 300px;
        animation: spin 0.5s linear infinite;
        position: fixed;
        right: 41.2%;
        top: 30%;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    #deck {
        margin-bottom: 20px;
    }
</style>