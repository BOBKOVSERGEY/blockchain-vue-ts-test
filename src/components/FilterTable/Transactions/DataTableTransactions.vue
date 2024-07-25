<script setup lang="ts">

import type {  Transaction } from '@/types'
import { computed, ref } from 'vue'
import SearchForm from '@/components/FilterTable/SearchForm.vue'

const props = defineProps<{
  transactions: Transaction[]
}>();
const searchFilter = ref<string>('');

const filteredItems = computed<Transaction[]>(() => {

  let items = props.transactions;

  if(searchFilter.value !== '') {
    items =  items.filter(item =>
      item._id
        .toString()
        .toLowerCase()
        .includes(searchFilter.value.trim().toLowerCase()) ||
      item.account
        .toString()
        .toLowerCase()
        .includes(searchFilter.value.trim().toLowerCase()) ||
      item.address
        .toString()
        .toLowerCase()
        .includes(searchFilter.value.trim().toLowerCase())
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
      <SearchForm
        placeholder="Search By _ID or Account or Address"
        @search="handleSearch"/>
      <div class="flex items-center justify-end text-sm font-semibold mr-4">
      </div>
    </div>
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th class="px-4 py-3">_ID</th>
        <th class="px-4 py-3">Processed</th>
        <th class="px-4 py-3">Account</th>
        <th class="px-4 py-3">Address</th>
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
        <td class="px-4 py-3 font-medium text-gray-900 truncate">
          {{ item.processed }}
        </td>
        <td class="px-4 py-3 truncate">
          {{ item.account }}
        </td>
        <td class="px-4 py-3 ">
          {{ item.address }}
        </td>
        <td class="px-4 py-3 ">
          {{ new Date(item.utime * 1000).toLocaleString() }}
        </td>
        <td class="px-4 py-3 ">
          <RouterLink
            :to="{ name: 'AdminTransaction', query: { account: item.account, lt: item.lt, hash: item.hash  } }"
            class="text-indigo-500 hover:underline">Details</RouterLink>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
.truncate {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>