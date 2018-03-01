import Vuex from 'vuex'

const store = new Vuex.Store({
    state: {
        user: {
            _id: null
        },
        todos: []
    }
})