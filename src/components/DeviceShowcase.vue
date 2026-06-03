<script setup lang="ts">
import { reactive, computed } from "vue";
import type { ProjectPreview } from "@/content/types";
import { useTranslations } from "@/i18n/useTranslations";

const props = defineProps<{
  preview?: ProjectPreview;
  title: string;
}>();

defineEmits<{ (e: "launch"): void }>();

const { t } = useTranslations();

// Resolve a source per device, falling back to the desktop shot when a
// device-specific screenshot has not been captured yet.
const desktopSrc = computed(() => props.preview?.desktop);
const tabletSrc = computed(() => props.preview?.tablet ?? props.preview?.desktop);
const mobileSrc = computed(() => props.preview?.mobile ?? props.preview?.desktop);

// Track which device images failed (e.g. before capture-shots has run) so we can
// show a tidy placeholder instead of a broken image.
const failed = reactive<Record<string, boolean>>({});
const onError = (key: string) => (failed[key] = true);
</script>

<template>
  <figure class="ds">
    <figcaption class="ds__bar">
      <span class="crosshair" aria-hidden="true">+</span>
      <span class="ds__label telemetry">{{ t.project.preview }}</span>
    </figcaption>

    <div class="ds__stage" :aria-label="`${title} — ${t.project.preview}`">
      <!-- Laptop (back, center) — realistic lid + hinge base -->
      <div class="device device--laptop float-a">
        <div class="laptop__lid">
          <div class="laptop__cam" aria-hidden="true"></div>
          <div class="device__screen">
            <img
              v-if="desktopSrc && !failed.desktop"
              :src="desktopSrc"
              :alt="`${title} — desktop`"
              loading="lazy"
              @error="onError('desktop')"
            />
            <span v-else class="device__ph telemetry">// {{ title }}</span>
          </div>
        </div>
        <div class="laptop__base" aria-hidden="true">
          <span class="laptop__notch"></span>
        </div>
      </div>

      <!-- Tablet (right) -->
      <div class="device device--tablet float-b">
        <span class="tablet__cam" aria-hidden="true"></span>
        <span class="tablet__btn tablet__btn--power" aria-hidden="true"></span>
        <span class="tablet__btn tablet__btn--vol" aria-hidden="true"></span>
        <div class="device__screen">
          <img
            v-if="tabletSrc && !failed.tablet"
            :src="tabletSrc"
            :alt="`${title} — tablet`"
            loading="lazy"
            @error="onError('tablet')"
          />
          <span v-else class="device__ph telemetry">TABLET</span>
          <span class="tablet__home" aria-hidden="true"></span>
        </div>
      </div>

      <!-- Phone (front, left) -->
      <div class="device device--phone float-c">
        <span class="phone__btn phone__btn--silent" aria-hidden="true"></span>
        <span class="phone__btn phone__btn--vol-up" aria-hidden="true"></span>
        <span class="phone__btn phone__btn--vol-dn" aria-hidden="true"></span>
        <span class="phone__btn phone__btn--power" aria-hidden="true"></span>
        <div class="device__screen">
          <div class="phone__island" aria-hidden="true"></div>
          <div class="phone__status" aria-hidden="true">
            <span class="phone__time">12:04</span>
            <span class="phone__status-icons">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21L15.6 16.2C14.6 15.45 13.35 15 12 15C10.65 15 9.4 15.45 8.4 16.2L12 21ZM12 3C7.95 3 4.2 4.4 1.2 6.8L3.6 10C6 8.2 8.85 7 12 7C15.15 7 18 8.2 20.4 10L22.8 6.8C19.8 4.4 16.05 3 12 3Z"/></svg>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2H10V4H8.33C7.6 4 7 4.6 7 5.33V20.67C7 21.4 7.6 22 8.33 22H15.67C16.4 22 17 21.4 17 20.67V5.33C17 4.6 16.4 4 15.67 4Z"/></svg>
            </span>
          </div>
          <img
            v-if="mobileSrc && !failed.mobile"
            :src="mobileSrc"
            :alt="`${title} — mobile`"
            loading="lazy"
            @error="onError('mobile')"
          />
          <span v-else class="device__ph telemetry">MOBILE</span>
          <span class="phone__home" aria-hidden="true"></span>
        </div>
      </div>
    </div>

    <div class="ds__actions">
      <p class="ds__hint telemetry">{{ t.project.previewHint }}</p>
      <button type="button" class="ds__cta" @click="$emit('launch')">
        <span class="ds__play" aria-hidden="true">▶</span>
        {{ t.project.viewDemo }}
      </button>
    </div>
  </figure>
