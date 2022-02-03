import {
    createApp
} from 'vue'
import App from './App.vue'
import store from './store/index.js'
import router from './router.js'
import TheSpinner from './components/ui/TheSpinner.vue'
import VueRouter from 'vue-router';


const app = createApp(App)
app.use(store)
app.use(VueRouter);
app.use(router)
app.component('the-spinner', TheSpinner)
app.mount('#app')