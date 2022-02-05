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
            component: TheMovies,
             children: [{
                    path: ':datu',
                    component: TheMovie,
                    props: true
                },

            ]
        },
        {
            path: '/tvseries',
            component: TheSeries
        },
    ],
    linkActiveClass: 'active2',
    scrollBehavior(to, from, savedPostion) {
          console.log(to, from, savedPostion);
        if (savedPostion) {
            return savedPostion
        }
        return {
            left: 0,
            top: 0
        }


    },
})



export default router