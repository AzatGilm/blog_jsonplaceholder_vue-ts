import { createStore } from "vuex";
import { PostModule, type PostsState } from "../modules/posts";


export interface RootState {
  posts: PostsState;
}

export const store = createStore<RootState>({
  modules: {
    posts: PostModule
  }
});

export type AppStore = typeof store

declare module 'vuex' {
  export function useStore<S = RootState>(): AppStore
}