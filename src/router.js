import {
    createRouter,
    createWebHistory
} from 'vue-router'
import TheMovie from './components/TheMovie.vue'
import TheMain from './components/TheMain.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [


        {
            path: '/',
            redirect: '/home'
        },
        {

            component: TheMain,
            name: 'home',
            path: '/home',
            children: [{
                    name: 'data',
                    path: ':datu',
                    component: TheMovie,
                    props: true
                },

            ]
        }
    ]
})



export default router