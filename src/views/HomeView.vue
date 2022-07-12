<template>
    <div>
        <Tabs @select-favorites-pokemon="handleFavoriteSelected" :isFavorite="isFavorite" />

        <SearchFilters
            :pokemonTypes="pokemonTypeList.data"
            @filter-by-type="handleSearchType"
            :type="type"
        >
            <template #toggleView>
                <div class="pokemon__toggle-view">
                    <button @click="viewType = 'grid'">Grid view</button>
                    <button @click="viewType = 'list'">List view</button>
                </div>
            </template>
        </SearchFilters>
        
        <div class="pokemon__items">
            <h3 class="pokemon__loading" v-if="pokemons.loading">Loading...</h3>
            <h3 class="pokemon__error" v-if="!pokemons.loading && pokemons.error">{{ pokemons.error }}</h3>
            <PokemonList v-if="pokemons.data !== null" :pokemonItems="pokemons.data.items" :viewType="viewType"/>
            <h3 class="pokemon__not-found" v-if="pokemons.data !== null && pokemons.data.items.length === 0">No Pokemon Found</h3>
        </div>

        <Pagination 
            v-if="pokemons.data !== null && pokemons.data.items.length" 
            @pagination-item-clicked="handlePagePaginationClick" 
            :pagination="{
                limit: pokemons.data.limit,
                offset: pokemons.data.offset,
                count: pokemons.data.count,
            }" 
        />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { PokemonListResponse } from "../types/pokemonTypes.interface";
import { getAllPokemons, getPokemonTypes } from "../services/pokemonAPI";
import Pagination from '../components/Pagination.vue';
import PokemonList from '../components/PokemonList.vue';
import Tabs from '../components/Tabs.vue';
import SearchFilters from '../components/SearchFilters.vue';

import useFetch from '../hook/useFetch';

export default defineComponent({
    name: "HomeView",
    components: {
        Pagination,
        PokemonList,
        Tabs,
        SearchFilters,
    },
    setup() {
        const limit = ref(12);
        const offset = ref(0);
        const viewType = ref('grid')
        const searchParam = ref('');
        const isFavorite = ref(false);
        const type = ref('')
        const pokemonApiUrl = computed(() => `https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon?offset=${offset.value}&isFavorite=${isFavorite.value}&type=${type.value}&limit=${limit.value}`);
        const pokemonTypeList = useFetch<string[]>(computed(()=>'https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon-types'));
        const pokemons = useFetch<PokemonListResponse>(pokemonApiUrl);

        
        const handlePagePaginationClick = (page: number) : void => {
            offset.value = (page - 1) * limit.value
        }

        const handleFavoriteSelected = (value: boolean) => {
            isFavorite.value = value;
        } 

        const handleSearchType = (value: string) => {
            offset.value = 0;
            type.value = value;
        } 

        return {
            handleFavoriteSelected,
            handlePagePaginationClick,
            isFavorite,
            offset,
            pokemonApiUrl,
            pokemons,
            pokemonTypeList,
            searchParam,
            viewType,
            type,
            handleSearchType
        }  
    },
    data() {
        return {
            data: {} as PokemonListResponse,
            types: [] as String[],
        }
    },
    async mounted() {
        // this.initApp();
    },
    // computed: {
    //     pagination(): PaginationTypes {
    //         return {
    //             limit: this.data.limit,
    //             offset: this.data.offset,
    //             count: this.data.count,
    //         };
    //     },
    // },
    // methods: {
    //     async initApp(): Promise<void> {
    //         const res = await getAllPokemons();
    //         const pokemontypes = await getPokemonTypes();

    //         this.data = res;
    //         this.types = pokemontypes;
    //     },
    //     // handlePagePaginationClick(page: Number) {
    //     //     // make a request to API, calculate with the skip/limit 
    //     //     console.log(page)
    //     // }   
    // }
});
</script>

<style>
.pokemon__toggle-view {
    display: flex;
    justify-content: space-between;
    width: 30%;
}

.pokemon__toggle-view button {
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid teal;
    color: teal;
    padding: 7px 16px;
    text-decoration: none;
    width: 49%;

}

.pokemon__items {
    margin: 0 auto;
    max-width: 900px;
}

.pokemon__loading,
.pokemon__error,
.pokemon__not-found {
    margin: 64px auto;
    width:max-content;
}
</style>
