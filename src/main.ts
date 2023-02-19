import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import layouts from "./layouts";

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

export const app = createApp(App);

app.use(layouts);
app.use(pinia);
app.use(router);
app.mount("#app");
