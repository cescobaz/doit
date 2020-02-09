const Vuex = require('vuex')
const { chooseDocument } = require('./file-ios')
const { loadDocument } = require('./document-ios')

function store () {
  return new Vuex.Store({
    state: {
      document: null,
      tasks: []
    },
    mutations: {
      setDocument (state, document) {
        state.document = document
        state.tasks = document.tasks || []
      },
      addTask (state, task) {
        state.tasks.push(task)
        state.document.tasks = state.tasks
        state.document.updateChangeCount(UIDocumentChangeKind.UIDocumentChangeDone)
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
      }
    }
  })
}

module.exports = store
