<script setup lang="ts">
import { computed, ref } from "vue";
import { useTranslations } from "@/i18n/useTranslations";

const { t } = useTranslations();
const active = ref(0);
const current = computed(() => t.value.builds.items[active.value]);

// Small helpers to fake "images" (avatars / product thumbnails) from a hue.
const avatar = (hue: number) => ({
  background: `hsl(${hue} 48% 88%)`,
  color: `hsl(${hue} 55% 30%)`,
});
const thumb = (hue: number) => ({
  background: `linear-gradient(135deg, hsl(${hue} 60% 82%), hsl(${(hue + 40) % 360} 55% 68%))`,
});

// --- 0 SaaS: interactive chart (period toggle changes the bars) ---
const saasStats = [
  { label: "Ingresos", value: "$12.4k", trend: "▲ 8%", up: true },
  { label: "Usuarios", value: "1.204", trend: "▲ 3%", up: true },
  { label: "Conversión", value: "3,8%", trend: "▼ 1%", up: false },
];
const periods = ["Mes", "Trim", "Año"];
const chartData: number[][] = [
  [42, 66, 50, 88, 60, 74],
  [55, 40, 72, 58, 92, 68],
  [30, 48, 62, 70, 84, 96],
];
const saasPeriod = ref(0);
const bars = computed(() => chartData[saasPeriod.value] ?? []);
const barPeak = computed(() => Math.max(...bars.value));
const periodLabel = computed(() => (periods[saasPeriod.value] ?? "").toLowerCase());

// --- 1 Web app: form + live preview ---
// (static content, uses avatar())

// --- 2 Management: table with avatars ---
const tableRows = [
  { name: "Acme S.A.", ini: "AC", hue: 150, status: "Activo", cls: "ok", date: "12 Jun", total: "$340" },
  { name: "Nova Ltda.", ini: "NL", hue: 210, status: "Pendiente", cls: "warn", date: "11 Jun", total: "$180" },
  { name: "Delta SpA", ini: "DS", hue: 275, status: "Activo", cls: "ok", date: "09 Jun", total: "$920" },
  { name: "Orbe Group", ini: "OG", hue: 20, status: "Pausado", cls: "off", date: "07 Jun", total: "$60" },
];

// --- 3 SPA: interactive tabs swap the tile set ---
const spaTabs = ["Panel", "Proyectos", "Equipo", "Ajustes"];
const spaSets = [
  ["Resumen", "Ingresos", "Tareas", "Notas", "Actividad", "Metas"],
  ["Proyecto A", "Proyecto B", "Proyecto C", "Backlog", "Sprint", "Roadmap"],
  ["Ana", "Luis", "Sofía", "Marco", "Equipo", "Invitar"],
  ["Perfil", "Seguridad", "Plan", "Alertas", "API", "Tema"],
];
const spaTab = ref(0);
const spaTiles = computed(() => spaSets[spaTab.value]);

// --- 4 ERP: modules + approval flow ---
const erpMods = [
  { name: "Ventas", n: "128" },
  { name: "Inventario", n: "1.4k" },
  { name: "Finanzas", n: "$54k" },
  { name: "RR.HH.", n: "42" },
  { name: "Compras", n: "87" },
  { name: "Reportes", n: "16" },
];
const erpFlow = [
  { label: "Solicitud", state: "done" },
  { label: "Revisión", state: "done" },
  { label: "Aprobación", state: "on" },
  { label: "Pago", state: "" },
];

// --- 5 E-commerce: products with thumbnails ---
const products = [
  { name: "Polera Studio", price: "$19.990", hue: 150, tag: "Nuevo" },
  { name: "Gorro Lana", price: "$12.500", hue: 30, tag: "" },
  { name: "Tote Bag", price: "$9.990", hue: 265, tag: "-20%" },
];
</script>

