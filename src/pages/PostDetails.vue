<template>
  <div class="post-details">
    <button class="back-button" @click="goBack">Вернуться назад</button>
    <div v-if="loading" class="loading">Loading post...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="post" class="post-content">
      <h1>{{ post.title }}</h1>
      <p>{{ post.body }}</p>
    </div>
    <div v-else class="not-found">Post not found</div>
  </div>
</template>

<script lang="ts">
import { Post } from "@/entities/Post/types";
import { RootState } from "@/shared/store";
import { computed, defineComponent } from "vue";
import {
  type RouteLocationNormalized,
  type Router,
  useRoute,
  useRouter,
} from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "PostDetails",
  setup() {
    const store = useStore<RootState>();
    const route: RouteLocationNormalized = useRoute();
    const router: Router = useRouter();

    const postId = computed(() => Number(route.params.id));
    const post = computed<Post | undefined>(() =>
      store.getters["posts/getById"](postId.value)
    );
    console.log(post);

    const loading = computed<boolean>(() => store.state.posts.loading);
    const error = computed<string | null>(() => store.state.posts.error);

    if (!post.value && store.state.posts.all.length === 0) {
      store.dispatch("posts/fetchAll");
    }

    const goBack = () => {
      router.push("/");
    };

    return {
      post,
      error,
      loading,
      goBack,
    };
  },
});
</script>

<style scoped>
.post-details {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.back-button {
  padding: 8px 16px;
  margin-bottom: 20px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}
.post-content {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.post-content h1 {
  margin-top: 0;
  color: #2c3e50;
}
.loading, .error, .not-found {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}
.error {
  color: #e74c3c;
}</style>
