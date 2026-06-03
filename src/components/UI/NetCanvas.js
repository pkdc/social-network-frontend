import { useEffect, useRef } from "react";
import styles from "./NetCanvas.module.css";

// Lightweight animated constellation "net", ported from the design bundle's
// net-bg.js. Draws a transparent network so it can sit over a gradient (unlike
// Vanta.NET, which paints a solid background). Used on the auth brand panel.
const NetCanvas = ({ color = "#52489c", density = 58, className = "" }) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext && canvas.getContext("2d");
		if (!ctx) return; // no 2d canvas (e.g. jsdom in tests) — skip animation
		const DPR = Math.min(window.devicePixelRatio || 1, 2);

		// parse color → rgb
		let r = 82, g = 72, b = 156;
		const hex = color.replace("#", "");
		if (hex.length === 6) {
			r = parseInt(hex.slice(0, 2), 16);
			g = parseInt(hex.slice(2, 4), 16);
			b = parseInt(hex.slice(4, 6), 16);
		}

		let W = 0, H = 0, pts = [], maxDist = 0, raf = 0;
		const pointer = { x: -9999, y: -9999 };
		const onPointerMove = (e) => {
			pointer.x = e.clientX;
			pointer.y = e.clientY;
		};
		window.addEventListener("pointermove", onPointerMove);

		const reduceMotion =
			typeof window.matchMedia === "function" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		function build() {
			pts = [];
			const cols = Math.max(2, Math.round(W / density));
			const rows = Math.max(2, Math.round(H / density));
			const gx = W / cols, gy = H / rows;
			for (let i = 0; i <= cols; i++) {
				for (let j = 0; j <= rows; j++) {
					const hx = i * gx, hy = j * gy;
					pts.push({
						hx, hy, x: hx, y: hy,
						a: Math.random() * Math.PI * 2,
						sp: 0.0004 + Math.random() * 0.0009,
						rad: Math.min(gx, gy) * (0.28 + Math.random() * 0.4),
					});
				}
			}
			maxDist = Math.max(gx, gy) * 1.55;
		}

		function resize() {
			W = canvas.clientWidth;
			H = canvas.clientHeight;
			if (!W || !H) return;
			canvas.width = W * DPR;
			canvas.height = H * DPR;
			ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
			build();
		}

		function frame() {
			if (!W || !H) {
				resize();
				raf = requestAnimationFrame(frame);
				return;
			}
			ctx.clearRect(0, 0, W, H);

			const rect = canvas.getBoundingClientRect();
			const scaleX = rect.width / W || 1, scaleY = rect.height / H || 1;
			const pcx = (pointer.x - rect.left) / scaleX;
			const pcy = (pointer.y - rect.top) / scaleY;
			const hasPtr =
				!reduceMotion &&
				pcx > -200 && pcx < W + 200 && pcy > -200 && pcy < H + 200;

			for (const p of pts) {
				if (!reduceMotion) {
					p.a += p.sp * 16;
					p.x = p.hx + Math.cos(p.a) * p.rad;
					p.y = p.hy + Math.sin(p.a * 0.9) * p.rad;
				}
				if (hasPtr) {
					const dx = p.x - pcx, dy = p.y - pcy;
					const d2 = dx * dx + dy * dy;
					if (d2 < 18000) {
						const f = ((18000 - d2) / 18000) * 18;
						const d = Math.sqrt(d2) || 1;
						p.x += (dx / d) * f;
						p.y += (dy / d) * f;
					}
				}
			}

			for (let i = 0; i < pts.length; i++) {
				for (let k = i + 1; k < pts.length; k++) {
					const dx = pts[i].x - pts[k].x, dy = pts[i].y - pts[k].y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < maxDist) {
						const o = (1 - dist / maxDist) * 0.5;
						ctx.strokeStyle = `rgba(${r},${g},${b},${o})`;
						ctx.lineWidth = 1;
						ctx.beginPath();
						ctx.moveTo(pts[i].x, pts[i].y);
						ctx.lineTo(pts[k].x, pts[k].y);
						ctx.stroke();
					}
				}
			}
			for (const p of pts) {
				ctx.fillStyle = `rgba(${r},${g},${b},0.85)`;
				ctx.beginPath();
				ctx.arc(p.x, p.y, 1.7, 0, Math.PI * 2);
				ctx.fill();
			}
			raf = requestAnimationFrame(frame);
		}

		let ro;
		if ("ResizeObserver" in window) {
			ro = new ResizeObserver(() => resize());
			ro.observe(canvas);
		} else {
			window.addEventListener("resize", resize);
		}
		resize();
		raf = requestAnimationFrame(frame);

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("pointermove", onPointerMove);
			if (ro) ro.disconnect();
			else window.removeEventListener("resize", resize);
		};
	}, [color, density]);

	return <canvas ref={canvasRef} className={`${styles.canvas} ${className}`} />;
};

export default NetCanvas;
