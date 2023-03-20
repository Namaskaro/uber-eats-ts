<template>
  <div v-if="isResult" v-for="restaurant in saerchResultRestaurants">
    {{ restaurant.name }}
    <img :src="restaurant.coverImg" alt="" />
  </div>
  <div v-else="!isResult" class="flex flex-col justify-center align-center h-screen">
    <div class="flex justify-center">
      <IconNotMatch />
    </div>
    <h1 class="text-center text-4xl font-medium mb-4">We didn’t find a match for {{ query }}</h1>
    <span class="text-sm text-center font-medium">Try searching for something else instead</span>
    <UberButton
      class="mt-6 w-1/4 mx-auto"
      @click="goAll"
      text="View All Restaurants"
      :isDisabled="false"
      :isLoading="false"
      type="uber" />
  </div>
</template>

<script lang="ts">
import { useLazyQuery, useQuery } from '@vue/apollo-composable';
import { defineComponent, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import gql from 'graphql-tag';
import UberButton from '@/components/UberButton.vue';
import IconNotMatch from '@/components/icons/IconNotMatch.vue';
import { RESTAURANT_FRAGMENT } from '@/graphql/fragments/fragments';
import {
  searchRestaurantQuery,
  searchRestaurantQueryVariables,
} from '@/__api__/searchRestaurantQuery';
import debounce from 'lodash.debounce';

export default defineComponent({
  components: {
    UberButton,
    IconNotMatch,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const query = computed(() => {
      return route.query.term;
    });

    const goAll = () => {
      return router.push('/');
    };

    const saerchResultRestaurants = computed(() => {
      return result?.value?.searchRestaurant?.restaurants;
    });

    const isResult = computed(() => {
      return result?.value?.searchRestaurant?.restaurants?.length;
    });
    const { result, loading, load } = useLazyQuery<
      searchRestaurantQuery,
      searchRestaurantQueryVariables
    >(
      gql`
        query searchRestaurantQuery($input: SearchRestaurantInput!) {
          searchRestaurant(input: $input) {
            ok
            error
            totalPages
            totalResults
            restaurants {
              ...RestaurantParts
            }
          }
        }
        ${RESTAURANT_FRAGMENT}
      `,
      {
        input: {
          page: 1,
          query: String(query.value),
        },
      },
    );

    load();
    return {
      load,
      query,
      result,
      loading,
      saerchResultRestaurants,
      isResult,
      goAll,
    };
  },
});
</script>
