<template>
  <div class="flex flex-col items-center px-5">
    <img src="@/assets/uber.svg" class="w-52 mb-5" />

    <h4 class="text-left w-full text-3xl mb-10 font-medium">Lets get started</h4>
    <form class="grid gap-3 mt-5 w-full" @submit.prevent="editMutation">
      <UberInput v-model="myRestaurant.name" label="Name" />
      <UberInput v-model="myRestaurant.address" label="Address" />
      <UberInput v-model="myRestaurant.coverImg" label="Image" />
      <!-- <UberInput v-model="myRestaurant.category.name" label="Category" /> -->

      <h3 class="mb-2 font-semibold text-gray-900 dark:text-white">Estimated delivery time</h3>
      <ul
        class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div class="flex items-center pl-3">
            <input
              v-model="myRestaurant.deliveryTime"
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
              v-model="myRestaurant.deliveryTime"
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
              v-model="myRestaurant.deliveryTime"
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
              v-model="myRestaurant.deliveryTime"
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
      <UberInput
        :type="inputType"
        v-model.number="myRestaurant.minimalOrder"
        label="Minimal order value" />
      <UberInput
        :type="inputType"
        v-model.number="myRestaurant.deliveryCost"
        label="Delivery price" />
      <button>Create Restaurant</button>
    </form>
  </div>
</template>

<script lang="ts">
import { restaurant, restaurantVariables } from '@/__api__/restaurant';

import { RESTAURANT_FRAGMENT } from '@/graphql/fragments/fragments';
import { useMutation, useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed, defineComponent, reactive, ref, onMounted, Ref, ComputedRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UberInput from '@/components/UberInput.vue';
import editRestaurant from '@/graphql/mutations/editRestaurantMutation.gql';
import { notify } from '@kyvg/vue3-notification';
import getMyRestaurants from '@/graphql/queries/getMyRestaurants.gql';
import { useMyRestaurants } from '@/hooks/useMyRestaurants';
import { ApolloCache } from '@apollo/client/cache';

interface Restaurant {
  restaurantId: number;
  name: string;
  address: string;
  coverImg: string;
  categoryName: string;
  deliveryTime: string;
  minimalOrder: number;
  deliveryCost: number;
}

export default defineComponent({
  components: {
    UberInput,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id: ComputedRef<string | string[]> = computed(() => {
      return route.params.id;
    });
    const { result: restaurants } = useMyRestaurants();

    const {
      result: restaurant,
      loading,
      refetch,
    } = useQuery<restaurant, restaurantVariables>(
      gql`
        query restaurant($input: RestaurantInput!) {
          restaurant(input: $input) {
            ok
            error
            restaurant {
              ...RestaurantParts
            }
          }
        }
        ${RESTAURANT_FRAGMENT}
      `,
      {
        input: {
          restaurantId: +id.value,
        },
      },
    );
    const myRestaurant = reactive({ ...(restaurant?.value?.restaurant?.restaurant || {}) });
    const { mutate: editMutation, onDone } = useMutation(editRestaurant, () => ({
      variables: {
        restaurantId: restaurant?.value?.restaurant?.restaurant?.id,
        name: myRestaurant?.name,
        address: myRestaurant.address,
        coverImg: myRestaurant.coverImg,
        categoryName: myRestaurant.category?.name,
        deliveryTime: myRestaurant.deliveryTime,
        minimalOrder: myRestaurant.minimalOrder,
        deliveryCost: myRestaurant.deliveryCost,
      },
      // update: (cache, { data: { editMutation } }) => {
      //   let data = cache.readQuery({ query: getMyRestaurants });
      //   data = {
      //     ...data,
      //     restaurants: [...data.restaurants, editMutation],
      //   };
      //   cache.writeQuery({ query: getMyRestaurants, data });
      // },
    }));

    onDone(() => {
      notify({
        text: `Restaurant successfully edited`,
      });
      router.push({ name: 'my-restaurants' });
    });

    const categorySlug = computed(() => {
      return restaurant?.value?.restaurant.restaurant?.category?.slug ?? '';
    });

    console.log(myRestaurant);
    return {
      route,
      id,
      restaurant,
      loading,
      categorySlug,
      myRestaurant,
      onMounted,
      refetch,
      editMutation,
      restaurants,
    };
  },
});
</script>
