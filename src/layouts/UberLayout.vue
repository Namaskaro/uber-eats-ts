<template>
  <div class="h-screen">
    <UberHeader />
    <router-view />
    <UberFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UberHeader from '@/components/UberHeader.vue';
import UberFooter from '@/components/UberFooter.vue';

export default defineComponent({
  name: 'UberLayout',
  components: {
    UberHeader,
    UberFooter,
  },
  setup() {},
});
</script>
