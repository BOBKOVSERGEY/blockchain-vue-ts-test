import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {

  const userInLocalStorage = localStorage.getItem('user');

  const user =  ref<User | null>();

  if(userInLocalStorage){
    user.value =  JSON.parse(userInLocalStorage)
  } else  {
    user.value = null
  }

  const form = ref<User>({
    name: ''
  });

  const login = async () : Promise<void> => {
    localStorage.setItem('user',  JSON.stringify(form.value));
    localStorage.setItem('token', import.meta.env.VITE_API_TOKEN);
    user.value = form.value
  };

  const logout = async () : Promise<void> => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  };

  return {
    user,
    form,
    login,
    logout,
  }
})