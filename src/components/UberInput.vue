<template>
  <div class="w-full flex flex-col mb-1">
    <label class="font-semibold text-gray-600 py-2 ml-1 relative">{{ label }} </label>
    <div class="relative w-full flex flex-col">
      <input
        class="hover:ring-2 hover:ring-green-700"
        :class="[$style.baseInput, variant && $style[variant]]"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <slot name="icons"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconCheck from '@/components/icons/IconCheck.vue';
import IconError from '@/components/icons/IconError.vue';

export default defineComponent({
  name: 'UberInput',
  components: {
    IconCheck,
    IconError,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: 'baseInput',
    },
  },

  emits: ['update:modelValue'],
});
</script>

<style lang="postcss" module>
.baseInput {
  /* @apply appearance-none block w-full bg-gray-100 text-gray-500 border border-gray-400 rounded-lg h-10 px-4; */
  @apply block text-sm py-3 px-4 rounded-lg border outline-none;
}
.floating {
  @apply pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none;
}
</style>

function $emits(arg0: string) { throw new Error('Function not implemented.'); }
