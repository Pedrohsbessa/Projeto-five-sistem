<script lang="ts">
import { defineComponent, ref } from 'vue';
import { createAlbum } from '../logic/api';
import type { Album } from '../logic/types';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'CreateAlbum',
    setup() {
        const albumName = ref('');
        const router = useRouter();

        const callApi = async () => {
            try {
                const response: Album = await createAlbum({ name: albumName.value });
                console.log('Álbum criado com sucesso:', response);
                albumName.value = '';

                router.push({ name: 'ListAlbums' }); // Corrigido o nome da rota

            } catch (error: unknown) {
                const errorMessage = (error as Error).message;
                console.error('Erro ao criar álbum:', errorMessage);
            }
        };

        return {
            albumName,
            createAlbum: callApi,
        };
    },
});
</script>

<template>
    <div class="p-10">
        <h1 class="text-2xl font-mono text-green-600 mb-10">Criar Novo Álbum</h1>

        <form @submit.prevent="createAlbum">
            <label class="font-thin pl-10 pr-1" for="albumName">Nome do Álbum: </label>
            <input class="bg-transparent border border-solid border-green-800 rounded-md mr-4 active:text-green-700"
                type="text" id="albumName" v-model="albumName" required />

            <button class="border border-solid border-green-800 p-2 rounded-xl hover:bg-green-700" type="submit">Criar Álbum</button>
        </form>
    </div>
</template>

<style scoped>

</style>
