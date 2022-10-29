<template>
  <div class="flex items-center flex-col cursor-pointer group">
    <div
      :style="{ 'background-image': `url(${coverImg})` }"
      class="w-14 h-14 rounded-full group-hover:bg-gray-100 bg-contain bg-center bg-no-repeat"
    ></div>
    <router-link :to="{ path: `/category/${slug}` }">
      <span class="text-center font-medium text-xs mt-1">{{ name }}</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
      default: '',
    },
    coverImg: {
      type: String,
      required: true,
      default: '',
    },
    slug: {
      type: String,
      required: true,
      default: '',
    },
  },
  setup() {},
});
</script>
