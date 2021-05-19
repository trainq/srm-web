import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import SvgIcon from "@/components/SvgIcon";

createApp(App).use(store).use(router).use(ElementPlus).component("svg-icon", SvgIcon).mount("#app");


