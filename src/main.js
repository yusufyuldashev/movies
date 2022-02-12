import {
    createApp
} from 'vue'

import App from './App.vue'
import store from './store/index.js'
import router from './router.js'
import TheSpinner from './components/ui/TheSpinner.vue'
import VueRouter from 'vue-router';
import BaseDialog from './components/ui/BaseDialog.vue'
import BaseSeries from './components/ui/BaseSeries.vue'


const app = createApp(App)
app.use(VueRouter);
app.use(store)
app.use(router)
app.component('the-spinner', TheSpinner)
app.component('base-dialog', BaseDialog)
app.component('base-series',BaseSeries)
app.mount('#app')