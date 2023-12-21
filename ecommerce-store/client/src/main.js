import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import moshaToast from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

import "./assets/styles.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(moshaToast);

app.mount("#app");
