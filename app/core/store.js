const Vuex = require('vuex')
const { loadDocument } = require('./document-ios')
const { compare } = require('./todotxt-presenter')

function store () {
  return new Vuex.Store({
    state: {
      document: null,
      tasks: []
    },
    mutations: {
      setDocument (state, document) {
        state.document = document
        state.tasks = (document && document.tasks) ? document.tasks : []
        state.tasks.sort(compare)
      },
      updateDocument (state) {
        state.document.tasks = state.tasks
        state.document.updateChangeCount(UIDocumentChangeKind.UIDocumentChangeDone)
      },
      sort (state) {
        state.task.sort(compare)
        this.commit('updateDocument')
      },
      addTask (state, task) {
        state.tasks.push(task)
        state.tasks.sort(compare)
        this.commit('updateDocument')
      },
      updateTask (state, { task, updatedTask }) {
        Object.assign(task, updatedTask)
        this.commit('updateDocument', task)
      },
      toggleDoneTask (state, task, sort) {
        task.done = !task.done
        task.completionDate = task.done ? new Date() : null
        if (sort) {
          state.tasks.sort(compare)
        }
        this.commit('updateDocument')
      },
      deleteTask (state, task) {
        const index = state.tasks.indexOf(task)
        if (!(index >= 0)) {
          console.log('error', 'no task to delete', task)
          return
        }
        state.tasks.splice(index, 1)
        this.commit('updateDocument')
      }
    },
    actions: {
      loadDocument (context) {
        loadDocument(document => {
          context.commit('setDocument', document)
        })
      },
      sort (context) {
        context.commit('sort')
      },
      addTask (context, task) {
        context.commit('addTask', task)
      },
      updateTask (context, { task, updatedTask }) {
        context.commit('updateTask', { task, updatedTask })
      },
      toggleDoneTask (context, task, sort) {
        context.commit('toggleDoneTask', task, sort)
      },
      deleteTask (context, task) {
        context.commit('deleteTask', task)
      }
    }
  })
}

module.exports = store
