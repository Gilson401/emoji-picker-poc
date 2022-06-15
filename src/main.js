import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

Vue.config.ignoredElements = ["emoji-picker"];

new Vue({
  render: (h) => h(App),
}).$mount("#app");
