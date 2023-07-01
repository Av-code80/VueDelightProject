import { createApp } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import App from "./App.vue";

const httpLink = createHttpLink({
  uri: "https://countries.trevorblades.com/",
  
});
const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

createApp(App).provide(DefaultApolloClient, apolloClient).mount("#app");