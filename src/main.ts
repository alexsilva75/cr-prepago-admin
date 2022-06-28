import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import type { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from "./App.vue";
import router from "./router";
// import CurrencyInputVue from "./components/ui/CurrencyInput.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
// app.component("CurrencyInput", CurrencyInputVue);

const options: PluginOptions = {
  timeout: 2000,
};

app.use(Toast, options);

app.mount("#app");
