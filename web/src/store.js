import Vuex from 'vuex'

const store = new Vuex.Store({
    state: {
        user: {
            _id: null,
            machine_id: null
        },
        todos: []
    },
    mutations: {
        setUser (state, user) {
            state.user = user
        },
        addTodo (state, todo) {
            state.todos.push(todo)
        },
        removeTodo (state, todo) {
            let index = state.todos.indexOf(todo)
            state.splice(index, 1)
        },
        editTodo (state, todo, updatedTodo) {
            let index = state.todos.indexOf(todo)
            state.todos[index] = updatedTodo
        }
    },
    actions: {
        setUser (user) {
            store.commit('setUser', user)
        },
        addTodo (todo) {
            store.commit('addTodo', todo)
        },
        removeTodo (todo) {
            store.commit('removeTodo', todo)
        },
        editTodo (todo, updatedTodo) {
            store.commit('editTodo', todo, updatedTodo)
        }
    }
})