import Vue from 'nativescript-vue'
import Vuex from 'vuex'

import store from './core/store'
import Home from './components/Home'

Vue.use(Vuex)

new Vue({
  store: store(),
  template: `
        <Frame>
            <Home />
        </Frame>`,

  components: {
    Home
  }
}).$start()
