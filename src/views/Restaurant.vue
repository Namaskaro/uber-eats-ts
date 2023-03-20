<template>
  <div>
    <div
      class="py-48 bg-cover bg-center"
      :style="{ 'background-image': `url(${result?.restaurant?.restaurant?.coverImg})` }">
      <div class="bg-white w-4/12 py-4 pl-32">
        <h4 class="text-3xl mb-4">{{ result?.restaurant?.restaurant?.name }}</h4>
        <span class="text-xl">{{ result?.restaurant?.restaurant?.address }}</span>
        <br />
        <router-link class="text-green-500" :to="{ path: `/category/${categorySlug}` }">
          Category: {{ result?.restaurant?.restaurant?.category?.name }}
        </router-link>
        <br />
        <div class="flex justify-left">
          <span class="text-sm mr-3">{{ result?.restaurant?.restaurant?.minimalOrder }} $</span>
          <span class="text-sm mr-3">{{ deliveryPrice }}</span>
          <span class="text-sm">{{
            result?.restaurant?.restaurant?.deliveryTime + ' ' + 'min'
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { restaurant, restaurantVariables } from '@/__api__/restaurant';
import { RESTAURANT_FRAGMENT } from '@/graphql/fragments/fragments';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const id = computed(() => {
      return route.params.id;
    });

    const { result, loading } = useQuery<restaurant, restaurantVariables>(
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

    const categorySlug = computed(() => {
      return result.value?.restaurant.restaurant?.category?.slug;
    });

    const deliveryPrice = computed(() => {
      return result?.value?.restaurant?.restaurant?.deliveryCost === 0
        ? 'Delivery Free'
        : `Delivery price:${result?.value?.restaurant?.restaurant?.deliveryCost}`;
    });

    return {
      route,
      id,
      result,
      loading,
      categorySlug,
      deliveryPrice,
    };
  },
});
</script>
