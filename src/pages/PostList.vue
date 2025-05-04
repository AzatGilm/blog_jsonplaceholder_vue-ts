<template>
  <div class="post-list">
    <search-input v-model="searchQuery" />
    <div v-if="loading">Загрузка...</div>
    <div v-else>
      <post-card
        v-for="post in paginatedPosts"
        :key="post.id"
        :post="post"
        @click="goToPost(post.id)"
      />
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @page-change="setCurrentPage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import PostCard from "@/widgets/PostCard/PostCard.vue";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { RootState } from "../shared/store";
import Pagination from "@/shared/UI/Pagination.vue";
import SearchInput from "@/shared/UI/SearchInput.vue";
// import PostDetails from "./PostDetails.vue";

export default defineComponent({
  name: "PostList",
  components: { PostCard, Pagination, SearchInput },

  setup() {
    const store = useStore<RootState>();
    const router = useRouter();
    const postsPerPage: number = 10;

    if (!store.state.posts.loading && store.state.posts.all.length === 0) {
      store.dispatch("posts/fetchAll");
    }

    // console.log("test:", store.state.posts);
    const currentPage = computed(() => store.state.posts.currentPage);
    const loading = computed<boolean>(() => store.state.posts.loading);

    const totalPages = computed(() =>
      store.getters["posts/totalPages"](postsPerPage)
    );
    const searchQuery = computed({
      get: () => store.state.posts.searchQuery,
      set: (val) => store.commit("posts/SET_SEARCHQUERY", val),
    });
    const paginatedPosts = computed(() =>
      store.getters["posts/paginated"](postsPerPage)
    );
    const goToPost = (id: number) => {
      router.push(`/posts/${id}`);
    };
    const setCurrentPage = (page: number) => {
      store.commit('posts/SET_CURRENT_PAGE', page);
    };

    return {
      paginatedPosts,
      currentPage,
      totalPages,
      searchQuery,
      loading,
      goToPost,
      setCurrentPage
    };
  },
});
</script>

<style>
.post-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
