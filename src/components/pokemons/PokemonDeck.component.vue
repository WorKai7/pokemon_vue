<template>
    <h2>Deck ({{ deckStore.pokemonsInDeck.length }} cartes)</h2>
    <div id="deck-header">
        <n-input type="text" v-model:value="deckName" placeholder="Nom du deck..."></n-input>
        <n-button type="primary" @click="saveDeck()">Sauvegarder</n-button>
    </div>
    <n-grid v-if="deckStore.pokemonsInDeck.length > 0" :x-gap="12" :y-gap="8" :cols="6">
        <n-grid-item v-for="(pokemon, index) in deckStore.pokemonsInDeck">
            <div @click="deckStore.removeCardFromDeck(index)">
                <PokemonCardComponent :pokemon="pokemon"/>
            </div>
        </n-grid-item>
    </n-grid>
</template>





<script setup lang="ts">
    import { ref } from 'vue';
    import type { DeckInput } from '../../types/common.type';
    import PokemonCardComponent from './PokemonCard.component.vue';
    import { useDeckStore } from '../../stores/deck.store';
    import { useMessage } from 'naive-ui';

    const message = useMessage();
    const deckStore = useDeckStore();
    const deckName = ref('');

    const saveDeck = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            message.error("Vous devez être connecté pour sauvegarder un deck");
            return;
        }

        try {
            const deck: DeckInput = {
                name: deckName.value,
                cards: deckStore.pokemonsInDeck.map(pokemon => pokemon.id)
            }

            await deckStore.saveDeck(deck);
            message.success(`Le deck "${deckName.value}" à été sauvegardé avec succès`);

        } catch (error: any) {
            console.log(error.message);
        }
    }
</script>





<style scoped>
    #deck-header {
        width: 500px;
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
    }
</style>