<template>
  <section id="work" class="builds">
    <div class="container">
      <header class="builds__head" v-reveal>
        <span class="eyebrow">{{ t.builds.label }}</span>
        <h2 class="section-title builds__title">{{ t.builds.heading }}</h2>
        <p class="builds__lead">{{ t.builds.lead }}</p>
      </header>

      <div class="builds__card" :style="{ backgroundImage: `url(/art/6.jpg)` }">
        <div class="stagew">
          <!-- browser frame with a mockup per build type -->
          <div class="window" :key="active">
            <div class="window__bar">
              <span class="dotr" /><span class="dotr" /><span class="dotr" />
              <span class="window__url">{{ current?.label }}</span>
            </div>
            <div class="window__body" :data-variant="active">
              <!-- 0 SaaS dashboard — interactive chart -->
              <template v-if="active === 0">
                <div class="app app--saas">
                  <div class="app__top">
                    <span class="app__logo" />
                    <b class="app__name">Panel</b>
                    <span class="app__spacer" />
                    <span class="app__pill"><i class="app__live" />En línea</span>
                    <span class="ava ava--me">RB</span>
                  </div>
                  <div class="mstats">
                    <div v-for="s in saasStats" :key="s.label" class="mstat">
                      <span class="mstat__l">{{ s.label }}</span>
                      <b class="mstat__v">{{ s.value }}</b>
                      <i class="mstat__t" :class="s.up ? 'up' : 'down'">{{ s.trend }}</i>
                    </div>
                  </div>
                  <div class="mcard">
                    <div class="mcard__head">
                      <span class="mcard__t">Ingresos por {{ periodLabel }}</span>
                      <div class="seg" role="tablist">
                        <button
                          v-for="(p, i) in periods"
                          :key="p"
                          type="button"
                          class="seg__b"
                          :class="{ on: saasPeriod === i }"
                          :aria-selected="saasPeriod === i"
                          @click="saasPeriod = i"
                        >{{ p }}</button>
                      </div>
                    </div>
                    <div class="mchart">
                      <i
                        v-for="(h, i) in bars"
                        :key="i"
                        class="mbar"
                        :class="{ peak: h === barPeak }"
                        :style="{ height: h + '%' }"
                      />
                    </div>
                  </div>
                </div>
              </template>

              <!-- 1 Web app — form + live preview -->
              <template v-else-if="active === 1">
                <div class="app app--web">
                  <form class="mform" @submit.prevent>
                    <span class="mform__t">Nuevo cliente</span>
                    <label class="mfield"><span>Nombre</span><div class="minput">Juan Pérez</div></label>
                    <label class="mfield"><span>Correo</span><div class="minput">juan@correo.com</div></label>
                    <label class="mfield"><span>Plan</span><div class="mselect">Profesional<em>▾</em></div></label>
                    <button class="mbtn" type="button">Guardar</button>
                  </form>
                  <div class="mpreview">
                    <span class="ava ava--lg" :style="avatar(150)">JP</span>
                    <b class="mpreview__name">Juan Pérez</b>
                    <span class="mpreview__sub">Plan Profesional · <em class="ok">Activo</em></span>
                    <div class="mpreview__row"><span>Correo</span><em>juan@correo.com</em></div>
                    <div class="mpreview__row"><span>Registro</span><em>Hoy</em></div>
                    <div class="mpreview__row"><span>ID</span><em>#00124</em></div>
                  </div>
                </div>
              </template>

              <!-- 2 Management system — sidebar + table -->
              <template v-else-if="active === 2">
                <div class="app app--mgmt">
                  <aside class="rail">
                    <span class="rail__logo" />
                    <span class="rail__i on" /><span class="rail__i" /><span class="rail__i" /><span class="rail__i" />
                  </aside>
                  <div class="app__main">
                    <div class="app__search">
                      <span class="app__mag" />Buscar cliente…
                      <span class="app__spacer" /><span class="mbtn mbtn--sm">+ Nuevo</span>
                    </div>
                    <div class="mtable">
                      <div class="mthead"><span>Cliente</span><span>Estado</span><span>Fecha</span><span>Total</span></div>
                      <div v-for="r in tableRows" :key="r.name" class="mtrow">
                        <span class="mtd mtd--who"><em class="ava" :style="avatar(r.hue)">{{ r.ini }}</em>{{ r.name }}</span>
                        <span class="mtd"><em class="mbadge" :class="r.cls">{{ r.status }}</em></span>
                        <span class="mtd">{{ r.date }}</span>
                        <span class="mtd mtd--num">{{ r.total }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </template>

              <!-- 3 SPA — interactive tabs swap tiles -->
              <template v-else-if="active === 3">
                <div class="app app--spa">
                  <div class="mnav" role="tablist">
                    <button
                      v-for="(tb, i) in spaTabs"
                      :key="tb"
                      type="button"
                      class="mnav__b"
                      :class="{ on: spaTab === i }"
                      :aria-selected="spaTab === i"
                      @click="spaTab = i"
                    >{{ tb }}</button>
                  </div>
                  <div class="mgrid mgrid--3">
                    <div v-for="c in spaTiles" :key="c" class="mtile">
                      <span class="mtile__ic" /><span class="mtile__l">{{ c }}</span>
                    </div>
                  </div>
                </div>
              </template>

              <!-- 4 ERP — sidebar + modules + approval flow -->
              <template v-else-if="active === 4">
                <div class="app app--erp">
                  <aside class="rail">
                    <span class="rail__logo" />
                    <span class="rail__i on" /><span class="rail__i" /><span class="rail__i" /><span class="rail__i" /><span class="rail__i" />
                  </aside>
                  <div class="app__main">
                    <div class="mmods">
                      <div v-for="m in erpMods" :key="m.name" class="mmod">
                        <span class="mdot" />
                        <span class="mmod__n">{{ m.name }}</span>
                        <b class="mmod__v">{{ m.n }}</b>
                      </div>
                    </div>
                    <div class="mflow">
                      <span class="mflow__t">Flujo de aprobación</span>
                      <div class="mflow__row">
                        <template v-for="(f, i) in erpFlow" :key="f.label">
                          <em class="step" :class="f.state">{{ f.label }}</em>
                          <span v-if="i < erpFlow.length - 1" class="arrow" />
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </template>

              <!-- 5 E-commerce — storefront -->
              <template v-else>
                <div class="app app--shop">
                  <div class="app__top">
                    <span class="app__logo" /><b class="app__name">Tienda</b>
                    <span class="app__spacer" />
                    <span class="cart"><span class="cart__ic" /><em>3</em></span>
                  </div>
                  <div class="mshop">
                    <div v-for="p in products" :key="p.name" class="mprod">
                      <div class="mprod__img" :style="thumb(p.hue)">
                        <span v-if="p.tag" class="mprod__tag">{{ p.tag }}</span>
                      </div>
                      <span class="mprod__name">{{ p.name }}</span>
                      <div class="mprod__row">
                        <span class="mprod__price">{{ p.price }}</span>
                        <span class="mprod__add">+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <!-- caption -->
          <div class="caption" :key="`c${active}`">
            <h3>{{ current?.title }}</h3>
            <p>{{ current?.desc }}</p>
            <ul>
              <li v-for="f in current?.features ?? []" :key="f"><span class="cdot" />{{ f }}</li>
            </ul>
          </div>
        </div>

        <!-- toolbar (inside the painted card) -->
        <div class="toolbar" role="tablist">
          <button
            v-for="(b, i) in t.builds.items"
            :key="i"
            class="toolbar__item"
            :class="{ 'is-active': active === i }"
            type="button"
            role="tab"
            :aria-selected="active === i"
            @click="active = i"
          >
            {{ b.label }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../../assets/styles/mixins" as *;

.builds {
  padding-top: var(--section-pad);
}

.builds__head {
  max-width: 44ch;
  margin-bottom: 2.2rem;
}

.builds__title { margin-top: 1rem; }

.builds__lead {
  margin-top: 1rem;
  color: var(--c-muted);
  font-size: var(--fs-lead);
  line-height: 1.55;
}

.builds__card {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background-size: cover;
  background-position: center;
  padding: clamp(1.5rem, 4vw, 3rem);
  box-shadow: var(--shadow-card);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.18));
  }
}

