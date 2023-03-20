<template>
  <div>
    <div
      class="py-36 bg-cover bg-center"
      :style="{ 'background-image': `url(${result?.restaurant?.restaurant?.coverImg})` }">
      <div class="bg-white w-6/12 py-4 pl-32">
        <h4 class="text-3xl mb-4">{{ result?.restaurant?.restaurant?.name }}</h4>
        <span class="text-xl">{{ result?.restaurant?.restaurant?.address }}</span>
        <br />
        <span class="text-green-500"
          >Category: {{ result?.restaurant?.restaurant?.category?.name }}</span
        >

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
    <div class="flex justify-between px-12 mt-10">
      <UberButton @click="goBack" text="Back" :isDisabled="false" :isLoading="false" type="uber">
        <template #icon-left>
          <div class="mr-2">
            <IconArrowLeft />
          </div>
        </template>
      </UberButton>
      <UberButton
        @click="openModal"
        text="Create dish"
        :isDisabled="false"
        :isLoading="false"
        type="uber">
      </UberButton>
    </div>
  </div>
  <UberModal :isOpen="isOpenModal" @close="closeModal">
    <template #header>
      <div class="flex justify-between w-full">
        <div>
          <span class="text-sm text-green-500">Press ESC to close</span>
        </div>
        <div
          @click="closeModal"
          class="w-8 h-8 rounded-full cursor-pointer bg-green-500 flex justify-center items-center hover:bg-green-700">
          <div>
            <XIcon />
          </div>
        </div>
      </div>
    </template>
    <template #content>
      <form class="grid gap-3 mt-5 w-full" @submit.prevent="createDish">
        <UberInput v-model="name" label="Name" />
        <UberInput v-model="price" label="Address" />
        <UberInput v-model="photo" label="Image" />
        <UberInput v-model="description" label="Category" />
        <div
          class="mt-4 py-4 px-6 border-2 border-green-500 w-1/6 flex justify-center cursor-pointer"
          @click="addNewOption">
          <span class="text-sm font-medium text-green-500">Add new option</span>
        </div>
        <div class="w-full flex flex-col mb-1" v-for="(option, index) in options" :key="index">
          <label class="font-semibold text-gray-600 py-2 ml-1 relative">{{
            `Option name ${index + 1}`
          }}</label>
          <div class="relative w-full flex flex-col">
            <input class="hover:ring-2 hover:ring-green-700" v-model="option.name" />
          </div>
          <label class="font-semibold text-gray-600 py-2 ml-1 relative"
            >{{ `Option price ${index + 1}` }}
          </label>
          <div class="relative w-full flex flex-col">
            <input class="hover:ring-2 hover:ring-green-700" v-model="option.price" />
          </div>
        </div>
        <UberButton text="Create dish" :isDisabled="false" :isLoading="false" type="uber">
        </UberButton>
      </form>
    </template>
  </UberModal>
</template>

<script lang="ts">
import { restaurant, restaurantVariables } from '@/__api__/restaurant';
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from '@/graphql/fragments/fragments';
import { useMutation, useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import UberButton from '@/components/UberButton.vue';
import UberModal from '@/components/UberModal.vue';
import UberInput from '@/components/UberInput.vue';
import XIcon from '@/components/icons/XIcon.vue';
import router from '@/router';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';

interface Option {
  name: string | null;
  price: number | null;
}

export default defineComponent({
  components: {
    UberButton,
    UberModal,
    UberInput,
    XIcon,
    IconArrowLeft,
  },
  setup() {
    const route = useRoute();

    const id = computed(() => {
      return route.params.id;
    });

    const name = ref<string>('');
    const price = ref<number>(0);
    const photo = ref<string>('');
    const description = ref<string>('');

    const isOpenModal = ref<boolean>(false);

    const options = ref<Option[]>([]);

    const openModal = () => {
      isOpenModal.value = true;
    };

    const closeModal = () => {
      isOpenModal.value = false;
    };

    const goBack = () => {
      router.go(-1);
    };

    const addNewOption = () => {
      options.value.push({
        name: '',
        price: 0,
      });
    };

    const deleteOption = (index: number) => {
      options.value.splice(index, 1);
    };

    const { result, loading, refetch } = useQuery<restaurant, restaurantVariables>(
      gql`
        query restaurant($input: RestaurantInput!) {
          restaurant(input: $input) {
            ok
            error
            restaurant {
              ...RestaurantParts
              menu {
                ...DishParts
              }
            }
          }
        }
        ${RESTAURANT_FRAGMENT}
        ${DISH_FRAGMENT}
      `,
      {
        input: {
          restaurantId: +id.value,
        },
      },
    );

    const createDish = () => {
      console.log('dish dish dish');
    };

    // const { mutate } = useMutation();

    const deliveryPrice = computed(() => {
      return result?.value?.restaurant?.restaurant?.deliveryCost === 0
        ? 'Delivery Free'
        : `Delivery price:${result?.value?.restaurant?.restaurant?.deliveryCost}`;
    });
    refetch();
    return {
      route,
      id,
      result,
      loading,
      refetch,
      deliveryPrice,
      isOpenModal,
      openModal,
      goBack,
      name,
      price,
      photo,
      description,
      createDish,
      closeModal,
      addNewOption,
      options,
      deleteOption,
    };
  },
});
</script>
