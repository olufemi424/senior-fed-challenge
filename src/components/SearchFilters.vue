<template>
    <div class="pokemon-search">
        <div class="pokemon-search__filter">
            <input v-model="searchTerm" @input="searchParam" type="text" placeholder="e.g. Charizard">
            <select name="types" id="pokemon-types" :value="type" @change="$emit('filter-by-type', $event.target.value)">
                <option value="">--All--</option>
                <option v-for="t in pokemonTypes" :value="t" :key="t">{{ t }}</option>
            </select>
        </div>
        <slot name="toggleView" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

interface InputFileEvent extends Event {
    target: HTMLInputElement;
}

export default defineComponent({
    name: 'SearchFilters',
    props: {
        pokemonTypes: {
            type: Array as PropType<String[]>
        },
        type: {
            type: String as PropType<String>
        }
    },
    setup(props, { emit }) {
        const searchTerm = ref<string>('');
        function searchParam(e: InputFileEvent) {
            setTimeout(() => {
                emit('search-term', e.target.value);
            }, 1000);
        };

        return {
            searchTerm,
            searchParam
        };
    }
});

</script>

<style scoped>
.pokemon-search {
    display: flex;
    margin: 32px auto;
    max-width: 900px;
}

.pokemon-search__filter {
  align-items: center;
  display: flex;
  justify-content: space-around;
  width: 70%;
}

.pokemon-search__filter input {
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid teal;
    padding: 7px 0;
    text-indent: 10px;
    width: 48%;
}

.pokemon-search__filter select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNC45NSIgaGVpZ2h0PSIxMCIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxLjQxIDQuNjcgMi40OCAzLjE4IDMuNTQgNC42NyAxLjQxIDQuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMy41NCA1LjMzIDIuNDggNi44MiAxLjQxIDUuMzMgMy41NCA1LjMzIi8+PC9zdmc+) no-repeat 100% 50%;
    border-radius: 8px;
    border: 1px solid teal;
    padding: 7px 0;
    text-indent: 10px;
    width: 48%;
}
</style>