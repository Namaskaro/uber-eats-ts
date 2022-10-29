<template>
  <div class="flex flex-col">
    <!-- <div
      style="
         {
          'background-image':`url(${coverImg})` ;
        }
      "
      class="h-48 bg-cover bg-center rounded"
    ></div> -->
    <img class="h-48 bg-cover bg-center rounded" :src="coverImg" alt="" />
    <h3 class="text-xl font-medium">{{ name }}</h3>
    <!-- <span class="border-t-2">{{ categoryName }}</span> -->
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
    categoryName: {
      type: String,
      required: false,
      default: '',
    },
    coverImg: {
      required: true,
    },
  },
  setup() {},
});
</script>
