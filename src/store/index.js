import {
    createStore
} from 'vuex'

const store = createStore({
    state() {
        return {
            data: {},
            searchValue: ''
        }
    },
    mutations: {
        setData(state, payload) {
            state.data = payload
        },
        setSearchValue(state, value) {
            state.searchValue = value
        }
    },

    getters: {
        getData(state) {
            return state.data
        },
        searchValue2(state) {
            return state.searchValue
        }
    },
    actions: {
        getSearchValue(context, payload) {
            context.commit('setSearchValue', payload)
        },
        async getMovies(context) {
            let moviePage = 1
            let searchValue = "marvel"
            const KEY = "ec6105fc"
            const response = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${searchValue}&page=${moviePage}`)
            const responseData = await response.json()
            if (!response.ok) {
                console.log(responseData)
                const error = new Error(responseData.message || 'failed to fetch')
                throw error
            }
            // console.log(responseData.Search)
            context.commit('setData', responseData.Search)

        }
    }
})

export default store