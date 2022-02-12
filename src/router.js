import {
    createRouter,
    createWebHistory
} from 'vue-router'
import TheMovie from './components/TheMovie.vue'
import TheMain from './components/TheMain.vue'
import TheMovies from './components/TheMovies.vue'
import TheSeries from './components/TheSeries.vue'
import TheFavorites from './components/TheFavorites.vue'
import ThePopular from './components/ThePopular.vue'
import TheSettings from './components/TheSettings.vue'
import TheDiscaver from './components/TheDiscaver.vue'
import TheWatch from './components/TheWatch.vue'
import TheCategories from './components/TheCategories.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [

        {
            path: '/',
            redirect: '/movies'
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
        {path:'/favorites',component:TheFavorites},
        {path:'/popular',component:ThePopular},
        {path:'/discaver',component:TheDiscaver},
        {path:'/categories',component:TheCategories},
        {path:'/later',component:TheWatch},
        {path:'/settings',component:TheSettings},
        {
            path: '/series',
            component: TheSeries,
             children: [{
                    path: ':datu',
                    component: TheMovie,
                    props: true
                },

            ]
        },
    ],
    linkActiveClass: 'active2',
    scrollBehavior(to, from, savedPostion) {
        //   console.log(to, from, savedPostion);
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