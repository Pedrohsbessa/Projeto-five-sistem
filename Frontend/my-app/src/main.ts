import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css'


const app = createApp(App);




const albumDetailsSymbol = Symbol();
app.provide(albumDetailsSymbol, {
  albumId: null,
  albumName: null,
});

app.use(router).mount('#app');
