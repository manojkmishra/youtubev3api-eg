import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import InfiniteLoading from 'vue-infinite-loading';

Vue.use(InfiniteLoading, { /* options */ });
Vue.filter('formatDate', function (value) {
	if (!value) return ''
	return moment(value.toString()).format('MM/DD/YYYY hh:mm')
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
