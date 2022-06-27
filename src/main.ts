import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
// import CurrencyInputVue from "./components/ui/CurrencyInput.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
// app.component("CurrencyInput", CurrencyInputVue);

app.mount("#app");
