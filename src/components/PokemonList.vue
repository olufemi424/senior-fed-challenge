<template>
    <div :class="[viewType === 'list' ? 'pokemon__items-list' : 'pokemon__items-grid']">
        <PokemonCard
            v-for="pokemon in pokemonItems"
            :key="pokemon.id" 
            :pokemon="pokemon" 
            :isList="viewType === 'list'"
            @handle-favorite-pokemon="handleFavoritePokemon"
        /> 
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { PokemonSummary } from "../types/pokemonTypes.interface";
import PokemonCard from "./PokemonCard.vue";

export default defineComponent({
    name: 'PokemonList',
    components: {
        PokemonCard,
    },
    props: {
        pokemonItems: {
            type: Array as PropType<PokemonSummary[]>,
            default: () : PokemonSummary[] => ([]),
            required: true
        },
        viewType: {
            type: String as PropType<String>,
            default: (): String => 'grid',
        }
    },
    setup(props, { emit }) {
        return {
            handleFavoritePokemon(id: String) {
                emit('handle-favorite-pokemon', id);
            }
        }
    }
});
</script>

<style lang="stylus" scoped>
.pokemon {
    &__items-grid {
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
    }
}

</style>