.stagew {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: clamp(1rem, 2.5vw, 2rem);
  align-items: center;

  @include below($bp-md) {
    grid-template-columns: 1fr;
  }
}

/* browser frame */
.window {
  border-radius: 14px;
  overflow: hidden;
  background: var(--c-bg-raised);
  box-shadow: var(--shadow-pop);
  animation: fade 0.4s ease;

  &__bar {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.65rem 0.9rem;
    border-bottom: var(--hairline) solid var(--c-line);

    .dotr { width: 10px; height: 10px; border-radius: 50%; background: var(--c-line-strong); }
  }

  &__url {
    margin-left: 0.7rem;
    font-family: var(--f-mono);
    font-size: 0.7rem;
    color: var(--c-muted);
  }

  &__body {
    aspect-ratio: 16 / 10;
    padding: 1.1rem;
    background: var(--c-bg-raised);
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    overflow: hidden;
  }
}

@keyframes fade {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* caption panel */
.caption {
  background: color-mix(in srgb, var(--c-bg-raised) 94%, transparent);
  backdrop-filter: blur(4px);
  border-radius: var(--radius);
  box-shadow: var(--shadow-soft);
  padding: clamp(1.2rem, 2.4vw, 1.8rem);
  animation: fade 0.4s ease;

  h3 {
    font-family: var(--f-display);
    font-weight: 800;
    font-size: var(--fs-h3);
    letter-spacing: -0.02em;
    line-height: 1.1;
  }
  p {
    margin-top: 0.7rem;
    color: var(--c-fg-soft);
    font-size: 0.96rem;
    line-height: 1.55;
  }
  ul {
    margin-top: 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 500;
    font-size: 0.92rem;
    color: var(--c-fg-soft);
  }
  .cdot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--c-accent);
    flex-shrink: 0;
  }
}

