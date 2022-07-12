<template>
    <div class="pokemon__tabs">
        <button 
            @click="$emit('select-favorites-pokemon', false)" 
            :class="['pokemon__tabs-item', !isFavorite && 'active']"
        >
            All
        </button>

        <button
            @click="$emit('select-favorites-pokemon', true)"
            :class="['pokemon__tabs-item', isFavorite && 'active']"
        >
            Favorites
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
    name: 'Tabs',
    props: {
        isFavorite: {
            type: Boolean,
            default: (): boolean => false,
        }
    },
});

// todo, work on is active and styling accordingly
</script>

<style scoped>
.pokemon__tabs {
    border-bottom: 1px solid #e0e8eb;
    display: flex;
    justify-content: space-around;
    margin-bottom: 16px;
    margin: 16px auto;
    max-width: 900px;
    width: 100%;
}

.pokemon__tabs-item {
    background-color: #fff;
    border-radius: 4px 4px 0 0;
    border: none;
    cursor: pointer;
    padding: 8px;
    width: 49%;
}

.pokemon__tabs-item:hover {
    background-color: lightblue;
}

.pokemon__tabs button.active {
    background-color: teal;
    color: #fff;
}
</style>