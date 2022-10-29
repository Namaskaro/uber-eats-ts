<template>
  <div class="category">
    <div v-for="restaurant in restaurants" :key="restaurant.id">
      <h2>{{ restaurant.name }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { defineComponent } from '@vue/runtime-core';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
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
  setup() {
    const route = useRoute();
    const { result, variables } = useQuery<category, categoryVariables>(CATEGORY, {
      input: {
        page: 1,
        slug: route.params.slug as string,
      },
    });

    const restaurants = computed(() => {
      return result?.value?.category?.category?.restaurants;
    });
    console.log(restaurants);

    // onMounted(() => {
    //   const slug = route.params.slug;
    //   console.log(slug);
    // });
    return {
      result,
      restaurants,
    };
  },
});
</script>
