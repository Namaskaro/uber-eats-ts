<template>
  <div class="relative inline-block text-left text-gray-800">
    <div>
      <span class="rounded-md shadow-sm">
        <button
          @click="isMenuOpen = !isMenuOpen"
          type="button"
          class="inline-flex items-center justify-between w-full rounded-md border border-gray-300 h-10 px-4 py-4 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-800 transition ease-in-out duration-150 btn-focus"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <span> {{ label }} </span>
          <img src="https://s.svgbox.net/hero-solid.svg?ic=chevron-down&fill=grey-800" class="-mr-1 ml-2 h-5 w-5" />
        </button>
      </span>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-if="isMenuOpen" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg text-sm overflow-hidden border z-20">
        <div class="rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <div>
            <div class="bg-gray-100 p-4 flex items-center">
              <div class="w-full">
                <img class="h-8 w-8 rounded-full mb-2" src="https://fayazz.co/fayaz.jpg" alt="avatar" />
                <p class="font-semibold text-base">Fayaz Ahmed</p>
                <button class="flex items-center justify-between w-full focus:outline-none">
                  <router-link to="/profile" class="text-gray-600">fayaz@email.com</router-link>
                  <img src="https://s.svgbox.net/hero-solid.svg?ic=cog&fill=grey-700" class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-100"></div>
          <div class="py-1">
            <router-link to="/" class="p-4 flex items-center space-x-2">
              <img src="https://s.svgbox.net/hero-outline.svg?ic=currency-rupee" class="h-6 w-6" />
              <span> Transaction History </span>
            </router-link>
            <router-link to="/" class="p-4 flex items-center space-x-2">
              <img src="https://s.svgbox.net/hero-outline.svg?ic=heart" class="h-6 w-6" />
              <span> Favourites </span>
            </router-link>
          </div>
          <div class="border-t border-gray-100"></div>
          <div class="py-1">
            <router-link to="/" @click="isMenuOpen = false" class="p-4 flex items-center space-x-2">
              <img src="https://s.svgbox.net/hero-outline.svg?ic=logout" class="h-6 w-6" />
              <span> Logout </span>
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
    },
  },
  setup(props) {
    const isMenuOpen = ref(false);

    const closeMenu = () => {
      isMenuOpen.value = false;
    };
    return {
      isMenuOpen,
      closeMenu,
    };
  },
});
</script>
