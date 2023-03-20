<script setup lang="ts">
import IconCheck from '@/components/icons/IconCheck.vue';
import IconError from '@/components/icons/IconError.vue';

interface Props {
  modelValue: string | number;
  label?: string;
  placeholder?: string;
  variant?: string;
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  variant: () => 'baseInput',
  type: () => 'text',
});

//   const props = defineProps<{
//     modelValue: string | number
//     label?: string
//     placeholder: string
//     variant:
// }>()
// props: {
//   modelValue: {
//     type: String || Number,
//     default: '' || 0,
//   },
//   label: {
//     type: String,
//     default: '',
//   },
//   placeholder: {
//     type: String,
//     default: '',
//   },
//   variant: {
//     type: String,
//     default: 'baseInput',
//   },
//   type: {
//     type: String,
//     default: 'text',
//   },
// },
</script>

<template>
  <div class="w-full flex flex-col mb-1">
    <label class="font-semibold text-gray-600 py-2 ml-1 relative">{{ label }} </label>
    <div class="relative w-full flex flex-col">
      <input
        class="hover:ring-2 hover:ring-green-700"
        :class="[$style.baseInput, variant && $style[variant]]"
        :placeholder="placeholder"
        :value="modelValue"
        :type="type"
        :variant="variant"
        @input="$emit('update:modelValue', $event.target?.value)" />
      <slot name="icons"></slot>
    </div>
  </div>
</template>

<style lang="postcss" module>
.baseInput {
  /* @apply appearance-none block w-full bg-gray-100 text-gray-500 border border-gray-400 rounded-lg h-10 px-4; */
  @apply block text-sm py-3 px-4 rounded-lg border outline-none ring-inset ring-green-500;
}
.floating {
  @apply pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none;
}
</style>

function $emits(arg0: string) { throw new Error('Function not implemented.'); }
