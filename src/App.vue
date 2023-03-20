<template>
  <div>
    <component :is="layout"> </component>
    <notifications />
  </div>
</template>

<script>
import AuthLayout from '@/layouts/AuthLayout.vue';
import UberLayout from '@/layouts/UberLayout.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
export default {
  components: {
    AuthLayout,
    UberLayout,
    DashboardLayout,
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout || 'shop'}-layout`;
    },
  },
  setup() {
    return {};
  },
};
</script>

<style></style>
