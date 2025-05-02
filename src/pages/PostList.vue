<template>
  <div class="post-list">
    <search-input v-model="searchQuery" />
    <post-card v-for="post in paginatedPosts" :key="post.id" :post="post" @click="goToPost(post.id)" />
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @page-change="setCurrentPage"
    />
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
    // console.log('test:' , store.state.posts);
    const router = useRouter();
    const postsPerPage: number = 10;

    if (store.state.posts.all.length === 0) {
      store.dispatch("posts/fetchAll");
      console.log(store.state.posts.all);
    }
    const currentPage = computed({
      get: () => store.state.posts.currentPage,
      set: (val) => store.commit("posts/SET_CURRENT_PAGE", val),
    });

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

    return {
      paginatedPosts,
      currentPage,
      totalPages,
      searchQuery,
      goToPost,
      setCurrentPage: (page: number) => (currentPage.value = page),
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
