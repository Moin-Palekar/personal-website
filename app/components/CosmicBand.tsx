"use client";
import { useEffect, useRef } from "react";

type RGB = [number, number, number];
type Star = { u: number; x: number; y: number; r: number; c: RGB; ph: number; sp: number };
type Galaxy = { u: number; x: number; y: number; rx: number; ry: number; rot: number; spin: number; c: RGB };

const ASH: RGB = [243, 241, 236];
const STOPS: [number, RGB][] = [
    [0, [255, 250, 235]], [0.035, [248, 206, 140]], [0.08, [214, 120, 40]],
    [0.15, [120, 60, 70]], [0.2, [24, 32, 78]], [0.3, [12, 16, 40]],
    [0.55, [16, 24, 64]], [0.72, [14, 18, 44]], [0.86, [22, 20, 28]],
    [0.95, [70, 68, 74]], [1, ASH],
];
const UNFOLD_S = 9;   // unmeṣa: Big Bang to heat death
const GATHER_S = 4;   // nimeṣa: potential drawn back
const BREATH_S = 5;   // one inhale + exhale

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const smooth = (e0: number, e1: number, x: number) => {
    const k = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
    return k * k * (3 - 2 * k);
};
function density(u: number) {
    if (u < 0.17) return 0;
    if (u < 0.28) return 0.04;
    if (u < 0.36) return 0.5;
    if (u < 0.72) return 1;
    if (u < 0.84) return 0.45;
    if (u < 0.93) return 0.12;
    return 0.02;
}
function starColor(u: number): RGB {
    if (u < 0.45) return [190, 210, 255];
    if (u < 0.72) return [255, 240, 215];
    return [255, 150, 110];
}
function bgColor(u: number): RGB {
    for (let i = 1; i < STOPS.length; i++) {
        if (u <= STOPS[i][0]) {
            const [u0, c0] = STOPS[i - 1];
            const [u1, c1] = STOPS[i];
            const k = (u - u0) / (u1 - u0);
            return [c0[0] + (c1[0] - c0[0]) * k, c0[1] + (c1[1] - c0[1]) * k, c0[2] + (c1[2] - c0[2]) * k];
        }
    }
    return ASH;
}

