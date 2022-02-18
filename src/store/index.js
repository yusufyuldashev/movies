import {
    createStore
} from 'vuex'

const store = createStore({
    state() {
        return {
            movies: [],
            discover:[],
            discover2:[],
            discover3:[],
            discover4:[],
        }
    },
    mutations: {
        moviesMutation(state, payload) {
                state.movies.push(payload);
                
        
        },
        discaverMutation(state, payload) {
            state.discover =payload
        },
        discaverMutation2(state, payload) {
            state.discover2 =payload
        },
         discaverMutation3(state, payload) {
            state.discover3 =payload
        },
          discaverMutation4(state, payload) {
            state.discover4 =payload
        },
        
        removeMutation(state,payload) {
            state.movies.splice(payload,1)
        }
    },

    getters: {
        moviesGetter(state) {
         return [...new Map(state.movies.map((item) => [item["id"], item])).values()]
        },
        discoverGetters(state) {
            return state.discover
        },  discoverGetters2(state) {
            return state.discover2
        },
          discoverGetters3(state) {
            return state.discover3
        },
           discoverGetters4(state) {
            return state.discover4
        }
        
       
    },
    actions: {
         async discoverMovies4(context ) {

                const api_key = 'api_key=e10a98df5c335fc5102ecda2cf9b7dbf'
                const base_url = 'https://api.themoviedb.org/3'
                const api_url =
                base_url +
                    `/discover/movie?with_genres=878&with_cast=500&sort_by=vote_average.desc&${api_key}`
                const response = await fetch(api_url)
                const responseData = await response.json()
                if (!response.ok) {
                   const error = new Error(responseData.message || 'Failed to fetch!');
                 throw error
            }
          
                  context.commit('discaverMutation4',responseData.results)
        },
         async discoverMovies3(context ) {

                const api_key = 'api_key=e10a98df5c335fc5102ecda2cf9b7dbf'
                const base_url = 'https://api.themoviedb.org/3'
                const api_url =
                base_url +
                    `/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&${api_key}`
                const response = await fetch(api_url)
                const responseData = await response.json()
                if (!response.ok) {
                   const error = new Error(responseData.message || 'Failed to fetch!');
                 throw error
            }
          
                  context.commit('discaverMutation3',responseData.results)
        },
         async discoverMovies2(context ) {

                const api_key = 'api_key=e10a98df5c335fc5102ecda2cf9b7dbf'
                const base_url = 'https://api.themoviedb.org/3'
                const api_url =
                base_url +
                    `/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&${api_key}`
                const response = await fetch(api_url)
                const responseData = await response.json()
                if (!response.ok) {
                   const error = new Error(responseData.message || 'Failed to fetch!');
                 throw error
            }
          
                  context.commit('discaverMutation2',responseData.results)
        },
        async discoverMovies(context ) {

                const api_key = 'api_key=e10a98df5c335fc5102ecda2cf9b7dbf'
                const base_url = 'https://api.themoviedb.org/3'
                const api_url =
              base_url +
                    `/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&

${api_key}`
                const response = await fetch(api_url)
                const responseData = await response.json()
                if (!response.ok) {
                   const error = new Error(responseData.message || 'Failed to fetch!');
                 throw error
            }
          
                  context.commit('discaverMutation',responseData.results)
        },
        removeMovies(context, payload) {
                
                context.commit('removeMutation',payload)
        },
        storeMovies(context, payload) {
           
                
            context.commit('moviesMutation', payload)
        }
      
    },
})

export default store