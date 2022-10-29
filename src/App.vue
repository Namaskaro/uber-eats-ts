<template>
  <div>
    <component :is="layout"> </component>
    <notifications />
  </div>
</template>

<script>
import { watchEffect, computed, watch } from 'vue';
import { useMe } from '@/hooks/useGetCurrentUser';
import AuthLayout from '@/layouts/AuthLayout.vue';
import UberLayout from '@/layouts/UberLayout.vue';

export default {
  components: {
    AuthLayout,
    UberLayout,
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout || 'shop'}-layout`;
    },
  },
  setup() {
    const { result } = useMe();

    const currentUser = computed(() => {
      return result.value.me.email;
    });
    watch(result, () => {
      if(!result.value) {
        router.push('/login');
      }
    })
   
    console.log(result);
    return {
      result,
      currentUser,
    };
  },
};
</script>

<style></style>
