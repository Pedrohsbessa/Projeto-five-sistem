
<template>
    <div class="p-10">
        <h2 class="text-2xl font-semibold mb-4 text-green-700"> Fotos do Álbum: <span class="uppercase text-white">{{
            albumName }}</span>
        </h2>
        <div v-for="photo in photos" :key="photo.id"
            class="cursor-pointer w-[400px] border border-solid border-gray-700 p-3 m-3 rounded-md">
            <img class="border-b-gray-700 mb-4" :src="photo.url" alt="Foto do Álbum"
                @click="openModal(photo.url, photo.name)" />
            <p class="text-sm font-mono mb-2">nome: {{ photo.name }}</p>
            <div class="flex justify-around">
                <button @click="editPhoto(photo.id)"
                    class="flex items-center gap-2 border p-2 rounded-lg border-green-800 text-green-700 hover:bg-green-700 hover:text-white"><svg
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="h-5 w-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    Editar Foto</button>
                <button @click="deletePhoto(photo.id)"
                    class="flex items-center gap-2 border p-2 rounded-lg border-green-800 text-green-700 hover:bg-red-700 hover:border-red-700 hover:text-white"><svg
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                    </svg>
                    Excluir Foto</button>
            </div>

        </div>

        <div v-if="modalVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
            @click="closeModal">
            <div class="bg-transparent p-6 rounded-lg text-center" @click.stop>
                <img :src="modalImageUrl" alt="Foto em modal" class="max-w-full h-auto" />
                <p class="mt-4">{{ modalImageName }}</p>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import * as api from '../logic/api';
import type { Photo, Album } from '../logic/types';

export default defineComponent({
    name: 'AlbumPhotos',
    props: {
        albumId: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const photos = ref<Photo[]>([]);
        const albumName = ref('');
        const modalVisible = ref(false);
        const modalImageUrl = ref('');
        const modalImageName = ref('');

        onMounted(async () => {
            await loadAlbumDetails();
            await loadPhotos();
        });

        watch(() => props.albumId, async () => {
            await loadAlbumDetails();
            await loadPhotos();
        });

        const loadAlbumDetails = async () => {
            try {
                const albumData: Album = await api.getAlbum(props.albumId);
                albumName.value = albumData.name;
            } catch (error) {
                console.error('Erro ao carregar detalhes do álbum:', error.message);
            }
        };

        const loadPhotos = async () => {
            try {
                const photosData = await api.getAlbumPhotos(props.albumId);
                photos.value = photosData;
            } catch (error) {
                console.error('Erro ao carregar fotos do álbum:', error.message);
            }
        };

        const editPhoto = async (photoId: number) => {
            try {
                // Lógica para obter a foto pelo ID e permitir a edição
                const photoToEdit = photos.value.find((photo) => photo.id === photoId);

                if (photoToEdit) {
                    const newPhotoName = prompt('Novo nome para a foto:', photoToEdit.name);

                    if (newPhotoName !== null) {
                        // Atualizar o nome da foto
                        await api.editPhotoName(props.albumId, photoId, { name: newPhotoName });
                        // Recarregar fotos após a edição
                        await loadPhotos();
                    }
                }
            } catch (error) {
                console.error('Erro ao editar foto:', error.message);
            }
        };

        const deletePhoto = async (photoId: number) => {
            try {
                // Confirmar exclusão com o usuário
                const confirmDelete = window.confirm('Tem certeza que deseja excluir esta foto?');

                if (confirmDelete) {
                    // Lógica para excluir a foto
                    await api.deletePhoto(props.albumId, photoId);
                    // Recarregar fotos após a exclusão
                    await loadPhotos();
                }
            } catch (error) {
                console.error('Erro ao excluir foto:', error.message);
            }
        };

        const openModal = (imageUrl: string, imageName: string) => {
            modalImageUrl.value = imageUrl;
            modalImageName.value = imageName;
            modalVisible.value = true;
        };

        const closeModal = () => {
            modalVisible.value = false;
        };

        return {
            photos,
            albumName,
            modalVisible,
            modalImageUrl,
            modalImageName,
            loadPhotos,
            editPhoto,
            deletePhoto,
            openModal,
            closeModal,
        };
    },
});
</script>
<style scoped>
.photo-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    width: 450px;
    /* Largura fixa desejada para os cards */
    cursor: pointer;
}

img {
    max-width: 100%;
    height: auto;
}
</style>