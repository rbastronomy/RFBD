// Reusable scroll-driven directives built on GSAP ScrollTrigger.
//   v-reveal        — fade/translate element in when it enters the viewport
//   v-reveal:stagger — stagger the element's direct children
//   v-parallax      — translate element vertically as it scrolls past
//
// Built on the standard GSAP ScrollTrigger reveal/parallax patterns.

import type { App, Directive } from "vue";
import gsap from "gsap";

interface RevealOptions {
  y?: number;
  x?: number;
  delay?: number;
  duration?: number;
  stagger?: number;
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const reveal: Directive<HTMLElement, RevealOptions | undefined> = {
  mounted(el, binding) {
    if (prefersReducedMotion()) return;

    const opts = binding.value ?? {};
    const isStagger = binding.arg === "stagger";
    const targets = isStagger ? Array.from(el.children) : el;

    gsap.set(targets, { opacity: 0, y: opts.y ?? 48, x: opts.x ?? 0 });

    gsap.to(targets, {
      opacity: 1,
      y: 0,
      x: 0,
      duration: opts.duration ?? 0.9,
      delay: opts.delay ?? 0,
      ease: "power3.out",
      stagger: isStagger ? (opts.stagger ?? 0.08) : 0,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  },
};

const parallax: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (prefersReducedMotion()) return;
    const speed = binding.value ?? 0.2;

    gsap.fromTo(
      el,
      { yPercent: -speed * 50 },
      {
        yPercent: speed * 50,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  },
};

export const scrollDirectives = (app: App) => {
  app.directive("reveal", reveal);
  app.directive("parallax", parallax);
};
