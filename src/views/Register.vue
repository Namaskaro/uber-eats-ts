<template>
  <div class="w-full max-w-screen-sm flex flex-col items-center px-5">
    <img src="@/assets/uber.svg" class="w-52 mb-5" />

    <h4 class="text-left w-full text-3xl mb-10 font-medium">Lets get started</h4>
    <form class="grid gap-3 mt-5 w-full" @submit.prevent="createAccount">
      <UberInput v-model="userEmail" label="Email">
        <template #icons>
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            <IconCheck iconColor="green" v-if="isValid" />
            <IconError iconColor="red" v-if="v$.userEmail.$errors.length" />
          </div>
        </template>
      </UberInput>
      <p class="text-xs text-red-700" v-for="error of v$.userEmail.$errors" :key="error.$uid">
        {{ error.$message }}
      </p>
      <UberInput v-model="userPassword" label="Password" :type="type" />
      <p class="text-xs text-red-700" v-for="error of v$.userPassword.$errors" :key="error.$uid">
        {{ error.$message }}
      </p>
      <div class="w-full flex flex-col mb-1">
        <label class="font-semibold text-gray-600 py-2 ml-1 relative">Role</label>
        <div class="relative w-full flex flex-col">
          <select v-model="userRole" class="block text-sm py-3 px-4 rounded-lg border outline-none">
            <option v-for="role in roles" :key="role">
              {{ role }}
            </option>
          </select>
        </div>
      </div>

      <!-- <button>Create Account</button> -->
      <UberButton text="Create account" :isDisabled="false" :isLoading="isLoading" type="uber">
      </UberButton>
      <div class="mt-4 text-center">
        <span class="text-sm text-center">
          Already have account?
          <router-link class="text-green-500 text-sm cursor-pointer" :to="{ name: 'login' }"
            >Login</router-link
          >
        </span>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, Ref, ComputedRef } from 'vue';
import useVuelidate from '@vuelidate/core';
import { email, minLength, required } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import createAccountMutation from '@/graphql/mutations/createAccountMutation.gql';
import UberInput from '@/components/UberInput.vue';
import UberButton from '@/components/UberButton.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
import IconError from '@/components/icons/IconError.vue';

export default defineComponent({
  name: 'CreateAccount',
  components: {
    UberInput,
    UberButton,
    IconCheck,
    IconError,
  },

  setup() {
    enum UserRole {
      Client = 'Client',
      Delivery = 'Delivery',
      Owner = 'Owner',
    }

    const roles = computed(() => {
      return Object.values(UserRole);
    });

    const userEmail: Ref<string> = ref('');
    const userPassword: Ref<string> = ref('');
    const userRole: Ref<string> = ref('Client');
    const canRegister: Ref<boolean> = ref(true);
    const isLoading: Ref<boolean> = ref(false);
    const type: Ref<string> = ref('text');

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
    console.log(v$);
    const router = useRouter();

    const { mutate: createAccount, onDone } = useMutation(createAccountMutation, () => ({
      variables: {
        email: userEmail.value,
        password: userPassword.value,
        role: userRole.value,
      },
    }));

    onDone(() => {
      router.push({ path: '/login' });

      console.log('Apollo is working');
    });

    return {
      userEmail,
      userPassword,
      canRegister,
      isLoading,
      userRole,
      router,
      createAccount,
      rules,
      v$,
      type,
      // isValid,
      roles,
    };
  },
});
</script>

<style></style>
