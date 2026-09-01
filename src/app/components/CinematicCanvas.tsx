'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const FRAME_COUNT = 9;

// All 9 frame paths — verified against public/frames/
const FRAME_SRCS: string[] = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/frames/frame-${String(i + 1).padStart(2, '0')}.png`
);

// Minimum alpha to start painting frameB in a cross-fade.
// Eliminates floating-point near-zero draws (e.g. frac = 1e-15 at boundaries).
const FADE_THRESHOLD = 0.004;

// ── Public handle ─────────────────────────────────────────────────
export interface CinematicCanvasHandle {
  /** Set cinematic progress [0, 1] and repaint immediately. */
  setProgress: (progress: number) => void;
}

// ── object-fit: cover math ────────────────────────────────────────
// Returns the source rect [sx, sy, sw, sh] that fills cw×ch exactly,
// centred, without stretching the image.
function coverRect(
  iw: number, ih: number,
  cw: number, ch: number,
): [number, number, number, number] {
  const imgAR    = iw / ih;
  const canvasAR = cw / ch;
  let sx = 0, sy = 0, sw = iw, sh = ih;
  if (imgAR > canvasAR) {
    // Image wider than canvas — clip sides
    sw = ih * canvasAR;
    sx = (iw - sw) / 2;
  } else {
    // Image taller than canvas — clip top/bottom
    sh = iw / canvasAR;
    sy = (ih - sh) / 2;
  }
  return [sx, sy, sw, sh];
}

// ── Component ─────────────────────────────────────────────────────
const CinematicCanvas = forwardRef<CinematicCanvasHandle>(
  function CinematicCanvas(_, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Cached 2d context — retrieved once on mount.
    const ctxRef    = useRef<CanvasRenderingContext2D | null>(null);

    // Image store — indices match frame indices (0 = frame-01, etc.)
    const images    = useRef<HTMLImageElement[]>([]);
    const loaded    = useRef<boolean[]>(new Array(FRAME_COUNT).fill(false));

    // Current cinematic progress [0, 1]
    const progress  = useRef(0);

    // Physical canvas pixel dimensions (CSS size × DPR)
    const physW     = useRef(0);
    const physH     = useRef(0);

    // ── Core draw — called every time progress changes or canvas resizes ──
    function render() {
      const ctx = ctxRef.current;
      const cw  = physW.current;
      const ch  = physH.current;
      if (!ctx || !cw || !ch) return;

      // Map [0,1] progress to fractional frame index [0, FRAME_COUNT-1]
      const p      = progress.current;
      const frameF = p * (FRAME_COUNT - 1);
      const frameA = Math.floor(frameF);                        // current frame index
      const frameB = Math.min(frameA + 1, FRAME_COUNT - 1);    // next frame index
      const frac   = frameF - frameA;                           // blend weight for B

      // Always clear to black first (shows through if a frame isn't loaded yet)
      ctx.clearRect(0, 0, cw, ch);

      // ── Draw frame A at full opacity ────────────────────────────
      const imgA = images.current[frameA];
      if (imgA && loaded.current[frameA]) {
        const [sx, sy, sw, sh] = coverRect(imgA.naturalWidth, imgA.naturalHeight, cw, ch);
        ctx.drawImage(imgA, sx, sy, sw, sh, 0, 0, cw, ch);
      }

      // ── Cross-fade frame B over frame A ────────────────────────
      // Only when there is meaningful alpha AND the two frames differ.
      if (frac > FADE_THRESHOLD && frameB !== frameA) {
        const imgB = images.current[frameB];
        if (imgB && loaded.current[frameB]) {
          const [sx, sy, sw, sh] = coverRect(imgB.naturalWidth, imgB.naturalHeight, cw, ch);
          ctx.save();
          ctx.globalAlpha = frac;
          ctx.drawImage(imgB, sx, sy, sw, sh, 0, 0, cw, ch);
          ctx.restore();
        }
      }
    }

    // ── Imperative handle exposed to CinematicScroll ──────────────
    useImperativeHandle(ref, () => ({
      setProgress(p: number) {
        progress.current = Math.max(0, Math.min(1, p));
        render();
      },
    }));

    // ── Mount ─────────────────────────────────────────────────────
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Cache the 2d context so we never pay getContext() on every tick.
      ctxRef.current = canvas.getContext('2d', { alpha: false });

      // ── Sizing ─────────────────────────────────────────────────
      // We size the canvas bitmap to the stage's physical pixel dimensions.
      // Using alpha:false lets the browser skip blending the canvas with
      // the page background — a small but real compositing optimisation.
      function resize() {
        if (!canvas) return; // TypeScript narrowing inside nested function
        const dpr    = window.devicePixelRatio || 1;
        // Measure the parent (.cinematic-sequence) which fills .stage exactly.
        const parent = canvas.parentElement;
        const cssW   = parent ? parent.clientWidth  : window.innerWidth;
        const cssH   = parent ? parent.clientHeight : window.innerHeight;
        const pw     = Math.round(cssW * dpr);
        const ph     = Math.round(cssH * dpr);

        if (pw === physW.current && ph === physH.current) return; // no change

        // Set the backing store dimensions
        canvas.width  = pw;
        canvas.height = ph;

        // Mirror CSS size explicitly (overrides inset:0 stretching)
        canvas.style.width  = `${cssW}px`;
        canvas.style.height = `${cssH}px`;

        physW.current = pw;
        physH.current = ph;

        render(); // Redraw at new resolution
      }

      // Initial size
      resize();

      // Re-size when the stage element changes dimensions
      // (viewport resize, orientation change, mobile toolbar appear/disappear)
      const ro = new ResizeObserver(resize);
      if (canvas.parentElement) ro.observe(canvas.parentElement);
      // Belt-and-suspenders: also listen to the window resize event
      window.addEventListener('resize', resize, { passive: true });

      // ── Frame loading ──────────────────────────────────────────
      // Load frames in index order — frame-01 first for fastest first-paint.
      // Each frame's onload only redraws if that frame is currently visible.
      FRAME_SRCS.forEach((src, i) => {
        const img  = new window.Image();
        images.current[i] = img;

        img.onload = () => {
          loaded.current[i] = true;

          // Which frames does the current progress need?
          const cur    = progress.current * (FRAME_COUNT - 1);
          const needA  = Math.floor(cur);
          const needB  = Math.min(needA + 1, FRAME_COUNT - 1);

          // Only repaint when a frame the current view actually needs arrives
          if (i === needA || i === needB) render();
        };

        img.onerror = () => {
          console.error(`[CinematicCanvas] Failed to load: ${src}`);
        };

        // Start loading immediately; browser will parallelise
        img.src = src;
      });

      return () => {
        ro.disconnect();
        window.removeEventListener('resize', resize);
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Mount only — all state in refs

    return (
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'block',
          // width/height are set by JS resize() above
        }}
        aria-hidden="true"
      />
    );
  }
);

export default CinematicCanvas;
