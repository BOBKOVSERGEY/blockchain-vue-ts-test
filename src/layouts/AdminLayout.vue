<script setup lang="ts">

import HeaderComponent from '@/components/HeaderComponent.vue'

</script>

<template>
  <div class="min-h-full">
    <HeaderComponent/>
    <slot/>
  </div>
</template>