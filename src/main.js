import Vue from "vue"
import VueRouter from "vue-router"
import store from "./store"
import routes from "./routes"
import App from "./components/App"
import "./index.scss"

Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  base: "/git-issues-vue",
  mode: "history",
  routes
})

new Vue({
  store,
  render: h => h(App),
  router
}).$mount("#app")
