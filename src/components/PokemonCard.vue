<template>
    <div :class="['pokemon__card', isList && 'list-item']">
        <router-link :to="{ path: `/pokemon/${pokemon.id}` }">
            <img :src="pokemon.image" :alt="pokemon.name" />
        </router-link>
        <div class="pokemon__details">
            <router-link class="pokemon__name" :to="{ path: `/pokemon/${pokemon.id}` }">
                <h3>{{ pokemon.name }}</h3>
            </router-link>
            <div class="pokemon__details-action">
                <div class="pokemon__types">
                    <div v-for="type in pokemon.types" :key="type" class="pokemon__type">
                        {{ type }}
                    </div>
                </div>
                <FavoriteAction :pokemon="pokemon" @handle-favorite-pokemon="handleFavoritePokemon"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { PokemonSummary, Favorite, Pokemon } from "../types/pokemonTypes.interface";
import { favoritePokemon } from '../hook/favoritePokemon';
import FavoriteAction from './FavoriteAction.vue';
export default defineComponent({
    name: 'PokemonCard',
    components: {
        FavoriteAction,
    },
    props: {
        isList: {
            type: Boolean as PropType<Boolean>
        },
        pokemon: {
            type: Object as PropType<PokemonSummary>,
            required: true
        },
    },
    setup({}, { emit }) {
        return {
            // favorite pokemon
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
    &__card {
        align-items: center;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 26px 5px rgba(0,0,0,0.1);
        box-sizing: border-box;
        display: flex;
        flex-basis: 0;
        flex-direction: column;
        flex-grow: 1;
        height: 180px;
        justify-content: space-around;
        margin-block-end: 16px;
        margin-inline-end: 16px;
        max-width: 244px;
        min-width: 200px;
        padding: 12px 0;

        &.list-item {
            flex-direction: revert;
            height: 105px;
            margin-block: 8px;
            max-width: 100%;
            width: 100%;

            .pokemon__details {
                position: relative;
            }

            .pokemon__name {
                margin-block-end: 8px;
            }

            img {
                margin-inline: 16px;
                object-fit: contain;
            }

            .pokemon__favorite {
                position: absolute;
                right: 4px;
                top: 4px;
            }
        }
    }

    &__details {
        box-sizing: border-box;
        padding-inline-start: 12px;
        width: 100%;
    }

    &__name {
        color: inherit;
        text-decoration: none;
    }

    &__name h3 {
        margin-block: 0 16px;
    }

    &__types {
        display: flex;
    }

    &__type {
        align-items: center;
        background-color: #e0e8eb;
        border-radius: 4px;
        border: 0;
        color: #648d9b;
        display: flex;
        font-size: 12px;
        margin-inline-end: 4px;
        padding: 4px;
    }

    &__card img {
        height: 80px;
        width: 80px;
        object-fit: contain;
    }

    &__details-action {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__favorite {
        margin-inline-end: 12px;
    }
}


</style>