/* toolbar — glass pills sitting inside the painted card */
.toolbar {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: clamp(1.2rem, 3vw, 2rem);

  @include below($bp-sm) {
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: flex-start;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
}

.toolbar__item {
  white-space: nowrap;
  padding: 0.62rem 1.2rem;
  border-radius: var(--radius-pill);
  background: var(--glass-bg-strong);
  backdrop-filter: blur(var(--glass-blur)) saturate(1.15);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(1.15);
  border: var(--hairline) solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  color: var(--c-fg);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--glass-border);
    box-shadow: var(--shadow-pop), 0 1px 0 rgba(255, 255, 255, 0.5) inset;
  }
  &:active { transform: translateY(0); }

  &.is-active {
    background: var(--c-accent);
    color: var(--c-on-accent);
    border-color: var(--c-accent-strong);
    box-shadow: 0 8px 22px -8px color-mix(in srgb, var(--c-accent) 60%, transparent);
  }
}

/* ============ mockup app chrome (detailed, interactive) ============ */
.window__body { font-family: var(--f-body); color: var(--c-fg); }

.app {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  animation: fade 0.35s ease;
}
.app--web,
.app--mgmt,
.app--erp { flex-direction: row; gap: 0.7rem; }

/* shared bits */
.ava {
  display: inline-flex; align-items: center; justify-content: center;
  width: 22px; height: 22px; border-radius: 50%;
  font-size: 0.6rem; font-weight: 800; flex-shrink: 0;
  background: var(--c-bg-sunken); color: var(--c-fg-soft);
  &--me { background: var(--c-accent); color: var(--c-on-accent); }
  &--lg { width: 40px; height: 40px; font-size: 0.85rem; }
}

.app__top {
  display: flex; align-items: center; gap: 0.5rem;
  padding-bottom: 0.5rem; border-bottom: var(--hairline) solid var(--c-line);
}
.app__logo { width: 16px; height: 16px; border-radius: 5px; background: var(--c-accent); flex-shrink: 0; }
.app__name { font-family: var(--f-display); font-weight: 800; font-size: 0.8rem; }
.app__spacer { flex: 1; }
.app__pill {
  display: inline-flex; align-items: center; gap: 0.35rem;
  padding: 2px 8px; border-radius: var(--radius-pill);
  font-size: 0.6rem; color: var(--c-accent-strong); background: var(--c-accent-soft);
}
.app__live { width: 6px; height: 6px; border-radius: 50%; background: var(--c-accent); }

