<template>
    <div class="pokemon">
        <Tabs @select-favorites-pokemon="handleFavoriteSelected" :isFavorite="isFavorite" />

        <SearchFilters
            :pokemonTypes="pokemonTypeList.data"
            @filter-by-type="handleSearchType"
            @search-term="handleSearchTerm"
            :type="type"
        >
            <template #toggleView>
                <div class="pokemon__toggle-view">
                    <button 
                        :class="[viewType === 'grid' && 'pokemon__toggle-view--selected']" 
                        @click="viewType = 'grid'"
                    >
                        Grid view
                    </button>
                    <button
                        :class="[viewType === 'list' && 'pokemon__toggle-view--selected']"
                        @click="viewType = 'list'"
                    >
                        List view
                    </button>
                </div>
            </template>
        </SearchFilters>
        
        <div class="pokemon__items">
            <h3 class="pokemon__loading" v-if="pokemons.loading">Loading...</h3>
            <h3 class="pokemon__error" v-if="!pokemons.loading && pokemons.error">{{ pokemons.error }}</h3>
            <PokemonList
                v-if="pokemons.data !== null" 
                :pokemonItems="pokemons.data.items"
                :viewType="viewType"
                @handle-favorite-pokemon="handleFavoritePokemon"
            />
            <h3 
                class="pokemon__not-found"
                v-if="pokemons.data !== null && pokemons.data.items.length === 0"
            >
                No Pokemon Found
            </h3>
        </div>

        <Pagination 
            v-if="pokemons.data !== null && pokemons.data.items.length" 
            @pagination-item-clicked="handlePagePaginationClick" 
            :pagination="pagination" 
        />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from "vue";
import { PokemonListResponse, Pokemon, PaginationTypes, PokemonSummary } from "../types/pokemonTypes.interface";
import Pagination from '../components/Pagination.vue';
import PokemonList from '../components/PokemonList.vue';
import Tabs from '../components/Tabs.vue';
import SearchFilters from '../components/SearchFilters.vue';

import useFetch from '../hook/useFetch';
import usePost from '../hook/favoritePokemon';

export default defineComponent({
    name: "HomeView",
    components: {
        Pagination,
        PokemonList,
        Tabs,
        SearchFilters,
    },
    setup() {
        // reactive variables
        const limit = ref<number>(12);
        const offset = ref<number>(0);
        const viewType = ref<string>('grid');
        const searchParam = ref<string>('');
        const isFavorite = ref<boolean>(false);
        const type = ref<string>('');

        // const favoriteUrl = computed(() => isFavorite.value ? `&isFavorite=${isFavorite.value}` : '');

        // computed variables
        const pokemonApiUrl = computed(() => {
                return `https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon?offset=${offset.value}&limit=${limit.value}${isFavorite.value ? `&isFavorite=${isFavorite.value}` : ''}&type=${type.value}&search=${searchParam.value}`
            });

        // reactive data driver for pokemon items list
        const pokemonTypeList = useFetch<string[]>(computed(() => 'https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon-types'));
        let pokemons = useFetch<PokemonListResponse>(pokemonApiUrl);


        const pagination =  computed(() => {
            if (pokemons.data) {
                return reactive({
                    limit: pokemons.data.limit,
                    offset: pokemons.data.offset,
                    count: pokemons.data.count,
                })
            }
        })

        if (pokemons.data) {
            pokemons.data.items[0].isFavorite = true;
        };

        // update pagination offset value 
        const handlePagePaginationClick = (page: number) : void => {
            offset.value = (page - 1) * limit.value;
        }

        // update tab selection
        const handleFavoriteSelected = (value: boolean) => {
            offset.value = 0;
            isFavorite.value = value;
        } 

        // update search type and reset the offset value 
        const handleSearchType = (value: string) => {
            offset.value = 0;
            type.value = value;
        } 

        // update search value
        const handleSearchTerm = (value: string) => {
            searchParam.value = value;
        } 

        const handleFavoritePokemon = (data: { id: Number, favorite: Boolean }) => {
            const { id, favorite } = data; // destructure id and favorite from data

            pokemons.data?.items.forEach((item: PokemonSummary) => {
                // update the current item isFavorite value
                if (item.id == id && favorite) {
                    item.isFavorite = true;
                } else if (item.id == id && !favorite) {
                    item.isFavorite = false; // update single item on the all page

                    // if user is on the favorite page, remove the unfavorite item from  the list
                    if (isFavorite.value && pokemons.data) {
                        pokemons.data.items = pokemons.data?.items.reduce((items: any, pk) => {
                            if (pk.isFavorite === true) {
                                items.push(pk);
                            };

                            return items;
                        }, []);

                        // buggy pagination here
                        // if an item is unfavorite, on a page that is greater than 1, show previous page
                        // if an item is unfavorite and re-fetch the items to show proper pagination and items
                    }
                }
            })
        }

        // window.onscroll = () => {
        //     let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

        //     if (bottomOfWindow) {
        //         console.log(123)
        //         offset.value = offset.value / limit.value * limit.value;
        //         const morepokemons = useFetch<PokemonListResponse>(pokemonApiUrl);

        //         console.log(pokemons.data)

        //         if (pokemons.data && morepokemons.data) {
        //             const { items } = morepokemons.data;
        //             console.log(items)
        //             // pokemons.data.items.push(items)
        //         }

        //     }
        // };

        return {
            handleFavoritePokemon,
            handleFavoriteSelected,
            handlePagePaginationClick,
            handleSearchTerm,
            handleSearchType,
            isFavorite,
            offset,
            pokemonApiUrl,
            pokemons,
            pokemonTypeList,
            searchParam,
            type,
            viewType,
            pagination,
        }  
    },
});
</script>

<style lang="stylus">
.pokemon {
    &__toggle-view {
        display: flex;
        justify-content: space-between;
        width: 30%;
    }

    &__toggle-view button {
        background-color: #fff;
        border-radius: 8px;
        border: 1px solid teal;
        color: teal;
        padding: 7px 16px;
        text-decoration: none;
        width: 49%;
    }

    &__toggle-view button:not(.pokemon__toggle-view--selected):hover {
        font-weight: bold;
        background-color: lightblue;
    }

    &__items {
        margin: 0 auto;
        max-width: 900px;
    }

    &__loading,
    &__error,
    &__not-found {
        margin: 64px auto;
        width:max-content;
    }

    button.pokemon__toggle-view--selected {
        background-color: teal;
        font-weight: bold;
        color: #fff;
    }
}
</style>
