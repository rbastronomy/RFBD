import { createApp } from "vue";
import "@/assets/styles/index.scss";
import App from "@/App.vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { scrollDirectives } from "@/directives/scroll";

gsap.registerPlugin(ScrollTrigger);

const app = createApp(App);
scrollDirectives(app);
app.mount("#app");
