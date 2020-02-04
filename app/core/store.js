const Vuex = require('vuex')

function store () {
  return new Vuex.Store({
    state: {
      tasks: [{ description: 'from store!!!' }]
    },
    mutations: {
      loadTasks (state, tasks) {
        state.tasks = tasks
      }
    }
  })
}

module.exports = store
