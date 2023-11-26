<!-- AlbumList.vue -->

<template>
    <div class="p-10">
        <h2 class="font-mono text-2xl mb-10 text-green-600">Lista de Álbuns</h2>
        <div class="flex gap-10 flex-wrap">
            <div class="border border-green-800 w-1/3 rounded-3xl" v-for="album in albums" :key="album.id">
                <h3 class="p-5 flex items-center gap-3" @click="navigateToAlbumPhotos(album.id, album.name)">Album:
                    <span class="text-green-600 font-mono text-2xl uppercase hover:scale-105 cursor-pointer">{{
                        album.name }}
                    </span>
                </h3>
                <div class="flex flex-col items-center gap-y-3 p-5">
                    <button
                        class="border border-solid border-green-900 text-green-700 w-fit p-2 rounded-xl hover:bg-green-800 hover:text-white flex items-center gap-2"
                        @click="addPhoto(album.id)"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Adicionar Foto</button>
                    <button
                        class="border border-solid border-green-900 text-green-700 w-fit p-2 rounded-xl hover:bg-green-800 hover:text-white flex items-center gap-2"
                        @click="editAlbum(album)"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Editar Nome</button>
                    <button
                        class="border border-solid border-green-900 text-green-700 w-fit p-2 rounded-xl hover:bg-red-800 hover:border-red-800 hover:text-white flex items-center gap-2"
                        @click="deleteAlbum(album.id)"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Deletar Álbum</button>
                </div>

            </div>
        </div>

    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import * as api from '../logic/api';
import type { Album } from '../logic/types';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

export default defineComponent({
    name: 'ListAlbums',

    setup() {
        const router = useRouter();
        const toast = useToast();

        const albums = ref([] as Album[]);

        const addPhoto = async (albumId: number) => {
            try {
                // Pedir ao usuário os parâmetros necessários
                const photoName = prompt('Digite o nome da foto:');
                const photoUrl = prompt('Digite a URL da foto:');

                // Verificar se o usuário inseriu os parâmetros
                if (photoName === null || photoUrl === null) {
                    // Se algum dos prompts foi cancelado, cancela a adição da foto
                    return;
                }

                // Lógica para adicionar a foto ao álbum
                await api.addPhotoToAlbum(albumId, { name: photoName, url: photoUrl });
                // Após adicionar, recarrega a lista de álbuns
                await refreshAlbums();

                // Exibe toast de sucesso
                toast.success('Foto adicionada com sucesso!', {
                    timeout: 2000
                });
            } catch (error) {
                console.error('Erro ao adicionar foto:', error.message);
                // Exibe toast de erro
                toast.error('Erro ao adicionar foto. Tente novamente.', {
                    timeout: 2000
                });
            }
        };

        const editAlbum = async (album: Album) => {
            try {
                // Lógica para editar o nome do álbum
                const newName = prompt('Novo nome para o álbum', album.name);
                if (newName === null) {
                    // Se o prompt foi cancelado, cancela a edição do álbum
                    return;
                }

                await api.editAlbumName(album.id, newName);
                // Após editar, recarrega a lista de álbuns
                await refreshAlbums();

                // Exibe toast de sucesso
                alert('Nome do álbum editado com sucesso!');
            } catch (error) {
                console.error('Erro ao editar álbum:', error.message);
                // Exibe toast de erro
                alert('Erro ao editar álbum. Tente novamente.');
            }
        };

        const deleteAlbum = async (albumId: number) => {
            try {
                // Confirmar a exclusão com o usuário
                const confirmDelete = window.confirm('Tem certeza que deseja deletar este álbum?');

                if (!confirmDelete) {
                    // Se o usuário cancelou a exclusão, retorna
                    return;
                }

                // Lógica para deletar o álbum
                await api.deleteAlbum(albumId);
                // Após deletar, recarrega a lista de álbuns
                await refreshAlbums();

                // Exibe toast de sucesso
                toast.success('Álbum deletado com sucesso!');
            } catch (error) {
                console.error('Erro ao deletar álbum:', error.message);
                // Exibe toast de erro
                alert('Erro ao deletar álbum. Tente novamente.');
            }
        };

        const navigateToAlbumPhotos = (albumId: number, albumName: string) => {
            if (router && router.push) {
                router.push({ name: 'AlbumPhotos', params: { albumId, albumName } });
            } else {
                console.error('Roteador não definido corretamente ou push não está disponível.');
            }
        };

        const refreshAlbums = async () => {
            try {
                const albumsData = await api.getAllAlbums();
                albums.value = albumsData;
            } catch (error) {
                console.error('Erro ao obter álbuns:', error.message);
            }
        };

        onMounted(() => {
            refreshAlbums();
        });

        return {
            albums,
            addPhoto,
            editAlbum,
            deleteAlbum,
            navigateToAlbumPhotos,
        };
    },
});
</script>
  
<style scoped></style>
  