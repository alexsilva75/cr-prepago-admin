import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import type { PluginOptions } from "vue-toastification";
import money from "v-money3";
import axios from "axios";

import "vue-toastification/dist/index.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

axios.defaults.withCredentials = true;

app.use(createPinia());
app.use(router);
app.use(money);

const options: PluginOptions = {
  timeout: 5000,
};

app.use(Toast, options);

app.mount("#app");
