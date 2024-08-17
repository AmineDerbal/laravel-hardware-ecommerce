import { createApp } from 'vue';
import AOS from 'aos';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import BootstrapVueNext from 'bootstrap-vue-next';
import vClickOutside from 'click-outside-vue3';
import VueFeather from 'vue-feather';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import router from './router';
import App from './App.vue';

import './assets/scss/config/minimal/app.scss';
import './assets/scss/mermaid.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../css/app.css';

const pinia = createPinia().use(piniaPluginPersistedstate);

AOS.init({
  easing: 'ease-out-back',
  duration: 1000,
});

const options = {
  // You can set your default options here
  position: 'top-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
};

createApp(App)
  .use(pinia)
  .use(router)
  .use(BootstrapVueNext)
  .use(vClickOutside)
  .use(Toast, options)
  .component(VueFeather.type, VueFeather)
  .mount('#app');
