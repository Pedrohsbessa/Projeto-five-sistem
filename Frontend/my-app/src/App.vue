<!-- App.vue -->

<template>
  <div id="app" class="flex w-screen justify-evenly">
    <div class="border-r-2 border-r-green-800 w-1/3 tracking-tight"><main-sidebar /></div>
    <div class="w-2/3 bg-[#262626] text-white tracking-tight"><router-view /></div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainSidebar from './layout/MainSidebar.vue'; // Certifique-se de ajustar o caminho conforme a estrutura do seu projeto

export default defineComponent({
  name: 'App',
  components: {
    MainSidebar,
  },
});
</script>

<style></style>
