const Vuex = require('vuex')

function store () {
  return new Vuex.Store({
    state: {
      tasks: [{ description: 'from store!!!' }]
    },
    mutations: {
      setTasks (state, tasks) {
        console.log('setTasks', tasks)
        state.tasks = tasks
      }
    }
  })
}

module.exports = store
