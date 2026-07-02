<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import * as THREE from "three";
import { useTranslations } from "@/i18n/useTranslations";
import { scrollTo } from "@/composables/useScroll";
import TechIcon from "@/components/TechIcon.vue";

const { t } = useTranslations();

const orbit = ["React", "Vue", "Laravel", "Node", "TypeScript", "MySQL", "Tailwind", "GSAP"];

const stage = ref<HTMLElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const chips = ref<HTMLElement[]>([]);
const setChip = (el: Element | null, i: number) => {
  if (el) chips.value[i] = el as HTMLElement;
};

const reduce =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let raf = 0;
let ro: ResizeObserver | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let earth: THREE.Mesh | null = null;
const disposables: { dispose: () => void }[] = [];

onMounted(() => {
  const cv = canvas.value;
  const st = stage.value;
  if (!cv || !st) return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.z = 3.15;

  renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  // --- Earth sphere (NASA Blue Marble equirectangular texture) ---
  const geo = new THREE.SphereGeometry(1, 64, 64);
  const loader = new THREE.TextureLoader();
  const tex = loader.load("/earth.jpg", () => {
    if (reduce) draw(performance.now());
  });
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.95, metalness: 0 });
  earth = new THREE.Mesh(geo, mat);
  earth.rotation.z = 0.36; // slight axial tilt
  scene.add(earth);
  disposables.push(geo, mat, tex);

  // --- Lighting: key highlight top-left + soft sky ambient (spherical terminator) ---
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(-1.6, 1.0, 1.3);
  scene.add(key);
  scene.add(new THREE.AmbientLight(0xcfe0ff, 0.5));

  const fit = () => {
    if (!renderer || !camera) return;
    const w = st.clientWidth;
    renderer.setSize(w, w, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    if (reduce) draw(performance.now());
  };
  fit();
  ro = new ResizeObserver(fit);
  ro.observe(st);

  const t0 = performance.now();

  const positionChips = (now: number) => {
    const size = st.clientWidth;
    const c = size / 2;
    const ang = reduce ? 0 : ((now - t0) / 32000) * Math.PI * 2;
    const orbR = (size / 2) * 0.98;
    for (let i = 0; i < orbit.length; i++) {
      const el = chips.value[i];
      if (!el) continue;
      const a = ang + (i / orbit.length) * Math.PI * 2;
      const ox = c + Math.cos(a) * orbR;
      const oy = c + Math.sin(a) * orbR * 0.9;
      const front = Math.sin(a) > -0.2;
      el.style.transform = `translate(${ox}px, ${oy}px) translate(-50%, -50%)`;
      el.style.zIndex = front ? "4" : "1";
      el.style.opacity = front ? "1" : "0.5";
    }
  };

  const draw = (now: number) => {
    if (!renderer || !scene || !camera) return;
    if (earth && !reduce) earth.rotation.y += 0.0016;
    renderer.render(scene, camera);
    positionChips(now);
  };

  if (reduce) {
    draw(performance.now());
  } else {
    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
  }
});

onUnmounted(() => {
  cancelAnimationFrame(raf);
  ro?.disconnect();
  for (const d of disposables) d.dispose();
  renderer?.dispose();
  renderer = null;
  scene = null;
  camera = null;
  earth = null;
});
</script>

<template>
  <section class="globe">
    <div class="container globe__inner">
      <div class="globe__text" v-reveal>
        <span class="eyebrow">{{ t.globe.label }}</span>
        <h2 class="section-title globe__title">{{ t.globe.heading }}</h2>
        <p class="globe__body">{{ t.globe.body }}</p>
        <button class="btn btn--primary" type="button" @click="scrollTo('#contact', -8)">
          {{ t.globe.cta }}
        </button>
      </div>

      <div ref="stage" class="globe__stage" :class="{ 'is-static': reduce }" :aria-label="t.globe.hint">
        <canvas ref="canvas" class="globe__canvas" />
        <div class="orbit" aria-hidden="true">
          <div
            v-for="(tech, i) in orbit"
            :key="tech"
            :ref="(el) => setChip(el as Element | null, i)"
            class="chip"
          >
            <TechIcon :name="tech" :size="24" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../../assets/styles/mixins" as *;

.globe {
  padding-top: var(--section-pad);
}

.globe__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;

  @include below($bp-md) {
    grid-template-columns: 1fr;
  }
}

.globe__title { margin-top: 1rem; max-width: 18ch; }

.globe__body {
  margin-top: 1.1rem;
  color: var(--c-muted);
  font-size: var(--fs-lead);
  line-height: 1.55;
  max-width: 42ch;
  margin-bottom: 2rem;
}

.globe__stage {
  position: relative;
  width: 100%;
  max-width: 360px;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
  justify-self: center;
}

/* WebGL 3D earth fills the stage */
.globe__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.orbit {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
}

.chip {
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--glass-bg-strong);
  backdrop-filter: blur(var(--glass-blur)) saturate(1.15);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(1.15);
  border: var(--hairline) solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  color: var(--c-fg);
  will-change: transform;
}
</style>