</template>

<style scoped lang="scss">
.ds {
  border: var(--border-w) solid var(--c-line-strong);
  background: var(--c-bg-raised);
  margin: 0;

  &__bar {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 0.9rem;
    border-bottom: var(--border-w) solid var(--c-line-strong);

    .crosshair {
      color: var(--c-accent);
    }
  }

  &__label {
    color: var(--c-accent);
  }

  // Composed scene: devices are positioned in % of the stage width so the whole
  // thing scales fluidly inside the project panel.
  &__stage {
    position: relative;
    // Contain the devices' z-index (laptop/tablet/phone use z 1–3) in a local
    // stacking context, so they can't paint over the project-detail boot overlay
    // (.detail is position:fixed → its children share one stacking context).
    isolation: isolate;
    width: 100%;
    aspect-ratio: 16 / 9;
    background:
      radial-gradient(120% 90% at 50% 0%, color-mix(in srgb, var(--c-accent) 8%, transparent), transparent 60%),
      var(--c-bg);
    overflow: hidden;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    padding: 0.9rem;
    border-top: var(--border-w) solid var(--c-line-strong);
  }

  &__hint {
    color: var(--c-muted);
  }

  &__cta {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--f-mono);
    font-size: var(--fs-mono);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--c-on-accent);
    background: var(--c-accent);
    border: var(--border-w) solid var(--c-accent);
    padding: 0.55rem 1rem;
    cursor: pointer;
    transition:
      background-color 0.2s,
      color 0.2s;

    &:hover {
      background: transparent;
      color: var(--c-accent);
    }
  }

  &__play {
    font-size: 0.75rem;
  }
}

/* ---------- Devices ----------
   Realistic dark frames (Apple-style). These are the deliberate exception to the
   global brutalist `border-radius: 0 !important` rule (reset.scss) — every radius
   below carries `!important` to win against it. Frame colors are fixed dark tones
   (not theme vars) so the devices read as physical hardware in both themes. */

// Frame / hardware palette
$dev-frame: #15181f;
$dev-frame-edge: #0b0d12;
$dev-chrome: #0b0f17;

.device {
  position: absolute;

  &__screen {
    position: relative;
    overflow: hidden;
    background: #000;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      display: block;
    }
  }

  &__ph {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    color: var(--c-muted);
    background: var(--c-bg);
    text-align: center;
    padding: 0.5rem;
  }
}

/* Laptop: bezelled lid + realistic hinge base */
.device--laptop {
  width: 66%;
  left: 50%;
  top: 9%;
  transform: translateX(-50%);
  z-index: 1;

  .laptop__lid {
    position: relative;
    background: $dev-frame;
    padding: 7px 7px 8px;
    border-radius: 12px 12px 5px 5px !important;
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.04),
      0 22px 44px rgba(0, 0, 0, 0.5);
  }

  .laptop__cam {
    position: absolute;
    top: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    background: #2b3340;
    border-radius: 50% !important;
    z-index: 2;
  }

  .device__screen {
    aspect-ratio: 16 / 10;
    border-radius: 4px !important;
  }

  // Hinge base: a wider gradient slab with a center notch (lid-open grip).
  .laptop__base {
    position: relative;
    width: 118%;
    left: -9%;
    margin: 0 auto;
    height: 14px;
    background: linear-gradient(#cbd1d9, #9aa2ad 55%, #5f6671);
    border-radius: 0 0 10px 10px !important;
    box-shadow:
      inset 0 -3px 4px rgba(0, 0, 0, 0.25),
      0 12px 20px rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .laptop__notch {
    width: 13%;
    height: 6px;
    background: #6b7280;
    border-radius: 0 0 6px 6px !important;
  }
}

/* Tablet: dark frame, angled to the right */
.device--tablet {
  width: 31%;
  right: 1%;
  bottom: 5%;
  z-index: 2;
  transform: rotate(6deg);
  background: $dev-frame;
  padding: 9px;
  border-radius: 22px !important;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.04),
    0 20px 40px rgba(0, 0, 0, 0.5);

  .tablet__cam {
    position: absolute;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    background: $dev-chrome;
    border-radius: 50% !important;
    z-index: 3;
  }

  .tablet__btn {
    position: absolute;
    background: $dev-frame-edge;

    &--vol {
      right: -3px;
      top: 16%;
      width: 3px;
      height: 14%;
      border-radius: 0 2px 2px 0 !important;
    }

    &--power {
      top: -3px;
      right: 20%;
      width: 14%;
      height: 3px;
      border-radius: 2px 2px 0 0 !important;
    }
  }

  .device__screen {
    aspect-ratio: 3 / 4;
    border-radius: 12px !important;
  }

  .tablet__home {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 30%;
    height: 4px;
    background: rgba(255, 255, 255, 0.55);
    border-radius: 99px !important;
    z-index: 3;
  }
}

