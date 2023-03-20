<template>
  <div>
    <h1 class="text-4xl font-bold text-center">My Restaurants</h1>
    <div class="grid grid-cols-2 gap-7">
      <UberOwnerRestaurants
        v-for="restaurant in myRestaurants"
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
</template>

<script lang="ts">
import { useMyRestaurants } from '@/hooks/useMyRestaurants';
import { computed, defineComponent } from 'vue';
import UberOwnerRestaurants from '@/components/UberOwnerRestaurants.vue';
import UberLoader from '@/components/UberLoader.vue';

export default defineComponent({
  components: {
    UberOwnerRestaurants,
    UberLoader,
  },
  setup() {
    const { result, loading, refetch } = useMyRestaurants();
    const myRestaurants = computed(() => {
      return result?.value?.myRestaurants?.restaurants ?? [];
    });
    refetch();
    return {
      result,
      myRestaurants,
      loading,
    };
  },
});
</script>
