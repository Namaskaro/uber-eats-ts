<template>
  <div>
    <div
      @click="toRestaurant"
      :style="{
        'background-image': `url(${coverImg})`,
      }"
      class="h-48 bg-cover bg-center rounded cursor-pointer"></div>

    <!-- <img class="h-56 bg-cover bg-center rounded w-full" :src="coverImg" alt="" /> -->
    <h3 class="text-xl font-medium">{{ name }}</h3>
    <span class="border-t-1 text-sm font-medium">{{ address }}</span>
    <div class="flex justify-left">
      <span class="text-xs font-bold mr-3">{{ minimalOrder }}$</span>
      <span class="text-xs font-bold mr-3">{{
        deliveryCost === 0 ? 'Delivery Free' : `Delivery price:${deliveryCost}$`
      }}</span>
      <span class="text-xs font-bold">{{ deliveryTime }} min</span>
    </div>
    <slot name="actions" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

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
    address: {
      type: String,
      required: true,
      default: '',
    },
    minimalOrder: {
      type: Number,
      default: 0,
    },
    deliveryTime: {
      type: String,
      default: '',
    },
    deliveryCost: {
      type: Number,
      default: 0,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const toRestaurant = () => {
      router.push({ path: `/restaurant/${props.id}` });
    };
    return {
      toRestaurant,
    };
  },
});
</script>
