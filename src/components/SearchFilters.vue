<template>
    <div class="pokemon_search">
        <div class="pokemon__search-filter">
            <input type="text" placeholder="Search your favorite pokemon">
            <select name="types" id="pokemon-types" :value="type" @change="$emit('filter-by-type', $event.target.value)">
                <option value="">--All--</option>
                <option v-for="t in pokemonTypes" :value="t" :key="t">{{ t }}</option>
            </select>
        </div>
        <slot name="toggleView" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

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
});

// todo, work on is active and styling accordingly
</script>

<style scoped>
.pokemon_search {
    display: flex;
    margin: 32px auto;
    max-width: 900px;
}

.pokemon__search-filter {
  width: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.pokemon__search-filter input {
    width: 48%;
    padding: 7px 0;
    background-color: #fff;
    border: 1px solid teal;
    border-radius: 8px;
    text-indent: 10px;
}

.pokemon__search-filter select {
    width: 48%;
    padding: 7px 0;
    background-color: #fff;
    border: 1px solid teal;
    border-radius: 8px;

    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNC45NSIgaGVpZ2h0PSIxMCIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxLjQxIDQuNjcgMi40OCAzLjE4IDMuNTQgNC42NyAxLjQxIDQuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMy41NCA1LjMzIDIuNDggNi44MiAxLjQxIDUuMzMgMy41NCA1LjMzIi8+PC9zdmc+) no-repeat 100% 50%;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    text-indent: 10px;
    
}
</style>