<script setup lang="ts">

import PageComponent from '@/components/PageComponent.vue';
import {  useBlockStore } from '@/stores/blockStore';
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'

const { blocks, errors, isLoading} = storeToRefs(useBlockStore());
const blockStore = useBlockStore();

onBeforeMount(blockStore.getBlocks);

</script>

<template>
  <PageComponent title="Blocks">
    <div v-if="isLoading">
      <p class="text-center">Loading...</p>
    </div>
    <div v-else-if="errors">
      <p>{{ errors }}</p>
    </div>
    <div v-else>
        <pre>
          {{ blocks }}
        </pre>
    </div>
  </PageComponent>
</template>