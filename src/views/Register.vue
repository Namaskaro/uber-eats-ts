<template>
  <div class="w-full max-w-screen-sm flex flex-col items-center px-5">
    <img src="@/assets/uber.svg" class="w-52 mb-5" />

    <h4 class="text-left w-full text-3xl mb-10 font-medium">Lets get started</h4>
    <form class="grid gap-3 mt-5 w-full" @submit.prevent="createAccount">
      <UberInput v-model="userEmail" label="Email">
        <template #icons>
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            <IconCheck iconColor="green" v-if="valid" />
            <IconError iconColor="red" v-if="v$.userEmail.$errors.length" />
          </div>
        </template>
      </UberInput>
      <p class="text-xs text-red-700" v-for="error of v$.userEmail.$errors" :key="error.$uid">
        {{ error.$message }}
      </p>
      <UberInput v-model="userPassword" label="Password" />
      <p class="text-xs text-red-700" v-for="error of v$.userPassword.$errors" :key="error.$uid">
        {{ error.$message }}
      </p>
      <button>Create Account</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { email, minLength, required } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import createAccountMutation from '@/graphql/mutations/createAccountMutation.gql';
import UberInput from '@/components/UberInput.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
import IconError from '@/components/icons/IconError.vue';

export default defineComponent({
  name: 'CreateAccount',
  components: {
    UberInput,
    IconCheck,
    IconError,
  },

  setup() {
    enum UserRole {
      Client = 'Client',
      Delivery = 'Delivery',
      Owner = 'Owner',
    }

    const userEmail = ref<string>('');
    const userPassword = ref<string>('');

    const rules = computed(() => ({
      userEmail: {
        required,
        email,
      },
      userPassword: {
        required,
        minLength: minLength(5),
      },
    }));

    const v$ = useVuelidate(rules, { userEmail }, { $autoDirty: true });
    const router = useRouter();

    const { mutate: createAccount, onDone } = useMutation(
      createAccountMutation,
      // gql`
      //   mutation createAccount($email: String!, $password: String!, $role: UserRole!) {
      //     createAccount(input: { email: $email, password: $password, role: $role }) {
      //       ok
      //       error
      //     }
      //   }
      // `,
      () => ({
        variables: {
          email: userEmail.value,
          password: userPassword.value,
          role: 'Owner' as UserRole,
        },
      }),
    );

    onDone(() => {
      router.push({ path: '/login' });

      console.log('Apollo is working');
    });

    // const registerUser = async () => {
    //   try {
    //     await createAccount();
    //   } finally {
    //     router.push('/login');
    //   }
    // };

    return {
      userEmail,
      userPassword,
      router,
      createAccount,
      rules,
      v$,
    };
  },
});
</script>

<style></style>
