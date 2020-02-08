const Vuex = require('vuex')
const { chooseDocument } = require('./file-ios')
const { loadDocument } = require('./document-ios')

function store () {
  return new Vuex.Store({
    state: {
      document: null
    },
    mutations: {
      setDocument (state, document) {
        state.document = document
      }
    },
    actions: {
      loadDocument (context) {
        loadDocument(document => {
          context.commit('setDocument', document)
        })
      }
    }
  })
}

module.exports = store
