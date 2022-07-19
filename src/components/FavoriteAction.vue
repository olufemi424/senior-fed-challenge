<template>
    <div class="pokemon__favorite">
        <button @click="handleFavoritePokemon({favorite: false, id: pokemon.id})" v-if="pokemon.isFavorite">❤️</button>
        <button @click="handleFavoritePokemon({favorite: true, id: pokemon.id})"  v-else>🤍</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { PokemonSummary, Favorite, Pokemon } from "../types/pokemonTypes.interface";
import usePost from '../hook/favoritePokemon';
export default defineComponent({
    name: 'Favortie',
    props: {
        pokemon: {
            type: Object as PropType<PokemonSummary>,
            required: true
        },
    },
    setup(porps, { emit }) {
        return {
            handleFavoritePokemon (data: Favorite) {
                const res = usePost<Pokemon>(data.id, data.favorite);
                emit('handle-favorite-pokemon', data);
            },
        }
    },
});
</script>

<style lang="stylus" scoped>
.pokemon {
    &__favorite {
        margin-inline-end: 12px;
    }
}


</style>