import type { App } from "vue";
import DefaultLayout from "./default.vue";
import EmptyLayout from "./empty.vue";

export default {
  install(app: App) {
    app.component("DefaultLayout", DefaultLayout);
    app.component("EmptyLayout", EmptyLayout);
  },
};
