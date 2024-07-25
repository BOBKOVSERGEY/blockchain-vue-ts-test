<script setup lang="ts">
import { useRoute } from 'vue-router'

import { useTransactionModel } from '@/composables/models/TransactionModel'
import PageComponent from '@/components/PageComponent.vue'
import { onBeforeMount, ref } from 'vue'

const { transaction, errors, isLoading, getTransaction } = useTransactionModel()
const route = useRoute()


onBeforeMount(async () => {
  if (!route.query) return
  await getTransaction(route.query)
})
</script>

<template>
  <div v-if="isLoading">
    <p class="text-center">Loading...</p>
  </div>
  <div v-else-if="errors">
    <p>{{ errors }}</p>
  </div>
  <div v-else>
    <PageComponent :title="transaction._id">
      <pre>
        {{ transaction }}
      </pre>
    </PageComponent>
  </div>
</template>