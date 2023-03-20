<template>
  <button
    :class="[
      $style.baseButton,
      type && $style[type],
      !isDisabled ? $style['not-disabled'] : $style.disabled,
    ]"
    @click="emit('click')">
    <slot name="icon-left"></slot>
    <slot v-if="isLoading" name="loading">
      <span>Loading...</span>
    </slot>
    <slot name="default" v-else>{{ text }} </slot>
    <slot name="icon-right"></slot>
  </button>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';

interface IButtonProps {
  isDisabled?: boolean;
  type: string;
  isLoading?: boolean;
  text: string;
}

const { isDisabled, type = 'uber', isLoading = true, text } = defineProps<IButtonProps>();

const canCLickStyles = computed(() => {
  return {};
});

const emit = defineEmits<{
  (e: 'click'): void;
}>();
</script>

<style module lang="postcss">
.baseButton {
  @apply text-white font-medium  py-3 px-2 rounded flex justify-center items-center;
}

.search {
  @apply text-white font-medium  py-3 px-2 rounded-none rounded-tr-lg rounded-br-lg;
}
.not-disabled {
  @apply bg-green-600 hover:bg-green-800;
}

.disabled {
  @apply bg-gray-400 pointer-events-none;
}
</style>
