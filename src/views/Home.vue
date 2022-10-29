<template>
  <div class="home">
    <form class="bg-gray-800 w-full py-40 flex items-center justify-center" @submit.prevent="onSearchSubmit">
      <input
        class="input w-3/4 md:w-3/12 border-0 focus:border-0"
        type="search"
        id=""
        placeholder="Let's find some restaurant"
        v-model="searchTerm"
      />
      <button>Search</button>
    </form>
    <div class="container mx-auto">
      <div class="flex justify-around max-w-sm mx-auto">
        <UberCategory v-for="category in categories" :key="category.id" :name="category.name" :coverImg="category.coverImg" :slug="category.slug" />
      </div>
      <div class="flex flex-row">
        <UberRestaurant v-for="restaurant in restaurants" :key="restaurant.id" :name="restaurant.name" :coverImg="restaurant.coverImg" />
        <!-- <div class="restaurant" v-for="restaurant in restaurants" :key="restaurant.id">
        <div class="restaurant-img" :style="{ backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})` }"></div>
        <span>{{ restaurant.name }}</span>
      </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { restaurantsQuery, restaurantsQueryVariables } from '@/__api__/restaurantsQuery';
import gql from 'graphql-tag';
import UberCategory from '@/components/UberCategory.vue';
import UberRestaurant from '@/components/UberRestaurant.vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  components: {
    UberCategory,
    UberRestaurant,
  },
  setup() {
    const page = ref(1);
    const searchTerm = ref('');
    const router = useRouter();
    const { result, variables } = useQuery<restaurantsQuery, restaurantsQueryVariables>(
      gql`
        query restaurantsQuery($input: RestaurantsInput!) {
          allCategories {
            ok
            error
            categories {
              id
              name
              coverImg
              slug
              restaurantCount
            }
          }
          restaurants(input: $input) {
            ok
            error
            totalPages
            totalResults
            results {
              id
              name
              coverImg
              address
              category {
                name
              }
            }
          }
        }
      `,
      {
        input: {
          page: 1,
        },
      },
    );
    const serchResult: string = searchTerm.value;
    const restaurants = computed(() => {
      return result.value?.restaurants?.results;
    });
    const categories = computed(() => {
      return result.value?.allCategories.categories;
    });
    

    const onSearchSubmit = () => {
      router.push({
        // path: `/search/:term`,
        name: 'search',
        query: { term: searchTerm.value },
      });
    };

    return {
      restaurants,
      categories,
      result,
      variables,
      page,
      searchTerm,
      serchResult,
      onSearchSubmit,
      router,
    };
  },
});
</script>
