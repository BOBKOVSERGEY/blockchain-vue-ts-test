<script setup lang="ts">

import type { Block } from '@/types'
import { computed, ref } from 'vue'
import SearchForm from '@/components/FilterTable/SearchForm.vue'

const props = defineProps<{
  blocks: Block[]
}>();
const searchFilter = ref<string>('');

const filteredItems = computed<Block[]>(() => {

  let items = props.blocks;

  if(searchFilter.value !== '') {
    items =  items.filter(item =>
      item._id
        .toLowerCase()
        .includes(searchFilter.value.trim().toLowerCase()) ||
      item.seqno
        .toString()
        .includes(searchFilter.value.trim())
    )
  }

  return items;
});

const handleSearch = (query: string): void => {
  searchFilter.value = query;
}

</script>

<template>
  <div class="bg-white relative border rounded-lg">
    <div class="flex items-center justify-between">
      <SearchForm placeholder="Search By _ID or Seqno" @search="handleSearch"/>
      <div class="flex items-center justify-end text-sm font-semibold mr-4">
      </div>
    </div>
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th class="px-4 py-3">_ID</th>
        <th class="px-4 py-3">Seqno</th>
        <th class="px-4 py-3">File hash</th>
        <th class="px-4 py-3">Title</th>
        <th class="px-4 py-3">Date Time</th>
        <th class="px-4 py-3">
          <span class="sr-only">Actions</span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="item in filteredItems"
        :key="item._id"
        class="border-b">
        <td class="px-4 py-3 font-medium text-gray-900">
          {{ item._id }}
        </td>
        <td class="px-4 py-3 font-medium text-gray-900">
          {{ item.seqno }}
        </td>
        <td class="px-4 py-3 ">
          {{ item.file_hash }}
        </td>
        <td class="px-4 py-3 ">
          {{ item.workchain }}
        </td>
        <td class="px-4 py-3 ">
          {{ new Date(item.timestamp * 1000).toLocaleString() }}
        </td>
        <td class="px-4 py-3 ">
          <RouterLink
            :to="{ name: 'AdminBlock', params: { id: item.seqno } }"
            class="text-indigo-500 hover:underline">Details</RouterLink>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>