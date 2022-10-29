import { createApp, provide, h } from 'vue';
import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { setContext } from '@apollo/client/link/context';
import Notifications from '@kyvg/vue3-notification';

import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';

// const httpLink = new HttpLink({
//   uri: 'http://127.0.0.1:4000/graphql',
// });

const cache = new InMemoryCache();

const authLink = setContext(async (_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      'x-jwt': token || '',
    },
  };
});

const additiveLink = from([authLink, new HttpLink({ uri: 'http://localhost:4000/graphql' })]);

const defaultClient = new ApolloClient({
  link: additiveLink,
  cache,
  connectToDevTools: true,
});

createApp({
  setup() {
    provide(DefaultApolloClient, defaultClient);
  },
  render: () => h(App),
})
  .use(store)
  .use(router)
  .use(Notifications)
  .mount('#app');
