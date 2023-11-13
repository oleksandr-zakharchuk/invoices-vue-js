//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = 'https://wholesale-trade-9ce5d0228edc.herokuapp.com';
createApp(App).use(router).mount('#app')
