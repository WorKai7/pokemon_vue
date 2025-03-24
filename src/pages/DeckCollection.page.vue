<template>
    <div v-if="!loading">
        <h1>Liste des decks</h1>
        <div v-if="userDecks.length === 0">
            <h2>Aucun deck trouvé</h2>
        </div>
        <div v-else>
            <n-table :bordered="false" :single-line="false" size="large" striped>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom du deck</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Tableau -->
                    <tr v-for="deck in userDecks">
                        <td>{{ deck.id }}</td>
                        <td>{{ deck.name }}</td>
                        <td class="actions">
                            <n-button type="info" @click="deckModal = deck.id">Détails</n-button>
                            <n-button type="error" @click="deleteModal = true">Supprimer</n-button>
                        </td>

                        <!-- Modale de suppression -->
                        <n-modal v-model:show="deleteModal">
                            <n-card title="Confirmer la suppression" class="deleteModalCard">
                                <p>Êtes-vous sûr de vouloir supprimer ce deck ?</p>
                                <template #footer>
                                    <div class="modalActions">
                                        <n-button type="primary" ghost @click="deleteModal = false">Annuler</n-button>
                                        <n-button type="error" @click="delDeck(deck.id)">Supprimer</n-button>
                                    </div>
                                </template>
                            </n-card>
                        </n-modal>

                        <!-- Modale de visualisation -->
                         <n-modal v-if="deckModal === deck.id" v-model:show="deckModal">
                            <n-card title="Détails du deck" class="deckModalCard">
                                <n-grid v-if="deck.cards.length > 0" :x-gap="12" :y-gap="8" :cols="3">
                                    <n-grid-item v-for="pokemon in deck.cards">
                                        <PokemonCardComponent :pokemon="pokemon" preview/>
                                    </n-grid-item>
                                </n-grid>
                                <h2 v-else>Deck vide</h2>
                                <template #footer>
                                    <div class="modalActions">
                                        <n-button type="primary" ghost @click="deckModal = -1">Fermer</n-button>
                                    </div>
                                </template>
                            </n-card>
                         </n-modal>
                    </tr>
                </tbody>
            </n-table>
        </div>
    </div>
    <div v-else class="loader"></div>
</template>






<script lang="ts" setup>
    import { computed, onMounted, ref } from 'vue';
    import { useDeckStore } from '../stores/deck.store';
    import type { Deck } from '../types/common.type';
    import { useMessage } from 'naive-ui';
    import { useRouter } from 'vue-router';
    import PokemonCardComponent from '../components/pokemons/PokemonCard.component.vue';

    const deckStore = useDeckStore();
    const message = useMessage();
    const router = useRouter();

    const deleteModal = ref(false);
    const deckModal = ref(-1);
    const loading = ref(true);

    const userId = localStorage.getItem("userId") ?? -1;
    const decks = ref<Deck[]>([]);

    if (userId === -1) {
        message.error("Vous devez être connecté pour visulaliser vos decks");
        router.push("/login");
    }

    const userDecks = computed(() => {
        return decks.value.filter(deck => deck.ownerId === +userId);
    });
    
    const delDeck = async (id: number) => {
        try {
            await deckStore.removeDeck(id);
            message.success(`Le deck n°${id} à bien été supprimé`);
            deleteModal.value = false;
            decks.value = []
            decks.value = await deckStore.fetchDecks();
        } catch (error: any) {
            message.error("Erreur");
        }
    }

    onMounted(async () => {
        decks.value = await deckStore.fetchDecks();
        loading.value = false;
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

    .actions {
        display: flex;
        justify-content: center;
        gap: 10px;
        width: 250px;
    }

    td {
        min-width: 100px;
    }

    .modalActions {
        display: flex;
        justify-content: end;
        gap: 10px;
    }

    .deleteModalCard {
        width: 500px;
    }
    
    .deckModalCard {
        width: 1200px;
    }

    div {
        text-align: center;
    }
</style>