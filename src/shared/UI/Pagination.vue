<template>
  <div class="pagination">
    <button
      v-for="page in pages"
      :key="page"
      class="pagination-btn"
      :class="{ active: page === currentPage }"
      @click="$emit('page-change', page)"
    ></button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  emits: ["page-change"],
  setup({
    totalPages,
    currentPage,
  }: {
    totalPages: number;
    currentPage: number;
  }) {
    const pages = computed(() =>
      Array.from({ length: totalPages }, (_, i) => i + 1)
    );

    return { pages };
  },
});
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}
.pagination-btn {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}
.active {
  background: #42b983;
  color: white;
  border-color: #42b983;
}
</style>
