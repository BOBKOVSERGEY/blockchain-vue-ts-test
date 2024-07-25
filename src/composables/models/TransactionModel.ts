import { onBeforeMount, ref } from 'vue'
import type { Transaction } from '@/types'
import type { AxiosResponse } from 'axios'
import axiosClient from '@/plugins/axios'
import type { LocationQuery } from 'vue-router'


export const useTransactionModel = () => {

  const transactions = ref<Transaction[]>([]);
  const transaction = ref<Transaction>({} as Transaction);
  const isLoading = ref<boolean>(false);
  const errors = ref<Error | null>(null);

  async function getTransactions(): Promise<void> {
    isLoading.value = true
    try {
      const response: AxiosResponse = await axiosClient.get('/transactions');
      if (response.status !== 200) {
        throw new Error("Failed to fetch blocks");
      }

      transactions.value = response.data?.transactions

    } catch (error: unknown) {
      if (error instanceof Error) {
        errors.value = error;
      }
    } finally {
      isLoading.value = false;
    }
  }

  async function getTransaction(query: LocationQuery): Promise<void> {
    isLoading.value = true
    try {
      const response: AxiosResponse = await axiosClient.get(`/transaction`, { params: query});
      if (response.status !== 200) {
        throw new Error("Failed to fetch blocks");
      }

      transaction.value = response.data?.transaction

    } catch (error: unknown) {
      if (error instanceof Error) {
        errors.value = error;
      }
    } finally {
      isLoading.value = false;
    }
  }


  return {
    transaction,
    transactions,
    isLoading,
    errors,
    getTransactions,
    getTransaction
  }
}