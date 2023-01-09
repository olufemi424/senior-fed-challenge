<template>
    <div class="pokemon-item">
        <nav>
            <a class="pokemon-item__all-button" href="/">← All Pokemon</a>
            <p class="pokemon-item__breakcrumb-title" v-if="pokemon.data !== null">{{ pokemon.data.name }}</p>
        </nav>

        <h3 class="pokemon__loading" v-if="pokemon.loading">Loading...</h3>
        <h3 class="pokemon__error" v-if="!pokemon.loading && pokemon.error">{{ pokemon.error }}</h3>

        <div class="pokemon-item__container" v-if="pokemon.data !== null">
            <h3 class="pokemon-item__name">{{ pokemon.data.name }}</h3>
            <div class="pokemon-item__info">
                <div class="pokemon-item__image">
                    <img :src="pokemon.data.image" :alt="pokemon.name" />
                </div>
                <div class="pokemon-item__details">
                    <div class="pokemon-item__actions">
                        <div>
                            <button class="pokemon-item__sound-button" @click.prevent="handlePlayAudio" type="button">🔊</button>
                            <audio ref="audioElement" :src="pokemon.data.sound">
                                Your browser does not support the <code>audio</code> element.
                            </audio>
                        </div>
                        <FavoriteAction class="pokemon-item__favorite" @handle-favorite-pokemon="handleFavoriteCurrentPokemon" :pokemon="pokemon.data" />
                    </div>

                    <h4>Types</h4>
                    <div class="pokemon-item__types">
                        <div v-for="type in pokemon.data.types" :key="type" class="pokemon-item__type">
                            {{ type }}
                        </div>
                    </div>

                    <div class="pokemon-item__dimensions">
                        <p>Weight: {{ pokemon.data.weight.minimum }} - {{ pokemon.data.weight.maximum }}</p>
                        <p>Height: {{ pokemon.data.height.minimum }} - {{ pokemon.data.height.maximum }}</p>
                    </div>

                    <div class="pokemon-item__cap">
                        <p>CP: {{ pokemon.data.maxCP }}</p>
                        <p>HP: {{ pokemon.data.maxHP }}</p>
                    </div>


                </div>
            </div>
            <div v-if="pokemon.data.evolutions.length" class="pokemon-item__evolutions">
                <h3>Evolutions</h3>
                <div class="pokemon-item__evolutions-items">
                    <PokemonCard v-for="pok in pokemon.data.evolutions" :key="pok.id" :pokemon="pok" @handle-favorite-pokemon="handleFavoritePokemon"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { Favorite, Pokemon, PokemonSummary } from "../types/pokemonTypes.interface";
import { useRoute } from "vue-router";
import useFetch from '../hook/useFetch';
import PokemonCard from "../components/PokemonCard.vue";
import FavoriteAction from '../components/FavoriteAction.vue';


export default defineComponent({
    name: "PokemonItem",
    components: {
        PokemonCard,
        FavoriteAction,
    },
    setup() {
        const route = useRoute()
        const pokemonApiUrl = computed(() => `https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/${route.params.id}`);
        const pokemon = useFetch<Pokemon>(pokemonApiUrl);

        const audioElement = ref<HTMLAudioElement | null >(null);

        onMounted(() => {});

        const handlePlayAudio = () => {
            if (audioElement.value) {
                audioElement.value.play();
            }
        }

        const handleFavoritePokemon = (data: Favorite) => {
            const { id, favorite } = data;

            pokemon.data?.evolutions.forEach((item: PokemonSummary) => {
                // update the current item isFavorite value
                if (item.id == id && favorite) {
                    item.isFavorite = true;
                } else if (item.id == id && !favorite) {
                    item.isFavorite = false; // update single item on the all page
                }
            });
        }

        const handleFavoriteCurrentPokemon = (data: Favorite) => {
            if (pokemon.data) {
                pokemon.data.isFavorite = !pokemon.data.isFavorite;
            }
        }

        return {
            pokemon,
            audioElement,
            handlePlayAudio,
            handleFavoritePokemon,
            handleFavoriteCurrentPokemon
        }
    },
});
</script>

<style lang="stylus" scoped>
.pokemon-item {
    &__container {
        margin: 24px auto;
        max-width: 900px;
    }

    nav {
        align-items: center;
        background: #fff;
        box-shadow: 0 4px 15px 2px rgba(0,0,0,0.1);
        display: flex;
        height: 50px;
        width: 100%;
    }

    &__all-button {
        background-color: teal;
        border-radius: 4px;
        border: 0;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        margin-inline: 4px 16px;
        padding: 8px;
        text-decoration: none;
    }

    &__breakcrumb-title {
        align-items: center;
        border-left: 1px solid grey;
        display: flex;
        height: 70%;
        padding-inline-start: 12px;
    }

    &__name {
        font-size: 24px;
        text-align: center;
    }

    &__info {
        align-items: center;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 26px 5px rgba(0,0,0,0.1);
        display: flex;
        justify-content: space-around;
        padding: 16px;

        @media (min-width: 320px) {
            flex-direction: column;
        }

        @media (min-width: 767px) {
            flex-direction: row;
        }
    }

    &__image img {
        width: 80%;
        object-fit: contain;
    }

    &__details,
    &__image {
        @media (min-width: 320px) {
            width: 100%;
        }
        width: 50%;
    }

    &__image {
        @media (min-width: 320px) {
            display: flex;
            justify-content: center;
        }
    }

    @media (min-width: 767px) {
        &__image img {
            width: 80%;
        }
    }

    &__actions {
        display: flex;
        justify-content: space-between;

         @media (min-width: 320px) {
            margin-block: 16px;
        }
    }

    &__sound-button {
        background-color: transparent;
        border-radius: 4px;
        border: 1px solid rgba(128, 128, 128, 0.378);
        cursor: pointer;
        font-size: 35px;
    }

    &__types {
        display: flex;
        margin-block: 6px;
    }

    &__type {
        align-items: center;
        background-color: #e0e8eb;
        border-radius: 4px;
        border: 0;
        color: #648d9b;
        display: flex;
        font-size: 16px;
        margin-inline-end: 8px;
        padding: 8px;
    }

    &__dimensions {
        background-color: rgba(58, 156, 221, 0.296);
        border-radius: 8px;
        margin-block: 4px;
        padding: 4px 8px;
    }

    &__cap {
        background-color: rgba(58, 221, 159, 0.296);
        border-radius: 8px;
        margin-block: 4px;
        padding: 4px 8px;
    }

    &__evolutions {
        margin: 24px 0;
    }
    &__evolutions-items {
        display: flex;
    }
}
</style>>
