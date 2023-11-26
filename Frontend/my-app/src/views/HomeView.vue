<!-- HomeView.vue -->

<template>
  <div class="flex justify-center text-center pt-20 items-center flex-col">
    <h1 class="font-mono text-3xl text-white hover:animate-pulse antialiased hover:text-green-600 mb-48">
      Bem-vindo aos meus albuns!
    </h1>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      class="w-20 h-20 text-green-600">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  methods: {
    redirectToAlbums() {
      // Use this.$router para obter o router
      const router = this.$router;

      // Certifique-se de que o router está definido corretamente antes de usar o método push
      if (router) {
        router.push('/albums');
      } else {
        console.error('Erro: Router não definido corretamente.');
      }
    },
  },
});
</script>

<style scoped>
/* Estilos específicos para a view HomeView, se necessário */
</style>
