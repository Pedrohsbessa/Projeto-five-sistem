// api.ts

import axios from 'axios';
import type { Album,Photo } from './types';
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Defina a baseURL da sua API Laravel
});

export const addPhotoToAlbum = async (albumId: number, photoData: any) => {
  try {
    const response = await api.post(`/albums/${albumId}/images`, photoData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Erro ao adicionar foto ao álbum');
  }
};

export const editAlbumName = async (albumId: number, newName: string) => {
  try {
    const response = await api.put(`/albums/${albumId}`, { name: newName });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Erro ao editar nome do álbum');
  }
};

export const deleteAlbum = async (albumId: number) => {
  try {
    const response = await api.delete(`/albums/${albumId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Erro ao excluir álbum');
  }
};
export const getAllAlbums = async () => {
  try {
    const response = await api.get('/albums');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Erro ao obter álbuns');
  }
};
export const createAlbum = async (albumData: any) => {
  try {
    const response = await api.post('/albums', albumData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Erro ao criar álbum');
  }
};
export const getAlbumPhotos = async (albumId: number): Promise<Photo[]> => {
  try {
    const response = await api.get(`/albums/${albumId}/images`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao obter fotos do álbum');
  }
};
export const editPhotoName = async (
  albumId: number,
  photoId: number,
  data: { name: string }
): Promise<Photo> => {
  try {
    const response = await api.put(`/albums/${albumId}/images/${photoId}`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Erro ao editar o nome da foto no álbum'
    );
  }
};

export const deletePhoto = async (albumId: number, photoId: number): Promise<void> => {
  try {
    await api.delete(`/albums/${albumId}/images/${photoId}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao excluir foto do álbum');
  }
};
export const getAlbum = async (albumId: number): Promise<Album> => {
  try {
    const response = await api.get(`/albums/${albumId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao obter detalhes do álbum');
  }
};
