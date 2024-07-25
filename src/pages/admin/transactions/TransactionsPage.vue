<script setup lang="ts">
import { useTransactionModel } from '@/composables/models/TransactionModel';
import PageComponent from '@/components/PageComponent.vue';
import DataTableTransactions from '@/components/FilterTable/Transactions/DataTableTransactions.vue'
import { onBeforeMount } from 'vue'

const { transactions, errors, isLoading, getTransactions } = useTransactionModel();

onBeforeMount(async () => {
  await getTransactions();
})
</script>

<template>
  <PageComponent title="Transactions">
    <div v-if="isLoading">
      <p class="text-center">Loading...</p>
    </div>
    <div v-else-if="errors">
      <p>{{ errors }}</p>
    </div>
    <div v-else>
      <DataTableTransactions :transactions="transactions" />
    </div>
  </PageComponent>
</template>