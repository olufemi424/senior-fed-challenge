<template>
    <div class="pokemon__favorite">
        <button @click="handleFavoritePokemon({favorite: false, id: pokemon.id})" v-if="pokemon.isFavorite">❤️</button>
        <button @click="handleFavoritePokemon({favorite: true, id: pokemon.id})"  v-else>🤍</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { PokemonSummary, Favorite, Pokemon } from "../types/pokemonTypes.interface";
import { favoritePokemon } from '../hook/favoritePokemon';
export default defineComponent({
    name: 'Favortie',
    props: {
        pokemon: {
            type: Object as PropType<PokemonSummary>,
            required: true
        },
    },
    setup({}, { emit }) {
        return {
            async handleFavoritePokemon (data: Favorite) {
                const res: Pokemon = await (await favoritePokemon(data.id, data.favorite)).json();
                if (res.id === data.id) {
                    emit('handle-favorite-pokemon', data);
                } else {
                    // error can be handled using tost message or give some kind of feedback to the user
                    console.log('Error posting data')
                }
            },
        }
    },
});
</script>

<style lang="stylus" scoped>
.pokemon {
    &__favorite {
        margin-inline-end: 12px;
        box-shadow: 0 4px 26px 5px rgba(0,0,0,0.1);
        height: max-content;

        button {
            cursor: pointer;
            border: 1px solid rgba(255, 0, 0, 0.357);
            border-radius: 4px;
        }
    }
}

.pokemon-item__favorite {
    margin: 0;

    button {
        font-size: 35px;
    }
}
</style>