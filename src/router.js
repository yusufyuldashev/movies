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
import TheSignin from './components/TheSignin.vue'
import TheSignup from './components/TheSignup.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [

        {
            path: '/',
            redirect: '/login'
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
        {path:'/login',component:TheSignin},
        {path:'/signup',component:TheSignup},
        {path:'/favorites',component:TheFavorites},
        {path:'/popular',component:ThePopular},
        {
            path: '/discaver', component: TheDiscaver, 
            children: [{
                    path: ':datu',
                component: TheMovie,
                    meta: { disableScroll: true },
                    props: true
                },

            ]},
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
        if (to.matched.some(m => m.meta.disableScroll)) return;
        if (savedPostion) {
            return savedPostion
        }
        else {
            
            return {
                left: 0,
                top:40
            }
        }


    },
})



export default router