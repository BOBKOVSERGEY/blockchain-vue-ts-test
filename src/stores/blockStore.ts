import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axiosClient from '@/plugins/axios';
import type { AxiosResponse } from 'axios';
import type { Block } from '@/types'

export const useBlockStore = defineStore('block', () => {

  const errors = ref<Error | null>(null);
  const isLoading = ref<boolean>(false);
  const blocks = ref<Block[]>([]);
  const block = ref<Block>({} as Block);


  async function getBlocks(): Promise<void> {
    isLoading.value = true
    try {
      const response: AxiosResponse = await axiosClient.get('/blocks');
      if (response.status !== 200) {
        throw new Error("Failed to fetch blocks");
      }

      blocks.value = response.data?.blocks

    } catch (error: unknown) {
      if (error instanceof Error) {
        errors.value = error;
      }
    } finally {
      isLoading.value = false;
    }
  }

  async function getBlockById(id: string): Promise<void> {
    isLoading.value = true
    try {
      const response: AxiosResponse = await axiosClient.get(`/block?seqno=${id}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch blocks");
      }

      block.value = response.data?.block

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
    block,
    blocks,
    getBlocks,
    getBlockById,
  }
})