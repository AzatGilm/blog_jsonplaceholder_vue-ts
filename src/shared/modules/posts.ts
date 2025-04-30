import type { Module } from "vuex/types/index.js";
import type { Post } from "../../entities/Post/types";
import type { Rootstate } from "../store";

export interface PostsState {
  all: Post[];
  filtered: Post[];
  searchQuery: string;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

export const PostModule: Module<PostsState, Rootstate> = {
  namespaced: true,
  state: (): PostsState => ({
    all: [],
    filtered: [],
    searchQuery: "",
    currentPage: 1,
    loading: false,
    error: null,
  }),
  mutations: {
    SET_POSTS(state: PostsState, posts: Post[]) {
      state.all = posts;
      state.filtered = posts;
    },
    SET_SEARCHQUERY(state: PostsState, query: string) {
      const lowerCaseQuery = query.toLocaleLowerCase();
      state.searchQuery = lowerCaseQuery;
      state.filtered = state.all.filter((el) => {
        return el.title.toLocaleLowerCase().includes(lowerCaseQuery);
      });
    },
    SET_CURRENT_PAGE(state: PostsState, page: number) {
      state.currentPage = page;
    },
    SET_LOADING(state: PostsState, value: boolean) {
      state.loading = value;
    },
    SET_ERROR(state, error: string | null) {
      state.error = error;
    },
  },
  actions: {
    async fetchAll({ commit }) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error("Fetching failed");
        }
        const posts = await response.json();
        commit("SET_POSTS", posts);
      } catch (error) {
        commit(
          "SET_ERROR",
          error instanceof Error ? error.message : "Unknown error"
        );
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  getters: {
    getById: (state: PostsState) => (id: number) =>
      state.all.find((el) => el.id == id),
    totalPages:
      (state: PostsState) =>
      (perPage: number): number =>
        Math.ceil(state.filtered.length / perPage),
    paginated:
      (state: PostsState) =>
      (perPage: number): Post[] => {
        const start = (state.currentPage - 1) * perPage;
        const end = start + perPage;
        return state.filtered.slice(start, end);
      },
  },
};
