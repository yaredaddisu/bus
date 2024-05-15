import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import { darkModeKey, styleKey } from "@/config.js";
import store from "./store";
import "./css/main.css";
import currencyUSD from '@/filters/currency.js'
import VueBarcode from '@chenfengyuan/vue-barcode';

 import VueNumberInput from '@chenfengyuan/vue-number-input';
 import mdiVue from 'mdi-vue/v3'
 import * as mdijs from '@mdi/js'


/* Init Pinia */
const pinia = createPinia();

const app = createApp(App)

/* Create Vue app */


app
 .use(router)
.use(store)
.use(pinia)
.component(VueNumberInput.name, VueNumberInput)
.component('VueBarcode', VueBarcode) // Register VueBarcode component globally

.use(mdiVue, {
  icons: mdijs
})
.mount("#app");




/* Init Pinia stores */
const mainStore = useMainStore(pinia);
const styleStore = useStyleStore(pinia);

/* Fetch sample data */
mainStore.fetch("clients");
mainStore.fetch("history");

/* App style */
styleStore.setStyle(localStorage[styleKey] ?? "basic");

/* Dark mode */
if (
  (!localStorage[darkModeKey] &&
    window.matchMedia("(prefers-color-scheme: dark)").matches) ||
  localStorage[darkModeKey] === "1"
) {
  styleStore.setDarkMode(true);
}

/* Default title tag */
const defaultDocumentTitle = "Lomi";

/* Set document title from route meta */
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle;
});


app.config.globalProperties.$filters = {
  currencyUSD
}
