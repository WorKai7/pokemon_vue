<template>
    <n-card
        content-style="padding: 0"
        footer-style="background-color: #ededed; margin: 20px; border-radius: 5px; padding: 0 12px 0 12px;"
        style="border-radius: 5px; box-shadow: 0 4px 10px lightgray;"
    >
        <template #header>{{ pokemon.name }}</template>
        <template #header-extra>
            <h3 id="hp">PV {{ pokemon.lifePoints }}</h3>
            <n-tag v-if="!preview" :color="{color: colorAssociations[(pokemon as Pokemon).type.name]}" round>{{ (pokemon as Pokemon).type.name }}</n-tag>
        </template>
        <template #cover>
            <img :src="pokemon.imageUrl" :alt="pokemon.name">
        </template>
        <p>Taille: {{ pokemon.height }}m | Poids: {{ pokemon.weight }}kg</p>
        <template v-if="!preview" #footer>
            <div id="footer">
                <h2>{{ (pokemon as Pokemon).attack.name }}</h2>
                <h2 id="damages">PV {{ (pokemon as Pokemon).attack.damages }}</h2>
            </div>
        </template>
    </n-card>
</template>





<script lang="ts" setup>
    import type { PropType } from 'vue';
    import type { Pokemon, PokemonPreview } from '../../types/common.type';

    defineProps({
        pokemon: {
            type: Object as PropType<Pokemon | PokemonPreview>,
            required: true
        },
        preview: Boolean
    });

    const colorAssociations: any = {
        "Grass": "limegreen",
        "Fire": "orange",
        "Water": "deepskyblue",
        "Bug": "olive",
        "Poison": "magenta",
        "Electric": "gold",
        "Ground": "goldenrod"
    };
</script>





<style scoped>
    #hp {
        color: red;
        margin-right: 20px;
    }

    p {
        text-align: center;
        margin: 0;
    }

    #footer {
        display: flex;
        justify-content: space-between;
    }

    #damages {
        color: red;
        font-weight: 500;
    }

    h2 {
        margin: 8px;
    }
</style>