/* Phone: front, left — dynamic island, side buttons, status bar */
.device--phone {
  width: 17%;
  left: 3%;
  bottom: 2%;
  z-index: 3;
  background: $dev-frame;
  padding: 6px;
  border-radius: 26px !important;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.05),
    0 16px 32px rgba(0, 0, 0, 0.55);

  .phone__btn {
    position: absolute;
    background: $dev-frame-edge;

    &--silent {
      left: -3px;
      top: 16%;
      width: 3px;
      height: 6%;
      border-radius: 2px 0 0 2px !important;
    }
    &--vol-up {
      left: -3px;
      top: 25%;
      width: 3px;
      height: 9%;
      border-radius: 2px 0 0 2px !important;
    }
    &--vol-dn {
      left: -3px;
      top: 36%;
      width: 3px;
      height: 9%;
      border-radius: 2px 0 0 2px !important;
    }
    &--power {
      right: -3px;
      top: 28%;
      width: 3px;
      height: 12%;
      border-radius: 0 2px 2px 0 !important;
    }
  }

  .device__screen {
    aspect-ratio: 9 / 19;
    border-radius: 22px !important;
  }

  .phone__island {
    position: absolute;
    top: 7px;
    left: 50%;
    transform: translateX(-50%);
    width: 42%;
    height: 6%;
    max-height: 16px;
    background: #000;
    border-radius: 99px !important;
    z-index: 4;
  }

  .phone__status {
    position: absolute;
    top: 4px;
    left: 0;
    width: 100%;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 9%;
    color: #fff;
    font-family: var(--f-mono);
    pointer-events: none;
  }

  .phone__time {
    font-size: clamp(5px, 0.9vw, 9px);
    font-weight: 600;
  }

  .phone__status-icons {
    display: flex;
    gap: 2px;
    align-items: center;

    svg {
      width: clamp(6px, 1vw, 10px);
      height: clamp(6px, 1vw, 10px);
    }
  }

  .phone__home {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 32%;
    height: 3px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 99px !important;
    z-index: 4;
  }
}

/* ---------- Float animations ---------- */
.float-a {
  animation: float-a 6s ease-in-out infinite;
}
.float-b {
  animation: float-b 7s ease-in-out infinite;
}
.float-c {
  animation: float-c 5.5s ease-in-out infinite;
}

@keyframes float-a {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-2.5%);
  }
}
@keyframes float-b {
  0%,
  100% {
    transform: rotate(6deg) translateY(0);
  }
  50% {
    transform: rotate(6deg) translateY(-4%);
  }
}
@keyframes float-c {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5%);
  }
}

/* On very narrow panels, hide the tablet and enlarge phone/laptop for clarity */
@media (max-width: 560px) {
  .device--laptop {
    width: 78%;
    top: 8%;
  }
  .device--tablet {
    display: none;
  }
  .device--phone {
    width: 22%;
    left: 6%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .float-a,
  .float-b,
  .float-c {
    animation: none;
  }
}
</style>
