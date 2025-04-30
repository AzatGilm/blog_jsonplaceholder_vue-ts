import { createStore } from "vuex/types/index.js";
import { PostModule, type PostsState } from "../modules/posts";


export interface Rootstate {
  posts: PostsState;
}

export const store = createStore<Rootstate>({
  modules: {
    posts: PostModule
  }
});

export type Store =  typeof store;