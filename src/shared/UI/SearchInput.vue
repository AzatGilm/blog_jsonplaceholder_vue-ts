<template>
  <div class="search-input">
    <input
      type="text"
      placeholder="Search value..."
      :value="modelValue"
      @input="handleInput($event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchInput",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(
    props: { modelValue: string },
    { emit }: { emit: (event: "update:modelValue", value: string) => void }
  ) {
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit("update:modelValue", target.value);
    };

    return { handleInput };
  },
});
</script>

<style scoped>
.search-input {
  margin-bottom: 20px;
}
.search-input input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}
</style>
