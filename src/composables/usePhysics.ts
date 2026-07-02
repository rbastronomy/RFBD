// Realistic gravity for a set of DOM "boxes" inside a container, powered by
// matter-js. Each box element is synced to a physics body every frame; the user
// can grab and throw them with the mouse. Falls back to nothing (static layout)
// when the user prefers reduced motion.
//
// Built on the standard matter-js renderless pattern (Engine + custom DOM sync)
// plus a MouseConstraint for drag-and-throw.

import { onMounted, onUnmounted, type Ref } from "vue";
import * as Matter from "matter-js";

interface PhysicsOptions {
  container: Ref<HTMLElement | null>;
  boxes: Ref<HTMLElement[]>;
  /** Side length (px) of each square box. */
  size?: number;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function usePhysics({ container, boxes, size = 72 }: PhysicsOptions) {
  let engine: Matter.Engine | null = null;
  let runner = false;
  let raf = 0;
  let walls: Matter.Body[] = [];
  let bodies: Matter.Body[] = [];
  let mouseConstraint: Matter.MouseConstraint | null = null;
  let started = false;
  let io: IntersectionObserver | null = null;
  let ro: ResizeObserver | null = null;

  const WALL = 240;

  // Build the floor/side walls/ceiling. `top` is the highest point the boxes
  // spawn from — the ceiling and side walls are extended to enclose that whole
  // column so no box is ever left trapped above a low ceiling.
  const buildWalls = (w: number, h: number, top = -WALL) => {
    const opts = { isStatic: true, restitution: 0.2 };
    const spanTop = Math.min(top, -WALL); // never below the visible area
    const cy = (h + spanTop) / 2; // vertical center of the enclosed column
    const wallH = h - spanTop + WALL * 2; // tall enough to cover spawn + play area
    return [
      Matter.Bodies.rectangle(w / 2, h + WALL / 2, w + WALL * 2, WALL, opts), // floor
      Matter.Bodies.rectangle(-WALL / 2, cy, WALL, wallH, opts), // left
      Matter.Bodies.rectangle(w + WALL / 2, cy, WALL, wallH, opts), // right
      Matter.Bodies.rectangle(w / 2, spanTop - WALL / 2, w + WALL * 2, WALL, opts), // ceiling
    ];
  };

  const start = () => {
    const el = container.value;
    if (!el || started || prefersReducedMotion()) return;
    started = true;

    const w = el.clientWidth;
    const h = el.clientHeight;

    engine = Matter.Engine.create();
    engine.gravity.y = 1;
    const world = engine.world;

    // One body per box element. Spawn them in a loosely-scattered grid stacked
    // just above the stage (rather than a single tall vertical tower) so every
    // box drops into view and they fan out to fill the space as they land.
    const cols = Math.max(3, Math.floor(w / (size + 28)));
    const cellW = w / cols;
    let topY = 0;
    bodies = boxes.value.map((box, i) => {
      const bw = box.offsetWidth || size;
      const bh = box.offsetHeight || size;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = col * cellW + cellW / 2 + (Math.random() - 0.5) * cellW * 0.5;
      const y = -bh - row * (bh + 26) - Math.random() * 24;
      topY = Math.min(topY, y);
      const body = Matter.Bodies.rectangle(x, y, bw, bh, {
        restitution: 0.45,
        friction: 0.35,
        frictionAir: 0.018,
        chamfer: { radius: 16 },
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.12);
      return body;
    });

    // Enclose the full spawn column so nothing escapes above the ceiling.
    walls = buildWalls(w, h, topY - size);
    Matter.World.add(world, walls);
    Matter.World.add(world, bodies);

    // Drag-and-throw with the mouse.
    const mouse = Matter.Mouse.create(el);
    // Let the page keep scrolling over the canvas area.
    el.removeEventListener("wheel", (mouse as unknown as { mousewheel: EventListener }).mousewheel);
    mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.18, render: { visible: false } },
    });
    Matter.World.add(world, mouseConstraint);

    runner = true;
    const frame = () => {
      if (!engine || !runner) return;
      Matter.Engine.update(engine, 1000 / 60);
      for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        const box = boxes.value[i];
        if (!body || !box) continue;
        const bw = box.offsetWidth || size;
        const bh = box.offsetHeight || size;
        box.style.transform = `translate(${body.position.x - bw / 2}px, ${
          body.position.y - bh / 2
        }px) rotate(${body.angle}rad)`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // Keep the floor/walls correct on resize.
    ro = new ResizeObserver(() => {
      if (!engine) return;
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      Matter.World.remove(engine.world, walls);
      walls = buildWalls(nw, nh);
      Matter.World.add(engine.world, walls);
    });
    ro.observe(el);
  };

  const stop = () => {
    runner = false;
    cancelAnimationFrame(raf);
    if (mouseConstraint) Matter.World.remove(engine!.world, mouseConstraint);
    if (engine) {
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    }
    engine = null;
    bodies = [];
    walls = [];
    mouseConstraint = null;
    ro?.disconnect();
    ro = null;
  };

  onMounted(() => {
    const el = container.value;
    if (!el || prefersReducedMotion()) return;
    // Start dropping the boxes only once the section scrolls into view.
    io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io?.disconnect();
          io = null;
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
  });

  onUnmounted(() => {
    io?.disconnect();
    io = null;
    stop();
  });

  return { stop };
}
