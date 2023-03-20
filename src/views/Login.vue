<template>
  <div class="w-full max-w-screen-sm flex flex-col items-center px-5">
    <img src="@/assets/uber.svg" class="w-52 mb-5" />

    <h4 class="text-left w-full text-3xl mb-10 font-medium">Lets get started</h4>
    <form class="grid gap-3 mt-5 w-full" @submit.prevent="loginUser">
      <UberInput v-model="email" label="Email" />
      <UberInput v-model="password" label="Password" />
      <UberButton text="Login" :isDisabled="false" :isLoading="false" type="uber"> </UberButton>
      <div class="mt-4 text-center">
        <span class="text-sm text-center">
          Don't have account?
          <router-link class="text-green-500 text-sm cursor-pointer" :to="{ name: 'register' }"
            >Register</router-link
          >
        </span>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, Ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import loginMutation from '@/graphql/mutations/loginMutation.gql';
import UberInput from '@/components/UberInput.vue';
import UberButton from '@/components/UberButton.vue';
import { notify } from '@kyvg/vue3-notification';
import { email } from '@vuelidate/validators';

export default defineComponent({
  name: 'Login',
  components: {
    UberInput,
    UberButton,
  },
  setup() {
    const email = ref<string>('');
    const password = ref<string>('');
    const authToken = ref<string>('');

    const router = useRouter();

    const { mutate: loginUser, onDone } = useMutation(loginMutation, () => ({
      variables: {
        email: email.value,
        password: password.value,
      },
    }));

    onDone((loginMutation) => {
      localStorage.setItem('token', loginMutation.data?.login.token as string);
      const isAuthToken = localStorage.getItem('token');
      console.log(isAuthToken);
      if (isAuthToken !== '') {
        router.push('/');
        notify({
          text: `You are logged in`,
        });
      }
    });

    return {
      email,
      password,
      router,
      authToken,
      // currentUser,
      // result,
      loginUser,
    };
  },
});
</script>

<style></style>
