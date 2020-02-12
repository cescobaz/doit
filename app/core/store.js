const Vuex = require('vuex')
const { chooseDocument } = require('./file-ios')
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
      addTask (state, task) {
        state.tasks.push(task)
        state.tasks.sort(compare)
        this.commit('updateDocument')
      },
      toggleDoneTask (state, task) {
        task.done = !task.done
        task.completionDate = task.done ? new Date() : null
        state.tasks.sort(compare)
        this.commit('updateDocument')
      }
    },
    actions: {
      loadDocument (context) {
        loadDocument(document => {
          context.commit('setDocument', document)
        })
      },
      addTask (context, task) {
        context.commit('addTask', task)
      },
      toggleDoneTask (context, task) {
        context.commit('toggleDoneTask', task)
      }
    }
  })
}

module.exports = store
