import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axiosClient from '@/plugins/axios';
import type { AxiosResponse } from 'axios';
import type { Block } from '@/types'

export const useBlockStore = defineStore('block', () => {

  const errors = ref<Error | null>(null);
  const isLoading = ref<boolean>(false);
  const blocks = ref<Block[]| undefined>();


  async function getBlocks(): Promise<void> {
    isLoading.value = true
    try {
      const response: AxiosResponse = await axiosClient.get('/blocks');
      if (response.status !== 200) {
        throw new Error("Failed to fetch blocks");
      }

      blocks.value = response.data

    } catch (error: unknown) {
      if (error instanceof Error) {
        errors.value = error;
      }
    } finally {
      isLoading.value = false;
    }
  }

  return {
    errors,
    isLoading,
    blocks,
    getBlocks
  }
})