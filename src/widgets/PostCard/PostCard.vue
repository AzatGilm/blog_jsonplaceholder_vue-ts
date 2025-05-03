<template>
  <article class="post-card">
    <h3>{{ post.title }}</h3>
    <p>{{ truncatedBody }}</p>
  </article>
</template>

<script lang="ts">
import { Post } from "@/entities/Post/types";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  name: "PostCard",
  components: {},
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },
  setup(props: {post: Post}) {
    const { post } = props;
    const truncatedBody = computed(() => {
      return post.body.length > 100
        ? post.body.substring(0, 100) + "..."
        : post.body;
    });
    return { truncatedBody };
  },
});
</script>

<style scoped>
.post-card {
  padding: 20px;
  margin-bottom: 15px;
  border: 1px solid #d3d3e6;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.post-card h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #2c3e50;
}
.post-card p {
  margin: 0;
  color: #666;
}

</style>
