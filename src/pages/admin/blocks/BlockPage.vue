<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onBeforeMount, onMounted, watch } from 'vue'
import { useBlockStore } from '@/stores/blockStore'
import { storeToRefs } from 'pinia'
import PageComponent from '@/components/PageComponent.vue'

const { block, errors, isLoading } = storeToRefs(useBlockStore())
const blockStore = useBlockStore();

defineProps<{ id: string}>();

const route = useRoute();


watch(
  () => route.params,
  () => {
    if(route.params.id) {
      blockStore.getBlockById(route.params.id as string)
    }
  }
);
onBeforeMount(() => {
  if(route.params.id) {
    blockStore.getBlockById(route.params.id as string)
  }
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
    <PageComponent :title="block._id">
    <h2>Shards</h2>
      <div v-for="shard in block.shards" :key="shard._id">
        <pre>
          {{ shard }}
        </pre>
      </div>
    </PageComponent>
  </div>
</template>