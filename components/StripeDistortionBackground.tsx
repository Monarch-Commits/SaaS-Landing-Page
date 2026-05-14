'use client';

import { useEffect, useRef, useCallback } from 'react';

const RAY_COUNT = 350;
const FAN_START = -Math.PI * 0.965;
const FAN_END = -Math.PI * 0.035;
const SPRING_K = 210;
const DAMP_RATE = 8;
const MOUSE_RADIUS = 270;

const PALETTE: [number, number, number][] = [
  [99, 102, 241],
  [139, 92, 246],
  [168, 85, 247],
  [59, 130, 246],
  [167, 139, 250],
  [196, 181, 253],
  [129, 140, 248],
];

interface RayData {
  baseAngle: Float32Array;
  noiseA: Float32Array;
  noiseB: Float32Array;
  angle: Float32Array;
  len: Float32Array;
  width: Float32Array;
  opacity: Float32Array;
  colorIdx: Int32Array;

  cp1X: Float32Array;
  cp1Y: Float32Array;
  cp1VX: Float32Array;
  cp1VY: Float32Array;

  cp2X: Float32Array;
  cp2Y: Float32Array;
  cp2VX: Float32Array;
  cp2VY: Float32Array;
}

interface PointerState {
  rawX: number;
  rawY: number;
  smX: number;
  smY: number;
}

function rgba([r, g, b]: [number, number, number], a: number) {
  return `rgba(${r},${g},${b},${a})`;
}

function buildRays(w: number, h: number): RayData {
  const cx = w * 0.5;
  const cy = h;

  const d: RayData = {
    baseAngle: new Float32Array(RAY_COUNT),
    noiseA: new Float32Array(RAY_COUNT),
    noiseB: new Float32Array(RAY_COUNT),
    angle: new Float32Array(RAY_COUNT),
    len: new Float32Array(RAY_COUNT),
    width: new Float32Array(RAY_COUNT),
    opacity: new Float32Array(RAY_COUNT),
    colorIdx: new Int32Array(RAY_COUNT),

    cp1X: new Float32Array(RAY_COUNT),
    cp1Y: new Float32Array(RAY_COUNT),
    cp1VX: new Float32Array(RAY_COUNT),
    cp1VY: new Float32Array(RAY_COUNT),

    cp2X: new Float32Array(RAY_COUNT),
    cp2Y: new Float32Array(RAY_COUNT),
    cp2VX: new Float32Array(RAY_COUNT),
    cp2VY: new Float32Array(RAY_COUNT),
  };

  for (let i = 0; i < RAY_COUNT; i++) {
    const t = i / RAY_COUNT + (Math.random() - 0.5) / RAY_COUNT;
    const a = FAN_START + t * (FAN_END - FAN_START);
    const l = h * (0.28 + Math.random() * 0.62);

    d.baseAngle[i] = a;
    d.noiseA[i] = Math.random() * Math.PI * 2;
    d.noiseB[i] = Math.random() * Math.PI * 2;
    d.angle[i] = a;
    d.len[i] = l;
    d.width[i] = 0.3 + Math.random() * 1.2;
    d.opacity[i] = 0.2 + Math.random() * 0.8;
    d.colorIdx[i] = (Math.random() * PALETTE.length) | 0;

    const c = Math.cos(a);
    const s = Math.sin(a);

    d.cp1X[i] = cx + c * l * 0.35;
    d.cp1Y[i] = cy + s * l * 0.35;
    d.cp2X[i] = cx + c * l * 0.7;
    d.cp2Y[i] = cy + s * l * 0.7;
  }

  return d;
}

