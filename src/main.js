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
import BaseSpinner from './components/ui/BaseSpinner.vue'
import BaseThedialog from './components/ui/BaseThedialog.vue'
import BaseButton from './components/ui/BaseButton.vue'
import VueWriter from "vue-writer";
import BaseMovies from './components/ui/BaseMovies.vue'
import TheButton from './components/ui/TheButton.vue'
const app = createApp(App)
app.use(VueRouter);
app.use(store)
app.use(VueWriter)
app.use(router)
app.component('the-spinner', TheSpinner)
app.component('base-spinner', BaseSpinner)
app.component('the-movies', TheButton)
app.component('base-movies',BaseMovies)
app.component('base-dialog',BaseDialog)
app.component('base-thedialog', BaseThedialog)
app.component('base-series', BaseSeries)
app.component('base-button',BaseButton)
app.mount('#app')