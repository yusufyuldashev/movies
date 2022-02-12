import {
    createStore
} from 'vuex'

const store = createStore({
    state() {
        return {
            movies:[]
        }
    },
    mutations: {
        moviesMutation(state, payload) {
                state.movies.push(payload);
                
        
    },
        
        removeMutation(state,payload) {
            state.movies.splice(payload,1)
        }
    },

    getters: {
        moviesGetter(state) {
         return [...new Map(state.movies.map((item) => [item["id"], item])).values()]
        },
        
       
    },
    actions: {
        removeMovies(context, payload) {
                
                context.commit('removeMutation',payload)
        },
        storeMovies(context, payload) {
           
                
            context.commit('moviesMutation', payload)
        }
      
    },
})

export default store