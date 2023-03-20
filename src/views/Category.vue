<template>
  <div class="category">
    <div class="max-w-screen-2xl mx-auto mt-8">
      <div class="grid grid-cols-3 gap-7">
        <UberRestaurant
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          :id="restaurant.id"
          :name="restaurant.name"
          :coverImg="restaurant.coverImg"
          :address="restaurant.address"
          :categoryName="restaurant.category?.name" />
        <UberLoader v-show="loading" v-for="loader in [...new Array(4)]" :key="loader" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { defineComponent } from '@vue/runtime-core';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import UberRestaurant from '../components/UberRestaurant.vue';
import UberLoader from '../components/UberLoader.vue';
import { SINGLE_CATEGORY_FRAGMENT } from '@/graphql/fragments/fragments';

import { category, categoryVariables } from '@/__api__/category';
import gql from 'graphql-tag';

const CATEGORY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      category {
        ...SingleCategoryParts
      }
    }
  }
  ${SINGLE_CATEGORY_FRAGMENT}
`;

export default defineComponent({
  components: {
    UberRestaurant,
    UberLoader,
  },
  setup() {
    const route = useRoute();
    const { result, variables, loading } = useQuery<category, categoryVariables>(CATEGORY, {
      input: {
        page: 1,
        slug: route.params.slug as string,
      },
    });

    const restaurants = computed(() => {
      return result?.value?.category?.category?.restaurants ?? [];
    });

    return {
      result,
      restaurants,
      loading,
    };
  },
});
</script>