/* left icon rail for management / erp */
.rail {
  width: 40px; flex-shrink: 0;
  display: flex; flex-direction: column; align-items: center; gap: 0.55rem;
  padding: 0.5rem 0; border-radius: 12px;
  background: var(--c-bg-sunken); border: var(--hairline) solid var(--c-line);
  &__logo { width: 18px; height: 18px; border-radius: 6px; background: var(--c-accent); margin-bottom: 0.2rem; }
  &__i { width: 16px; height: 16px; border-radius: 5px; background: var(--c-line-strong); opacity: 0.5;
    &.on { background: var(--c-accent); opacity: 1; } }
}
.app__main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.55rem; }
.app__search {
  display: flex; align-items: center; gap: 0.4rem;
  padding: 0.4rem 0.6rem; border-radius: 9px;
  background: var(--c-bg-sunken); border: var(--hairline) solid var(--c-line);
  font-size: 0.68rem; color: var(--c-muted);
}
.app__mag {
  width: 11px; height: 11px; border-radius: 50%;
  border: 1.6px solid var(--c-muted); position: relative; flex-shrink: 0;
  &::after { content: ""; position: absolute; right: -3px; bottom: -2px; width: 5px; height: 1.6px;
    background: var(--c-muted); transform: rotate(45deg); border-radius: 2px; }
}

.mbtn {
  align-self: flex-start; padding: 0.5rem 1.1rem;
  border-radius: var(--radius-pill); background: var(--c-ink); color: var(--c-on-ink);
  font-size: 0.78rem; font-weight: 600; cursor: pointer;
  transition: transform 0.16s ease, filter 0.16s ease;
  &:hover { transform: translateY(-1px); filter: brightness(1.08); }
  &--sm { padding: 0.35rem 0.7rem; font-size: 0.66rem; }
}

