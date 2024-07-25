<script setup lang="ts">
const emit = defineEmits(['search'])
const search = (e: Event) => {
  emit('search', (e.target as HTMLInputElement).value)
}

defineProps<{
  placeholder: string
}>()
</script>

<template>
  <form class="py-3 px-4 flex items-center w-full">
    <label class="sr-only">Search</label>
    <div class="relative w-full">
      <input
        @input="search"
        type="text" :placeholder="placeholder"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
    </div>
  </form>
</template>