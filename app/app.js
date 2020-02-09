import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import RadListView from 'nativescript-ui-listview/vue'

import store from './core/store'
import Home from './components/Home'

Vue.use(Vuex)
Vue.use(RadListView)

new Vue({
  store: store(),
  template: `
        <Frame>
            <Home />
        </Frame>`,
  created: function created () {
    this.$store.dispatch('loadDocument')
  },
  components: {
    Home
  }
}).$start()