export default function CosmicBand({ height = 150 }: { height?: number }) {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const cv = ref.current;
        const ctx = cv?.getContext("2d");
        const off = document.createElement("canvas");
        const oc = off.getContext("2d");
        if (!cv || !ctx || !oc) return;

        const dpr = Math.min(2, window.devicePixelRatio || 1);
        let W = 0, H = 0;
        let stars: Star[] = [];
        let gals: Galaxy[] = [];

        const gauss = () => {
            const u = Math.random() || 1e-9;
            return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * Math.random());
        };
        const centerY = (spread: number, pad: number) =>
            Math.max(pad, Math.min(H - pad, H / 2 + gauss() * H * spread));

        const seed = () => {
            stars = [];
            gals = [];
            for (let i = 0; i < 900; i++) {
                const u = Math.random();
                if (Math.random() > density(u)) continue;
                stars.push({ u, x: u * W, y: centerY(0.16, 3), r: rnd(0.4, 1.3) * (u > 0.72 ? 0.8 : 1), c: starColor(u), ph: rnd(0, 6.28), sp: rnd(0.6, 2) });
            }
            for (let i = 0; i < 16; i++) {
                const u = rnd(0.38, 0.74);
                gals.push({ u, x: u * W, y: centerY(0.08, 8), rx: rnd(5, 11), ry: rnd(2, 4), rot: rnd(0, 3.14), spin: rnd(-0.05, 0.05), c: u < 0.5 ? [170, 190, 255] : [235, 220, 255] });
            }
        };

        const resize = () => {
            W = cv.clientWidth;
            H = cv.clientHeight;
            for (const c of [cv, off]) { c.width = W * dpr; c.height = H * dpr; }
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            oc.setTransform(dpr, 0, 0, dpr, 0, 0);
            seed();
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(cv);

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const CYCLE_S = UNFOLD_S + GATHER_S;
        const REST = UNFOLD_S * 0.999; // resting frame: a fully unfolded universe
        let clock = reduced ? REST : 0;
        let cycle = 0;
        let last = performance.now();
        let raf = 0;
        let onScreen = true;
        let playing = !reduced;
        let hovering = false;
        let nextRest = REST;
        const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; });
        io.observe(cv);

        const host = cv.closest("nav") ?? cv;
        const onEnter = () => {
            if (reduced) return;
            hovering = true;
            playing = true;
            last = performance.now();
        };
        const onLeave = () => {
            hovering = false;
            const n = Math.ceil((clock - REST) / CYCLE_S);
            nextRest = n * CYCLE_S + REST;
            if (nextRest <= clock) nextRest += CYCLE_S;
        };
        host.addEventListener("pointerenter", onEnter);
        host.addEventListener("pointerleave", onLeave);

        const scene = (dt: number) => {
            const T = UNFOLD_S + GATHER_S;
            const c = Math.floor(clock / T);
            if (c !== cycle) { cycle = c; seed(); }
            const tc = clock - c * T;
            const unfolding = tc < UNFOLD_S;
            let front = 1, gather = 1, orbX = 0, orbA = 0;
            if (unfolding) front = 1 - Math.pow(1 - tc / UNFOLD_S, 1.5);
            else {
                gather = 1 - smooth(0, 1, (tc - UNFOLD_S) / GATHER_S);
                orbX = gather * W;
                orbA = 0.25 + 0.75 * (1 - gather);
            }

            for (let x = 0; x < W; x += 2) {
                const u = x / W;
                const vis = unfolding ? smooth(0, 0.03, front - u) : u < gather ? smooth(0, 0.03, gather - u) : 0;
                const c0 = bgColor(u);
                let r = ASH[0] + (c0[0] - ASH[0]) * vis;
                let g = ASH[1] + (c0[1] - ASH[1]) * vis;
                let b = ASH[2] + (c0[2] - ASH[2]) * vis;
                if (unfolding && front < 0.99) {
                    const glow = Math.exp(-Math.pow((front - u) / 0.012, 2)) * 0.55;
                    r += (255 - r) * glow; g += (236 - g) * glow; b += (200 - b) * glow;
                }
                oc.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
                oc.fillRect(x, 0, 2, H);
            }

            if (unfolding && tc < 1.4) {
                const a = 1 - tc / 1.4;
                for (let k = 6; k > 0; k--) {
                    oc.fillStyle = `rgba(255,252,240,${0.16 * a})`;
                    oc.beginPath();
                    oc.ellipse(0, H / 2, k * 22 * (1 + tc * 1.6), (H * 0.7 * k) / 6, 0, 0, Math.PI * 2);
                    oc.fill();
                }
            }

            const pull = (u: number, x: number, y: number, edge: number) => {
                if (unfolding) return { a: smooth(0, edge, front - u), x, y };
                const k = smooth(0, edge * 5, u - gather);
                return { a: 1 - k * 0.85, x: x + (orbX - x) * k, y: y + (H / 2 - y) * k };
            };

            for (const gx of gals) {
                const p = pull(gx.u, gx.x, gx.y, 0.04);
                if (p.a <= 0.01) continue;
                gx.rot += gx.spin * dt;
                for (let k = 4; k > 0; k--) {
                    oc.fillStyle = `rgba(${gx.c[0]},${gx.c[1]},${gx.c[2]},${0.035 * k * p.a})`;
                    oc.beginPath();
                    oc.ellipse(p.x, p.y, (gx.rx * k) / 4, (gx.ry * k) / 4, gx.rot, 0, Math.PI * 2);
                    oc.fill();
                }
            }

            for (const s of stars) {
                const p = pull(s.u, s.x, s.y, 0.04);
                if (p.a <= 0.01) continue;
                const twinkle = 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(clock * s.sp + s.ph));
                oc.fillStyle = `rgba(${s.c[0]},${s.c[1]},${s.c[2]},${twinkle * p.a})`;
                oc.beginPath();
                oc.arc(p.x, p.y, s.r, 0, Math.PI * 2);
                oc.fill();
            }

            if (!unfolding) {
                for (let k = 5; k > 0; k--) {
                    oc.fillStyle = `rgba(255,236,200,${0.09 * orbA})`;
                    oc.beginPath();
                    oc.arc(orbX, H / 2, k * 5 * (0.6 + orbA), 0, Math.PI * 2);
                    oc.fill();
                }
                oc.fillStyle = `rgba(255,250,235,${0.6 + 0.4 * orbA})`;
                oc.beginPath();
                oc.arc(orbX, H / 2, 1.5 + 2 * orbA, 0, Math.PI * 2);
                oc.fill();
            }
        };

        const breathe = () => {
            const ph = (clock * Math.PI * 2) / BREATH_S;
            ctx.clearRect(0, 0, W, H);
            const step = 4;
            for (let x = 0; x < W; x += step) {
                const wave = Math.sin(ph - x * 0.012) * 0.6 + Math.sin(ph * 0.5 + x * 0.031) * 0.4;
                const sy = 1.03 + 0.07 * (0.5 + 0.5 * wave);
                const dx = Math.sin(ph + x * 0.008) * 3;
                const hh = H * sy;
                ctx.drawImage(off, x * dpr, 0, step * dpr, H * dpr, x + dx, (H - hh) / 2, step + 1, hh);
            }
        };

        const loop = (now: number) => {
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;
            if (playing && onScreen && !document.hidden) {
                clock += dt;
                if (!hovering && clock >= nextRest) {
                    clock = nextRest;
                    playing = false;
                }
                scene(dt);
                breathe();
            }
            raf = requestAnimationFrame(loop);
        };

        if (reduced) { scene(0); breathe(); }
        else raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            io.disconnect();
            host.removeEventListener("pointerenter", onEnter);
            host.removeEventListener("pointerleave", onLeave);
        };
    }, []);

    return <canvas ref={ref} aria-hidden="true" className="block w-full" style={{ height }} />;
}