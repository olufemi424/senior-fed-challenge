<template>
    <div>
        <div v-if="viewType === 'grid'" class="pokemon__items-grid">
            <div v-for="pokemon in pokemonItems" :key="pokemon.id" class="pokemon__card">
                <img :src="pokemon.image" alt="" />
                <div class="pokemon__details">
                    <h3 class="pokemon__name">{{ pokemon.name }}</h3>
                    <div class="pokemon__types">
                        <div v-for="type in pokemon.types" :key="type" class="pokemon__type">
                            {{ type }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="viewType === 'list'" class="pokemon__items-list">
            <div v-for="pokemon in pokemonItems" :key="pokemon.id" class="pokemon__list-card">
                <img :src="pokemon.image" alt="" />
                <div class="pokemon__details">
                    <h3 class="pokemon__name">{{ pokemon.name }}</h3>
                    <div class="pokemon__types">
                        <div v-for="type in pokemon.types" :key="type" class="pokemon__type">
                            {{ type }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { PokemonSummary } from "../types/pokemonTypes.interface";
export default defineComponent({
    name: 'PokemonList',
    props: {
        pokemonItems: {
            type: Array as PropType<PokemonSummary[]>,
            default: () : PokemonSummary[] => ([]),
            required: true
        },
        viewType: {
            type: String,
            default: () => 'grid',
        }
    },
});
</script>

<style scoped>
.pokemon__items-grid {
    display: flex;
    flex-wrap: wrap;
}

.pokemon__card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 26px 5px rgb(0 0 0 / 10%);
    flex-basis: 0;
    flex-grow: 1;
    height: 180px;
    margin: 0 0 8px;
    max-width: 218px;
    min-width: 200px;

    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-inline-end: 16px;
    padding: 12px 0;
}

.pokemon__details {
    box-sizing: border-box;
    padding-inline-start: 12px;
    width: 100%;
}

.pokemon__name {
    margin: 0;
    margin-block-end: 16px;
}

.pokemon__types {
    display: flex;
}

.pokemon__type {
    align-items: center;
    background-color: #e0e8eb;
    border-radius: 4px;
    border: 0;
    color: #648d9b;
    display: flex;
    font-size: 12px;
    margin-inline-end: 8px;
    padding: 4px;
}

.pokemon__card img {
    height: 80px;
    width: 80px;
}

/* list card items */
.pokemon__list-card {
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 26px 5px rgb(0 0 0 / 10%);
    display: flex;
    height: 105px;
    justify-content: center;
    margin-block: 8px;
}

.pokemon__list-card img {
    height: 86px;
    margin-inline-start: 16px;
    min-width: 80px;
}
</style>