/* --- SaaS: KPI cards + interactive chart --- */
.mstats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; }
.mstat {
  display: flex; flex-direction: column; gap: 2px;
  padding: 0.55rem 0.65rem; border-radius: 10px;
  background: var(--c-bg-sunken); border: var(--hairline) solid var(--c-line);
  transition: transform 0.16s ease, border-color 0.16s ease;
  &:hover { transform: translateY(-2px); border-color: var(--c-accent); }
  &__l { font-size: 0.62rem; color: var(--c-muted); }
  &__v { font-family: var(--f-display); font-weight: 800; font-size: 1rem; letter-spacing: -0.02em; }
  &__t { font-size: 0.6rem; font-style: normal; &.up { color: var(--c-accent-strong); } &.down { color: #c2452f; } }
}
.mcard {
  flex: 1; display: flex; flex-direction: column; gap: 0.5rem;
  padding: 0.7rem 0.8rem; border-radius: 10px;
  background: var(--c-bg-sunken); border: var(--hairline) solid var(--c-line);
  &__head { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
  &__t { font-size: 0.66rem; font-weight: 600; color: var(--c-fg-soft); }
}
.seg {
  display: inline-flex; padding: 2px; border-radius: var(--radius-pill);
  background: var(--c-bg-raised); border: var(--hairline) solid var(--c-line);
  &__b {
    padding: 2px 8px; border-radius: var(--radius-pill);
    font-size: 0.6rem; font-weight: 600; color: var(--c-muted); cursor: pointer;
    transition: background-color 0.16s, color 0.16s;
    &.on { background: var(--c-accent); color: var(--c-on-accent); }
  }
}
.mchart {
  display: flex; align-items: flex-end; gap: 0.5rem; flex: 1; min-height: 56px;
}
.mbar {
  flex: 1; border-radius: 5px 5px 0 0; background: var(--c-accent-soft);
  transition: height 0.45s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s;
  &.peak { background: var(--c-accent); }
}

/* --- Web app: form + live preview --- */
.mform {
  flex: 1.1; display: flex; flex-direction: column; gap: 0.5rem;
  &__t { font-family: var(--f-display); font-weight: 800; font-size: 0.9rem; margin-bottom: 0.1rem; }
  .mfield { display: flex; flex-direction: column; gap: 3px;
    span { font-size: 0.62rem; color: var(--c-muted); } }
  .minput, .mselect {
    height: 30px; display: flex; align-items: center; padding: 0 0.6rem;
    border-radius: 9px; background: var(--c-bg-raised);
    border: var(--hairline) solid var(--c-line-strong);
    font-size: 0.74rem; color: var(--c-fg-soft);
  }
  .mselect { justify-content: space-between; em { font-style: normal; color: var(--c-muted); } }
  .mbtn { margin-top: 0.2rem; }
}
.mpreview {
  flex: 0.9; display: flex; flex-direction: column; gap: 0.35rem;
  padding: 0.9rem 0.8rem; border-radius: 12px;
  background: var(--c-bg-sunken); border: var(--hairline) solid var(--c-line);
  &__name { font-family: var(--f-display); font-weight: 800; font-size: 0.85rem; margin-top: 0.2rem; }
  &__sub { font-size: 0.66rem; color: var(--c-muted); em { font-style: normal; color: var(--c-accent-strong); font-weight: 600; } }
  &__row {
    display: flex; justify-content: space-between; gap: 0.5rem; margin-top: auto;
    padding-top: 0.4rem; border-top: var(--hairline) solid var(--c-line);
    font-size: 0.68rem; color: var(--c-muted);
    em { font-style: normal; color: var(--c-fg-soft); font-weight: 600; }
    & + & { margin-top: 0; }
  }
}

/* --- Management: data table with avatars --- */
.mtable {
  display: flex; flex-direction: column; flex: 1;
  .mthead, .mtrow { display: grid; grid-template-columns: 1.7fr 1fr 0.8fr 0.7fr; gap: 0.6rem; align-items: center; }
  .mthead span { font-size: 0.6rem; font-weight: 700; color: var(--c-muted); text-transform: uppercase; letter-spacing: 0.04em; }
  .mthead { padding-bottom: 6px; border-bottom: var(--hairline) solid var(--c-line-strong); }
  .mtrow {
    padding: 5px 6px; margin: 0 -6px; border-radius: 8px;
    border-bottom: var(--hairline) solid var(--c-line);
    font-size: 0.74rem; color: var(--c-fg-soft);
    transition: background-color 0.15s;
    &:hover { background: var(--c-accent-soft); }
  }
  .mtd { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mtd--who { display: flex; align-items: center; gap: 0.45rem; }
  .mtd--who .ava { width: 20px; height: 20px; font-size: 0.55rem; }
  .mtd--num { text-align: right; font-weight: 700; color: var(--c-fg); }
  .mbadge {
    font-style: normal; font-size: 0.62rem; font-weight: 600; padding: 2px 8px;
    border-radius: var(--radius-pill);
    &.ok { color: var(--c-accent-strong); background: var(--c-accent-soft); }
    &.warn { color: #9a6b00; background: rgba(214, 158, 0, 0.16); }
    &.off { color: var(--c-muted); background: var(--c-bg-raised); }
  }
}

/* --- SPA: interactive tabs + tiles --- */
.mnav {
  display: flex; gap: 0.4rem;
  &__b {
    padding: 0.3rem 0.75rem; border-radius: var(--radius-pill);
    background: var(--c-bg-sunken); font-size: 0.68rem; color: var(--c-muted); cursor: pointer;
    transition: background-color 0.16s, color 0.16s;
    &.on { background: var(--c-accent-soft); color: var(--c-accent-strong); font-weight: 600; }
  }
}
.mgrid {
  display: grid; gap: 0.55rem; flex: 1;
  &--3 { grid-template-columns: repeat(3, 1fr); grid-auto-rows: 1fr; }
}
.mtile {
  display: flex; align-items: center; gap: 0.5rem; padding: 0 0.7rem;
  border-radius: 10px; background: var(--c-bg-sunken); border: var(--hairline) solid var(--c-line);
  font-size: 0.72rem; font-weight: 600; color: var(--c-fg-soft); min-height: 38px;
  transition: transform 0.16s ease, border-color 0.16s ease;
  &:hover { transform: translateY(-2px); border-color: var(--c-accent); }
  &__ic { width: 16px; height: 16px; border-radius: 5px; background: var(--c-accent-soft); flex-shrink: 0; }
  &__l { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
}

/* --- ERP: modules + approval flow --- */
.mmods {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.55rem; flex: 1;
  .mmod {
    display: flex; align-items: center; gap: 0.45rem; padding: 0 0.7rem;
    border-radius: 10px; background: var(--c-bg-sunken); border: var(--hairline) solid var(--c-line);
    font-size: 0.72rem; font-weight: 600; color: var(--c-fg-soft);
    transition: transform 0.16s ease, border-color 0.16s ease;
    &:hover { transform: translateY(-2px); border-color: var(--c-accent); }
  }
  .mmod__n { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .mmod__v { font-family: var(--f-display); font-weight: 800; font-size: 0.78rem; color: var(--c-fg); }
  .mdot { width: 9px; height: 9px; border-radius: 3px; background: var(--c-accent); flex-shrink: 0; }
}
.mflow {
  padding: 0.6rem 0.7rem; border-radius: 10px;
  background: var(--c-bg-sunken); border: var(--hairline) solid var(--c-line);
  &__t { font-size: 0.62rem; font-weight: 700; color: var(--c-muted); text-transform: uppercase; letter-spacing: 0.04em; }
  &__row { display: flex; align-items: center; gap: 0.3rem; margin-top: 0.45rem; flex-wrap: wrap; }
  .step {
    font-style: normal; font-size: 0.64rem; font-weight: 600; padding: 3px 9px;
    border-radius: var(--radius-pill); color: var(--c-muted);
    background: var(--c-bg-raised); border: var(--hairline) solid var(--c-line);
    &.done { color: var(--c-accent-strong); background: var(--c-accent-soft); border-color: transparent; }
    &.on { color: var(--c-on-accent); background: var(--c-accent); border-color: transparent; }
  }
  .arrow { width: 10px; height: 1.5px; background: var(--c-line-strong); flex-shrink: 0; }
}

/* --- E-commerce: storefront --- */
.cart {
  display: inline-flex; align-items: center; gap: 0.3rem;
  font-size: 0.64rem; color: var(--c-fg-soft);
  em { font-style: normal; font-weight: 800; color: var(--c-on-accent); background: var(--c-accent);
    border-radius: 50%; width: 15px; height: 15px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.56rem; }
}
.cart__ic {
  width: 13px; height: 11px; border: 1.6px solid var(--c-fg-soft);
  border-top: none; border-radius: 0 0 4px 4px; position: relative;
  &::before { content: ""; position: absolute; top: -5px; left: 50%; transform: translateX(-50%);
    width: 8px; height: 5px; border: 1.6px solid var(--c-fg-soft); border-bottom: none; border-radius: 5px 5px 0 0; }
}
.mshop {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.7rem; flex: 1;
  .mprod {
    display: flex; flex-direction: column; gap: 0.3rem;
    border-radius: 11px; overflow: hidden;
    background: var(--c-bg-sunken); border: var(--hairline) solid var(--c-line);
    padding-bottom: 0.5rem;
    transition: transform 0.16s ease, border-color 0.16s ease;
    &:hover { transform: translateY(-3px); border-color: var(--c-accent); }
    &:hover .mprod__add { background: var(--c-accent); color: var(--c-on-accent); }
    &__img { position: relative; flex: 1; min-height: 54px; }
    &__tag {
      position: absolute; top: 6px; left: 6px; padding: 1px 6px; border-radius: var(--radius-pill);
      font-size: 0.55rem; font-weight: 700; color: #fff; background: rgba(20, 20, 15, 0.72);
    }
    &__name { font-size: 0.7rem; font-weight: 600; color: var(--c-fg-soft); padding: 0 0.55rem;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    &__row { display: flex; align-items: center; justify-content: space-between; padding: 0 0.55rem; }
    &__price { font-size: 0.74rem; font-weight: 800; color: var(--c-accent-strong); }
    &__add {
      width: 20px; height: 20px; border-radius: 7px; display: inline-flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 0.9rem; line-height: 1;
      background: var(--c-bg-raised); border: var(--hairline) solid var(--c-line-strong); color: var(--c-fg-soft);
      transition: background-color 0.16s, color 0.16s;
    }
  }
}

/* keep the mobile single-column window readable */
@include below($bp-sm) {
  .app--web { flex-direction: column; }
}
</style>
