<template>
  <div class="w-full max-w-screen-sm flex flex-col items-center px-5">
    <img src="@/assets/uber.svg" class="w-52 mb-5" />

    <h4 class="text-left w-full text-3xl mb-10 font-medium">Lets get started</h4>
    <form class="grid gap-3 mt-5 w-full" @submit.prevent="loginUser">
      <UberInput v-model="email" label="Email" />
      <UberInput v-model="password" label="Password" />
      <button>Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import gql from 'graphql-tag';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import loginMutation from '@/graphql/mutations/loginMutation.gql';
// import getCurrentUser from '@/graphql/queries/getCurrentUser.gql';
import UberInput from '@/components/UberInput.vue';
import { useMe } from '@/hooks/useGetCurrentUser';

export default defineComponent({
  name: 'Login',
  components: {
    UberInput,
  },
  setup() {
    const email = ref<string>('');
    const password = ref<string>('');
    const authToken = ref<string>('');

    const router = useRouter();

    const ME_QUERY = gql`
      query meQuery {
        me {
          id
          role
          email
          verified
          isAuthenticated
      }
  }
`;

    // const currentUser = useResult(result, null, (data) => data.me);

    const { result: user, variables } = useQuery();

    const currentUser = computed(() => {
      return user.value.me;
    });

    const isUserAuthenticated = computed(() => {
      return user.value.me.isAuthenticated;
    });

    const { mutate: loginUser, onDone } = useMutation(loginMutation, () => ({
      variables: {
        email: email.value,
        password: password.value,
        isAuthenticated: true,
      },
      update: (cache, { data: { loginUser } }) => {
        let data = cache.readQuery({ query: user })
        data = {
          ...data,
          messages: [
            ...data.messages,
            sendMessage,
          ],
        }
        cache.writeQuery({ query: MESSAGES, data })
      },
    }));

    console.log(isUserAuthenticated)

    onDone((loginMutation) => {
      localStorage.setItem('token', loginMutation.data?.login.token as string);
      router.push('/');
    });

    return {
      email,
      password,
      router,
      authToken,
      currentUser,
      // result,
      loginUser,
      user,
      isUserAuthenticated,
    };
  },
});
</script>

<style></style>