export default function StripeDistortionBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const raysRef = useRef<RayData | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const timeRef = useRef(0);

  // Logical (CSS pixel) dimensions — updated on every resize
  const dimsRef = useRef({ w: 0, h: 0 });

  const pointerRef = useRef<PointerState>({
    rawX: -9999,
    rawY: -9999,
    smX: -9999,
    smY: -9999,
  });

  // ─── Resize ───────────────────────────────────────────────────────────────
  const resize = useCallback(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;

    dimsRef.current = { w, h };

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctxRef.current = ctx;
    }

    raysRef.current = buildRays(w, h);
  }, []);

  // ─── Render loop ──────────────────────────────────────────────────────────
  const tick = useCallback((t: number) => {
    const ctx = ctxRef.current;
    const rays = raysRef.current;
    if (!ctx || !rays) return;

    const dt = Math.min((t - lastRef.current) / 1000, 0.05);
    lastRef.current = t;
    timeRef.current += dt;

    const { w: W, h: H } = dimsRef.current;
    const cx = W * 0.5;
    const cy = H;

    const p = pointerRef.current;
    const lerp = 1 - Math.exp(-14 * dt);
    p.smX += (p.rawX - p.smX) * lerp;
    p.smY += (p.rawY - p.smY) * lerp;

    const damp = Math.exp(-DAMP_RATE * dt);
    const r2 = MOUSE_RADIUS * MOUSE_RADIUS;

    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < RAY_COUNT; i++) {
      const base = rays.baseAngle[i];
      const noise =
        Math.sin(timeRef.current * 0.27 + rays.noiseA[i]) * 0.075 +
        Math.sin(timeRef.current * 0.71 + rays.noiseB[i]) * 0.028;

      const a = base + noise;
      rays.angle[i] = a;

      const len = rays.len[i];
      const c = Math.cos(a);
      const s = Math.sin(a);

      let t1x = cx + c * len * 0.35;
      let t1y = cy + s * len * 0.35;
      let t2x = cx + c * len * 0.7;
      let t2y = cy + s * len * 0.7;

      const dx1 = p.smX - t1x;
      const dy1 = p.smY - t1y;
      const d1 = dx1 * dx1 + dy1 * dy1;
      if (d1 < r2) {
        const dist = Math.sqrt(d1);
        const f = (1 - (dist / MOUSE_RADIUS) ** 2) ** 2 * 200;
        t1x -= (dx1 / dist) * f;
        t1y -= (dy1 / dist) * f;
      }

      const dx2 = p.smX - t2x;
      const dy2 = p.smY - t2y;
      const d2 = dx2 * dx2 + dy2 * dy2;
      if (d2 < r2) {
        const dist = Math.sqrt(d2);
        const f = (1 - (dist / MOUSE_RADIUS) ** 2) ** 2 * 200;
        t2x -= (dx2 / dist) * f;
        t2y -= (dy2 / dist) * f;
      }

      rays.cp1VX[i] = (rays.cp1VX[i] + (t1x - rays.cp1X[i]) * SPRING_K * dt) * damp;
      rays.cp1VY[i] = (rays.cp1VY[i] + (t1y - rays.cp1Y[i]) * SPRING_K * dt) * damp;
      rays.cp1X[i] += rays.cp1VX[i] * dt;
      rays.cp1Y[i] += rays.cp1VY[i] * dt;

      rays.cp2VX[i] = (rays.cp2VX[i] + (t2x - rays.cp2X[i]) * SPRING_K * dt) * damp;
      rays.cp2VY[i] = (rays.cp2VY[i] + (t2y - rays.cp2Y[i]) * SPRING_K * dt) * damp;
      rays.cp2X[i] += rays.cp2VX[i] * dt;
      rays.cp2Y[i] += rays.cp2VY[i] * dt;

      const endX = cx + c * len;
      const endY = cy + s * len;

      const col = PALETTE[rays.colorIdx[i]];
      const grad = ctx.createLinearGradient(cx, cy, endX, endY);
      grad.addColorStop(0, rgba(col, 0));
      grad.addColorStop(1, rgba(col, 0.8));

      ctx.strokeStyle = grad;
      ctx.lineWidth = rays.width[i];
      ctx.globalAlpha = rays.opacity[i];

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.bezierCurveTo(
        rays.cp1X[i], rays.cp1Y[i],
        rays.cp2X[i], rays.cp2Y[i],
        endX, endY,
      );
      ctx.stroke();
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // ─── Mount / unmount ──────────────────────────────────────────────────────
  useEffect(() => {
    resize();

    // ResizeObserver — handles container size changes (sidebar open/close, etc.)
    const ro = new ResizeObserver(resize);
    if (wrapRef.current) ro.observe(wrapRef.current);

    // Also listen for window resize for DPR changes (e.g. dragging between monitors)
    window.addEventListener('resize', resize);

    rafRef.current = requestAnimationFrame((t) => {
      lastRef.current = t;
      rafRef.current = requestAnimationFrame(tick);
    });

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [resize, tick]);

  // ─── Pointer helpers (CSS pixels — no scaling needed) ─────────────────────
  const getPointerPos = (clientX: number, clientY: number) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const pos = getPointerPos(e.clientX, e.clientY);
    if (!pos) return;
    pointerRef.current.rawX = pos.x;
    pointerRef.current.rawY = pos.y;
  }, []);

  const onMouseLeave = useCallback(() => {
    pointerRef.current.rawX = -9999;
    pointerRef.current.rawY = -9999;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    const pos = getPointerPos(touch.clientX, touch.clientY);
    if (!pos) return;
    pointerRef.current.rawX = pos.x;
    pointerRef.current.rawY = pos.y;
  }, []);

  const onTouchEnd = useCallback(() => {
    pointerRef.current.rawX = -9999;
    pointerRef.current.rawY = -9999;
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative h-screen w-full overflow-hidden"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        background: 'radial-gradient(ellipse 120% 60% at 50% 100%, #ededff 0%, #fff 70%)',
        touchAction: 'none', // prevents scroll interference during touch
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}