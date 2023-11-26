<!-- MainSidebar.vue -->

<template>
    <aside class="bg-[#242424] h-screen w-full ">
        <div class="flex items-center justify-around flex-col py-10 gap-y-10">
            <h2 class="text-green-800 font-semibold text-6xl font-mono border-b border-green-800 pb-4 pt-8">{{ sidebarName
            }}</h2>

            <div class="text-white flex flex-col gap-y-8 text-2xl font-mono">
                <router-link class="hover:text-green-800 flex items-center gap-2" to="/"><svg
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    Home</router-link>
                <router-link class="hover:text-green-800 flex items-center gap-2" to="/albums"><svg
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                    </svg>
                    Álbuns</router-link>
                <router-link class="hover:text-green-800 flex items-center gap-2" to="/create-album"><svg
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Criar Álbum</router-link>
            </div>


        </div>
    </aside>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MainSidebar',
    data() {
        return {
            sidebarName: 'Navegação',
        };
    },
    methods: {
        handleButtonClick() {
            console.log('Botão clicado no sidebar!');
            // Lógica adicional ao clicar no botão
        },
    },
});
</script>
  
<style scoped></style>
  