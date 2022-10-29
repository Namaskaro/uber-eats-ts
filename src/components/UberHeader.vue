<template>
  <nav class="bg-white shadow">
    <div class="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
      <div class="flex justify-between items-center">
        <div>
          <router-link class="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700" to="/">
            <UberLogo />
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <div class="flex md:hidden">
          <button type="button" class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu">
            <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
              <path
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <div class="md:flex items-center">
        <!-- <div class="flex flex-col md:flex-row md:mx-6">
          <UberDropdown :label="currentUser" />
        </div> -->

        <div class="flex justify-center md:block">
          <router-link :to="{ name: 'profile' }" class="relative text-gray-700 hover:text-gray-600" href="#">
            {{ currentUser }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { useMe } from '@/hooks/useGetCurrentUser';
import UberLogo from '@/components/UberLogo.vue';
import UberDropdown from '@/components/UberDropdown.vue';

// import getCurrentUser from '@/graphql/queries/getCurrentUser.gql';

export default defineComponent({
  name: 'UberHeader',
  components: {
    UberLogo,
    UberDropdown,
  },
  setup() {
    const { result: user } = useMe();

    const currentUser = computed(() => {
      return user?.value?.me?.email;
    });
    console.log(currentUser);

    return {
      user,
      currentUser,
    };
  },
});
</script>
