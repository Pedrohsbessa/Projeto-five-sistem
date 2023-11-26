import { createRouter, createWebHistory} from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CreateAlbum from '../views/CreateAlbum.vue';
import Albums from '../views/AlbumList.vue';
import AlbumPhotos from '../views/AlbumPhotos.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/create-album',
    name: 'CreateAlbum',
    component: CreateAlbum,
  },
  {
    path: '/albums',
    name: 'ListAlbums',
    component: Albums,
  },
  {
    path: '/albums/:albumId/photos',
    name: 'AlbumPhotos',
    component: AlbumPhotos,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;