<template>
  <div>
    <content-loader
      viewBox="0 0 493 400"
      :speed="2"
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb">
      <rect x="5" y="56" rx="4" ry="4" width="493" height="193" />
      <rect x="8" y="263" rx="0" ry="0" width="493" height="28" />
      <rect x="7" y="304" rx="0" ry="0" width="493" height="19" />
      <rect x="7" y="332" rx="0" ry="0" width="244" height="16" />
    </content-loader>
  </div>
</template>

<script lang="ts">
import { ContentLoader } from 'vue-content-loader';

export default {
  components: { ContentLoader },
};
</script>
