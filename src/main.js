import App from './App.vue'
import store from './store';
const host = 'https://unidemo.dcloud.net.cn/';

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$serverUrl = host;
App.mpType = 'app'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
const app = new Vue({
	store,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.config.globalProperties.$serverUrl = "https://unidemo.dcloud.net.cn/";
	return {
		app
	}
}
// #endif
