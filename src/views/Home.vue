<template>
  <div class="home">
    <form
      class="bg-gray-800 w-full py-40 flex items-center justify-center"
      @submit.prevent="onSearchSubmit">
      <input
        class="input_search w-3/4 md:w-3/12 border-0 focus:border-0"
        type="search"
        id=""
        placeholder="Let's find some restaurant"
        v-model="searchTerm" />
      <UberButton text="Search" type="search" />
    </form>
    <div class="container mx-auto">
      <div class="flex justify-around max-w-sm mx-auto">
        <UberCategory
          v-for="category in categories"
          :key="category.id"
          :name="category.name"
          :coverImg="category.coverImg"
          :slug="category.slug" />
      </div>
      <div class="max-w-screen-2xl mx-auto mt-8">
        <div class="grid grid-cols-3 gap-7">
          <UberRestaurant
            v-for="restaurant in restaurants"
            :key="restaurant.id"
            :id="restaurant.id"
            :name="restaurant.name"
            :coverImg="restaurant.coverImg"
            :address="restaurant.address"
            :categoryName="restaurant.category?.name"
            :deliveryCost="restaurant.deliveryCost"
            :deliveryTime="restaurant.deliveryTime"
            :minimalOrder="restaurant.minimalOrder" />
          <UberLoader v-show="loading" v-for="loader in [...new Array(4)]" :key="loader" />
        </div>
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
import UberButton from '@/components/UberButton.vue';
import UberLoader from '@/components/UberLoader.vue';
import { useRouter } from 'vue-router';
import { useMe } from '@/hooks/useGetCurrentUser';

export default defineComponent({
  components: {
    UberCategory,
    UberRestaurant,
    UberLoader,
    UberButton,
  },
  setup() {
    const page = ref<number>(1);
    const searchTerm = ref<string>('');
    const router = useRouter();
    const { result: user } = useMe();
    const { result, variables, loading, refetch } = useQuery<
      restaurantsQuery,
      restaurantsQueryVariables
    >(
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
              deliveryCost
              deliveryTime
              minimalOrder
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

    const setUserRole = () => {
      localStorage.setItem('role', user?.value?.me?.role as string);
    };

    const onSearchSubmit = () => {
      if (searchTerm.value !== '') {
        router.push({
          // path: `/search/:term`,
          name: 'search',
          query: { term: searchTerm.value },
        });
      }
    };
    refetch();
    setUserRole();
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
      loading,
      user,
    };
  },
});
</script>
