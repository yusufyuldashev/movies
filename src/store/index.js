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
            discover4: [],
             userId: null,
            token: null,
            tokenExpiration: null,
        }
    },
    mutations: {
         setUser(state, payload) {
        state.token = payload.token
        state.userId = payload.userId
        state.tokenExpiration = payload.tokenExpiration
    },
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
        },
             userId(state) {
        return state.userId;
    },
    token(state) {
        return state.token
    },
    isAuthendicated(state) {
        return !!state.token
    },
        
       
    },
    actions: {
         async login(context, payload) {
         const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkiMRrQzEH4Qg8vKhJJiV4TRx1_OmZvGw', {
             method: 'POST',
             body: JSON.stringify({
                 email: payload.email,
                 password: payload.password,
                 returnSecureToken: true
             })
         })
         const responseData = await response.json()
         if (!response.ok) {
             console.log(responseData)
             const error = new Error(responseData.message || 'Failed to authendicate.check again')
             throw error
         }
         localStorage.setItem('token', responseData.idToken),
             localStorage.setItem('userId', responseData.localId),
             console.log(responseData)
         context.commit('setUser', {
             token: responseData.idToken,
             userId: responseData.localId,
             tokenExpiration: responseData.expiresIn
         })

     },
        async signup(context, payload) {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkiMRrQzEH4Qg8vKhJJiV4TRx1_OmZvGw', {
             method: 'POST', 
             body: JSON.stringify({
                 email: payload.email,
                 password: payload.password,
                 returnSecureToken: true
             })
            })
            const responseData = await response.json()
             if (!response.ok) {
             console.log(responseData)
             const error = new Error(responseData.message || 'This email was used please try with a new one')
                 throw error
                 
            }
             localStorage.setItem('token', responseData.idToken)
         localStorage.setItem('userId', responseData.localId)
         context.commit('setUser', {
             token: responseData.idToken,
             userId: responseData.localId,
             tokenExpiration: responseData.expiresIn
         })
        },
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
                const api_url =   base_url +`/discover/movie?sort_by=popularity.desc&${api_key}`
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