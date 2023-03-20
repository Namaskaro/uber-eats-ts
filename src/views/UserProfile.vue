<template>
  <div class="w-full max-w-screen-sm flex flex-col items-center px-5">
    <img src="@/assets/uber.svg" class="w-52 mb-5" />
    <div v-if="role == 'Owner'">
      <span>Go to owners dashboard</span>
    </div>
    <h4 class="text-left w-full text-3xl mb-10 font-medium">Edit your profile</h4>
    <form class="grid gap-3 mt-5 w-full" @submit.prevent="onEditProfile">
      <UberInput v-model="newEmail" label="Email" />
      <UberInput v-model="password" label="Password" />
      <button>Edit Profile</button>
    </form>
  </div>
</template>

<script lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { defineComponent, ref, computed } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import { useRouter } from 'vue-router';
import type { Ref, ComputedRef } from 'vue';
import UberInput from '@/components/UberInput.vue';

import editProfile from '../graphql/mutations/editProfile.gql';
import { useMe } from '@/hooks/useGetCurrentUser';

export default defineComponent({
  components: {
    UberInput,
  },
  setup() {
    const router = useRouter();
    const { result } = useMe();
    const newEmail: Ref<string> = ref('');
    const email: ComputedRef<string> = computed(() => {
      return result?.value?.me?.email;
    });

    const password: ComputedRef<string> = computed(() => {
      return result?.value?.me?.password;
    });

    const role: ComputedRef<string> = computed(() => {
      return result?.value?.me?.role;
    });

    const { mutate: editProfileMutation, onDone } = useMutation(editProfile, () => ({
      variables: {
        email: newEmail.value,
      },
    }));

    onDone(() => {
      notify({
        text: 'Your profile was successfully changed',
      });
      setTimeout(() => {
        router.push('/');
      }, 1000);
    });

    const onEditProfile = () => {
      if (email.value == newEmail.value) {
        return notify({
          text: 'Your previous email is equal new email value',
        });
      } else {
        return editProfileMutation();
      }
    };

    return {
      result,
      email,
      password,
      role,
      newEmail,
      editProfileMutation,
      onEditProfile,
    };
  },
});
</script>
