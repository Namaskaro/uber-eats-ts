<!-- eslint-disable no-redeclare -->
<template>
  <div class="w-full max-w-screen-sm flex flex-col items-center px-5">
    <img src="@/assets/uber.svg" class="w-52 mb-5" />

    <h4 class="text-left w-full text-3xl mb-10 font-medium">Lets get started</h4>
    <form class="grid gap-3 mt-5 w-full" @submit.prevent="createRestaurant">
      <UberInput v-model="name" label="Name" />
      <UberInput v-model="address" label="Address" />
      <UberInput v-model="coverImg" label="Image" />
      <UberInput v-model="categoryName" label="Category" />

      <h3 class="mb-2 font-semibold text-gray-900 dark:text-white">Estimated delivery time</h3>
      <ul
        class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div class="flex items-center pl-3">
            <input
              v-model="deliveryTime"
              id="horizontal-list-radio-license"
              type="radio"
              value="20-30 min"
              name="list-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
            <label
              for="horizontal-list-radio-license"
              class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >20-30 min
            </label>
          </div>
        </li>
        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div class="flex items-center pl-3">
            <input
              v-model="deliveryTime"
              id="horizontal-list-radio-id"
              type="radio"
              value="30-40 min"
              name="list-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
            <label
              for="horizontal-list-radio-id"
              class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >30-40 min</label
            >
          </div>
        </li>
        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div class="flex items-center pl-3">
            <input
              v-model="deliveryTime"
              id="horizontal-list-radio-millitary"
              type="radio"
              value="40-60 min"
              name="list-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
            <label
              for="horizontal-list-radio-millitary"
              class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >40-60 min</label
            >
          </div>
        </li>
        <li class="w-full dark:border-gray-600">
          <div class="flex items-center pl-3">
            <input
              v-model="deliveryTime"
              id="horizontal-list-radio-passport"
              type="radio"
              value="60-90 min"
              name="list-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
            <label
              for="horizontal-list-radio-passport"
              class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >60-90 min</label
            >
          </div>
        </li>
      </ul>
      <UberInput :type="inputType" v-model.number="minimalOrder" label="Minimal order value" />
      <UberInput :type="inputType" v-model.number="deliveryCost" label="Delivery price" />
      {{ typeof deliveryTime }}
      {{ typeof minimalOrder }}
      {{ typeof deliveryCost }}
      <button>Create Restaurant</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Ref, defineComponent, ref } from 'vue';
import createRestaurantMutation from '@/graphql/mutations/createRestaurantMutation.gql';
import { useMutation } from '@vue/apollo-composable';
import UberInput from '@/components/UberInput.vue';
import {
  createRestaurantByOwner,
  createRestaurantByOwnerVariables,
} from '@/__api__/createRestaurantByOwner';

export default defineComponent({
  name: 'AddRestaurant',
  components: {
    UberInput,
  },
  setup() {
    const name: Ref<string> = ref<string>('');
    const address: Ref<string> = ref<string>('');
    const coverImg: Ref<string> = ref<string>('');
    const categoryName: Ref<string> = ref<string>('');
    const deliveryTime: Ref<string> = ref('');
    const minimalOrder: Ref<number> = ref(0);
    const deliveryCost: Ref<number> = ref(0);

    const inputType: Ref<string> = ref('number');

    const { mutate: createRestaurant, onDone } = useMutation<
      createRestaurantByOwner,
      createRestaurantByOwnerVariables
    >(createRestaurantMutation, () => ({
      variables: {
        name: name.value,
        address: address.value,
        coverImg: coverImg.value,
        categoryName: categoryName.value,
        deliveryTime: deliveryTime.value,
        minimalOrder: +minimalOrder.value,
        deliveryCost: +deliveryCost.value,
      },
    }));

    console.log('deliveryTime', typeof deliveryTime.value);
    console.log('deliveryCost', typeof deliveryCost.value);
    console.log('minimalOrder', typeof minimalOrder.value);
    return {
      name,
      address,
      coverImg,
      deliveryTime,
      minimalOrder,
      deliveryCost,
      inputType,
      categoryName,
      createRestaurant,
    };
  },
});
</script>
