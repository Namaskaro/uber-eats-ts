<template>
  <div>Search</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const query = computed(() => {
      return route.query.term;
    });

    return {
      query,
    };
  },
});
</script>
