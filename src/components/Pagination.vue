<template>
    <div v-if="pagination.count > pagination.limit">
        <nav>
            <ul class="pagination">
                <!-- back button -->
                <li class="pagination__item">
                    <button class="pagination__button" @click="$emit('pagination-item-clicked', paginationMeta.currentPage - 1)">Back</button>
                </li>

                <!-- always print the first  page -->
                <li :class="['pagination__item', paginationMeta.currentPage === 1 && 'pagination__item--current']">
                    <button class="pagination__button" @click="$emit('pagination-item-clicked', 1)">1</button>
                </li>

                <!-- if there are 8 or less pages, print out all pages -->
                <template v-if="paginationMeta.totalPages <= 8">
                    <li
                        v-for="i in range(2, paginationMeta.totalPages)"
                        :key="i"
                        :class="['pagination__item', paginationMeta.currentPage === i && 'pagination__item--current']"
                    >
                        <button class="pagination__button" @click="$emit('pagination-item-clicked', i)">{{ i }}</button>
                    </li>
                </template>

                <!-- if there are more than 8pages, do more logic to determine what pages to show -->
                <template v-else>
                    <!-- if current page is less or equal to 5, show pages, 2-8 and an ellipsis -->
                    <template v-if="paginationMeta.currentPage <= 5">
                        <li 
                            v-for="i in range(2, 9)" :key="i"
                            :class="['pagination__item', paginationMeta.currentPage === i && 'pagination__item--current']"
                        >
                            <button class="pagination__button" @click="$emit('pagination-item-clicked', i)">
                                {{ i }}
                            </button>
                        </li>

                        <li class="pagination__item">
                            <div class="pagination__button">○○○</div>
                        </li>
                    </template>

                    <!-- if current page not near the beginning or the end, show next and previous
                    pages ranges, with the current page in the middle -->
                    <template v-else-if="paginationMeta.currentPage >= 6 && paginationMeta.currentPage < paginationMeta.totalPages - 7">
                        <li class="pagination__item">
                            <div class="pagination__button">○○○</div>
                        </li>

                        <li 
                            v-for="i in range(paginationMeta.currentPage - 3, paginationMeta.currentPage + 4)"
                            :key="i"
                            :class="['pagination__item', paginationMeta.currentPage === i && 'pagination__item--current']"
                        >
                            <button class="pagination__button" @click="$emit('pagination-item-clicked', i + 1)">
                                {{ i }}
                            </button>
                        </li>
                    </template>

                    <!-- if current page not near the beginning or the end, show next and previous
                    pages ranges, with the current page in the middle -->
                    <template v-else>
                        <li class="pagination__item">
                            <div class="pagination__button">○○○</div>
                        </li>

                        <li
                            v-for="i in range(paginationMeta.totalPages - 7, paginationMeta.totalPages)" 
                            :key="i" 
                            :class="['pagination__item', paginationMeta.currentPage === i && 'pagination__item--current']"
                        >
                            <button class="pagination__button" @click="$emit('pagination-item-clicked', i)">
                                {{ i }}
                            </button>
                        </li>
                    </template>
                </template>

                <!-- always print the last page -->
                <li :class="['pagination__item', paginationMeta.currentPage === paginationMeta.totalPages && 'pagination__item--current']">
                    <button class="pagination__button" @click="$emit('pagination-item-clicked', paginationMeta.totalPages )">{{ paginationMeta.totalPages }}</button>
                </li>

                <!-- Next button -->
                <li class="pagination__item">
                    <button class="pagination__button" @click="$emit('pagination-item-clicked', paginationMeta.currentPage + 1)">Next</button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { PaginationTypes, paginationMetaTypes } from "../types/pokemonTypes.interface";

export default defineComponent({
    name: 'Pagination',
    props: {
        pagination: {
        type: Object as PropType<PaginationTypes>,
        required: true
        }
    },
    computed: {
        paginationMeta(): paginationMetaTypes {
            const { offset, limit, count } = this.pagination;
            return {
                currentPage: Math.ceil((offset / limit) + 1),
                totalPages: Math.ceil(count / limit)
            }
        }
    },
    methods: {
        range(start: number, end: number){
            const pageRange: number[] = [];
            for (let i: number = start; i < end; i++) {
                pageRange.push(i);
            }
            return pageRange;
        }
    }
});
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    list-style: none;
    padding-inline-start: 0;
    margin-block: 32px;
}

.pagination__item {
    margin: 4px 8px;
}

.pagination__button {
    background-color: transparent;
    border-radius: 8px;
    border: 0;
    color: #2c3e50;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    padding: 11px 16px;
    text-decoration: none;
    width: max-content;
}

.pagination__button:hover {
    background-color: #9ed5ff;
}

.pagination__item--current .pagination__button {
    background-color: #9ed5ff;
    color: #fff;
}
</style>