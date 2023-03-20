<template>
  <UberRestaurant
    :key="id"
    :id="id"
    :name="name"
    :coverImg="coverImg"
    :address="address"
    :categoryName="categoryName"
    :deliveryCost="deliveryCost"
    :deliveryTime="deliveryTime"
    :minimalOrder="minimalOrder">
    <template #actions>
      <div class="flex justify-evenly">
        <UberButton
          @click="onEditPage(id)"
          text="Edit Restaurant"
          :isDisabled="false"
          :isLoading="false"
          type="uber">
        </UberButton>
        <UberButton text="Delete Restaurant" :isDisabled="false" :isLoading="false" type="uber">
        </UberButton>
        <UberButton
          @click="goCreateDish(id)"
          text="Create dish"
          :isDisabled="false"
          :isLoading="false"
          type="uber">
        </UberButton>
      </div>
    </template>
  </UberRestaurant>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UberRestaurant from '@/components/UberRestaurant.vue';
import UberButton from '@/components/UberButton.vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  components: {
    UberRestaurant,
    UberButton,
  },
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
  setup() {
    const router = useRouter();

    const onEditPage = (id: number) => {
      router.push(`/dashboard/my-restaurants/${id}`);
    };

    const goCreateDish = (id: number) => {
      router.push(`/dashboard/my-restaurant/${id}/create-dish`);
    };

    return {
      router,
      onEditPage,
      goCreateDish,
    };
  },
});
</script>
