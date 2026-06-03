// Smooth-scroll core — Lenis + GSAP ticker + ScrollTrigger.
// Follows the official Lenis + GSAP integration recipe (driving lenis.raf from
// the GSAP ticker and updating ScrollTrigger on scroll).

import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ref, onMounted, onUnmounted } from "vue";

export const lenis = ref<Lenis | null>(null);
export const velocity = ref(0);

const onScroll = () => ScrollTrigger.update();

export const useScroll = () => {
  const tick = (time: number) => {
    const instance = lenis.value;
    if (!instance) return;
    velocity.value = Math.min(Math.abs(instance.velocity * 0.75) || 0, 1);
    instance.raf(time * 1000);
  };

  onMounted(() => {
    lenis.value = new Lenis({ lerp: 0.08 });
    lenis.value.on("scroll", onScroll);

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
  });

  onUnmounted(() => {
    gsap.ticker.remove(tick);
    lenis.value?.off("scroll", onScroll);
    lenis.value?.destroy();
    lenis.value = null;
  });
};

// Programmatic scroll (used by nav / "scroll down" cues)
export const scrollTo = (target: string | number | HTMLElement, offset = 0) => {
  lenis.value?.scrollTo(target, { offset, duration: 1.2 });
};
