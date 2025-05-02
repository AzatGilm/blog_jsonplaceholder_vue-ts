<template>
  <div class="post-list">
    <post-card v-for="post in paginatedPosts" :key="post.id" :post="post" />

    <Pagination :currentPage="currentPage" :totalPages="totalPages" />
  </div>
</template>

<script lang="ts">
import PostCard from "@/widgets/PostCard/PostCard.vue";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { RootState } from "../shared/store";
import Pagination from "@/shared/UI/Pagination.vue";
// import PostDetails from "./PostDetails.vue";

export default defineComponent({
  name: "PostList",
  components: { PostCard, Pagination },

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
    const paginatedPosts = computed(() =>
      store.getters["posts/paginated"](postsPerPage)
    );

    return {
      paginatedPosts,
      currentPage,
      totalPages
    };
  },
});
</script>

<style></style>
