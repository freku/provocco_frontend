<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'text',
    validator: (value) => {
      return ['text', 'password', 'email'].includes(value)
    },
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  errors: {
    type: Array,
    default: () => [],
  },
})

defineEmits(['update:modelValue'])

const hasErrors = computed(() => {
  return props.errors.length > 0
})
</script>

<template>
  <div>
    <label class="block text-gray-700 text-sm font-bold mb-2" :for="label">
      {{ label }}
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :class="{ 'border-red-500 text-red-500': hasErrors }"
      :id="label"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
    />
    <div v-if="hasErrors">
      <p class="text-xs text-red-500" v-for="(error, index) in errors" :key="index">
        {{ error }}
      </p>
    </div>
  </div>
</template>
