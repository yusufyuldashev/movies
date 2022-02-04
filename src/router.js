import {
    createRouter,
    createWebHistory
} from 'vue-router'
import TheMovie from './components/TheMovie.vue'
import TheMain from './components/TheMain.vue'
import TheMovies from './components/TheMovies.vue'
import TheSeries from './components/TheSeries.vue'

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
        },
        {
            path: '/movies',
            component: TheMovies
        },
        {
            path: '/tvseries',
            component: TheSeries
        },
    ],
    linkActiveClass: 'active2',
})



export default router