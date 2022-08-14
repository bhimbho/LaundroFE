import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2';
import VueMask from 'v-mask'
import VueYoutube from 'vue-youtube'
import VueHtmlToPaper from 'vue-html-to-paper';

import vSelect from 'vue-select'

Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css';

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css',
    './princxt.css'
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: false, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
}

Vue.use(VueHtmlToPaper, options);

import vco from "v-click-outside"

import router from './router'
import store from '@/store'
import i18n from './i18n'

import "@/assets/scss/app.scss";

Vue.config.productionTip = false
Vue.use(VueYoutube)
Vue.use(BootstrapVue)
Vue.use(vco)
Vue.use(Vuelidate)
Vue.use(VueSweetalert2);
Vue.use(VueMask)
Vue.use(require('vue-chartist'))
Vue.component('apexchart', VueApexCharts)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
