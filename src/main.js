import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/tailwind.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { dom } from '@fortawesome/fontawesome-svg-core'
import dotenv from 'dotenv';

dotenv.config()
Vue.config.productionTip = false
dom.watch()
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
