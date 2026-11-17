/**
 * Escena 3D del fondo (Three.js puro, sin React).
 *
 * Idea: la cámara viaja hacia el fondo de un "túnel" de datos dorado a medida que se hace scroll.
 *  - Hilos de energía en hélice con pulsos de luz que viajan por ellos.
 *  - Partículas agrupadas sobre esos hilos (y algo de polvo), a distintas profundidades.
 *  - Poliedros holográficos que pasan a los lados y giran con el scroll.
 *  - Un núcleo holográfico (capas geodésicas + anillos orbitales) que acompaña a la cámara,
 *    cambia de lado según la sección y se despliega / recompone.
 *  - Luz ambiental (dos focos difusos) que cambia de posición y tono por sección.
 *
 * Todo se calcula a partir de una sola variable continua: el índice de sección suavizado
 * (0 = Hero … 5 = Contacto). Al subir, la escena recorre el mismo camino a la inversa.
 */
import {
  AdditiveBlending,
  BoxGeometry,
  BufferGeometry,
  Color,
  DodecahedronGeometry,
  EdgesGeometry,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  LineLoop,
  LineSegments,
  Mesh,
  NormalBlending,
  OctahedronGeometry,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  Scene,
  ShaderMaterial,
  TetrahedronGeometry,
  Vector2,
  WebGLRenderer,
  type IUniform,
} from "three";

export type Theme = "dark" | "light";
type Tier = "high" | "medium" | "low";

export type SceneOptions = {
  theme: Theme;
  reducedMotion: boolean;
  /** Se llama tras pintar el primer frame (para hacer el fundido de entrada) */
  onReady: () => void;
  /** El navegador perdió el contexto WebGL: el componente pasa a la alternativa CSS */
  onContextLost: () => void;
};

export type SceneHandle = {
  setTheme: (t: Theme) => void;
  setReducedMotion: (r: boolean) => void;
  dispose: () => void;
};

/* ───────────── Constantes del mundo ───────────── */
const TAU = Math.PI * 2;
const Z_NEAR = 30;
const Z_FAR = -300;
const SPACING = 32; // unidades de profundidad por sección
const STRANDS = 5;

const QUALITY: Record<Tier, { particles: number; landmarks: number; dpr: number; antialias: boolean }> = {
  high: { particles: 9000, landmarks: 30, dpr: 1.75, antialias: true },
  medium: { particles: 5000, landmarks: 22, dpr: 1.35, antialias: false },
  low: { particles: 2600, landmarks: 14, dpr: 1, antialias: false },
};

function detectTier(): Tier {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const cores = nav.hardwareConcurrency || 4;
  const mem = nav.deviceMemory ?? 8;
  if (nav.connection?.saveData || cores <= 2 || mem <= 2) return "low";
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (coarse || window.innerWidth < 768 || cores <= 4 || mem <= 4) return "medium";
  return "high";
}

/* ───────────── Paleta (la misma del portafolio) ───────────── */
type Tone = "gold" | "pale" | "deep" | "bronze";
const PALETTE: Record<Theme, Record<Tone | "hot" | "clear", string>> = {
  // --accent, --grad-from, --grad-to, --gold-3, --logo-hi, --bg
  dark: { gold: "#f5c443", pale: "#fde68a", deep: "#d4a017", bronze: "#b8860b", hot: "#fff4c8", clear: "#09090b" },
  // En claro: dorados de relleno y bronces (el dorado brillante se pierde sobre marfil)
  light: { gold: "#c9971f", pale: "#d9ab33", deep: "#a87a10", bronze: "#7d560c", hot: "#6b4508", clear: "#fcf9f2" },
};

/* ───────────── Fotogramas clave por sección ─────────────
   core: posición del núcleo relativa a la cámara · burst: 0 ensamblado … 1 desplegado
   glowA/glowB: focos de luz ambiental en coordenadas de pantalla (0…1) */
type Key = {
  core: [number, number, number];
  scale: number;
  burst: number;
  tint: Tone;
  tint2: Tone;
  glowA: [number, number];
  glowB: [number, number];
  glow: number;
  energy: number;
  roll: number;
  sway: [number, number];
};
const KEYS: Key[] = [
  // Hero: núcleo a la derecha, detrás de la foto, como un halo
  { core: [9, 0.5, -26], scale: 1, burst: 0, tint: "gold", tint2: "pale", glowA: [0.78, 0.6], glowB: [0.12, 0.85], glow: 1, energy: 1, roll: 0, sway: [0, 0] },
  // Sobre mí
  { core: [-10, 1, -28], scale: 0.9, burst: 0.3, tint: "pale", tint2: "gold", glowA: [0.2, 0.55], glowB: [0.88, 0.2], glow: 0.75, energy: 0.8, roll: 0.05, sway: [1.2, 0.4] },
  // Habilidades
  { core: [10, -1.5, -27], scale: 0.95, burst: 0.55, tint: "deep", tint2: "pale", glowA: [0.82, 0.42], glowB: [0.1, 0.2], glow: 0.8, energy: 1, roll: -0.04, sway: [-1, -0.3] },
  // Proyectos: núcleo centrado, grande y totalmente desplegado
  { core: [0, 0, -40], scale: 1.5, burst: 1, tint: "gold", tint2: "pale", glowA: [0.5, 0.5], glowB: [0.5, 0.06], glow: 0.95, energy: 1.5, roll: 0.03, sway: [0, 0.6] },
  // Trayectoria
  { core: [-9, 0.5, -27], scale: 0.9, burst: 0.45, tint: "bronze", tint2: "gold", glowA: [0.18, 0.5], glowB: [0.9, 0.8], glow: 0.7, energy: 0.9, roll: -0.05, sway: [1, -0.4] },
  // Contacto: el núcleo se recompone al centro
  { core: [0, 0.5, -24], scale: 1.1, burst: 0.05, tint: "pale", tint2: "gold", glowA: [0.5, 0.45], glowB: [0.5, 0.95], glow: 1, energy: 1.1, roll: 0, sway: [0, 0] },
];

/* ───────────── GLSL compartido ───────────── */
const COMMON = /* glsl */ `
  uniform float uTime;
  uniform float uFlow;
  uniform float uScroll;
  uniform float uVel;
  uniform float uLight;
  uniform float uIntro;
  uniform vec2 uSpread;

  // Lleva un punto del "espacio túnel" al mundo: respiración + torsión ligada al scroll + óvalo según pantalla
  vec3 tunnel(vec3 p) {
    float wave = sin(p.z * 0.08 - uTime * 0.5);
    float open = sin(uScroll * 1.2 + p.z * 0.03);
    p.xy *= 1.0 + 0.05 * wave + 0.1 * open;
    float a = uScroll * 0.45 + uTime * 0.012 + p.z * 0.004 * sin(uScroll * 0.8);
    float c = cos(a), s = sin(a);
    p.xy = vec2(c * p.x - s * p.y, s * p.x + c * p.y);
    p.xy *= uSpread;
    return p;
  }

  // Se desvanece muy cerca de la cámara (no tapa el contenido) y a lo lejos (niebla)
  float depthFade(float d) {
    return smoothstep(1.2, 7.0, d) * (1.0 - smoothstep(58.0, 108.0, d));
  }
`;

const SOFT_POINT_FRAG = /* glsl */ `
  uniform vec3 uColHot;
  uniform float uLight;
  uniform float uOpacity;
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.0, d);
    vec3 col = mix(vColor, uColHot, pow(core, 6.0) * 0.6 * (1.0 - uLight));
    gl_FragColor = vec4(col, pow(core, 2.2) * vAlpha * uOpacity);
  }
`;

const HOLO_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uIntro;
  uniform vec3 uColA;
  uniform vec3 uColHot;
  uniform float uHot;
  uniform float uOpacity;
  varying float vFacing;
  varying float vWorldY;
  varying float vFade;
  void main() {
    // Líneas de barrido que suben: el toque "holograma"
    float scan = 0.78 + 0.22 * sin(vWorldY * 5.0 - uTime * 2.4);
    float a = uOpacity * mix(0.22, 1.0, vFacing * vFacing) * scan * vFade * uIntro;
    gl_FragColor = vec4(mix(uColA, uColHot, uHot * vFacing), a);
  }
`;

const HOLO_VERT = /* glsl */ `
  ${COMMON}
  varying float vFacing;
  varying float vWorldY;
  varying float vFade;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vec3 center = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
    vFacing = dot(normalize(wp.xyz - center + vec3(1e-4)), normalize(cameraPosition - center)) * 0.5 + 0.5;
    vWorldY = wp.y;
    vec4 mv = viewMatrix * wp;
    vFade = depthFade(-mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

/* ───────────── Utilidades de geometría ───────────── */
function gauss() {
  // Box–Muller
  return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(TAU * Math.random());
}

/** Punto del hilo `si` a la profundidad z (espacio túnel) */
function strandPoint(z: number, si: number, phase = 0, dr = 0): [number, number] {
  const a = z * 0.045 + (si * TAU) / STRANDS + phase;
  const r = 12 + dr + 2.6 * Math.sin(z * 0.021 + si * 1.7);
  return [Math.cos(a) * r, Math.sin(a) * r];
}

function edgePositions(geo: BufferGeometry): Float32Array {
  const edges = new EdgesGeometry(geo);
  const arr = (edges.getAttribute("position").array as Float32Array).slice();
  edges.dispose();
  geo.dispose();
  return arr;
}

function uniqueVertices(geo: BufferGeometry): number[] {
  const pos = geo.getAttribute("position");
  const seen = new Set<string>();
  const out: number[] = [];
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const k = `${x.toFixed(3)},${y.toFixed(3)},${z.toFixed(3)}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(x, y, z);
  }
  geo.dispose();
  return out;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * t * (t * (t * 6 - 15) + 10); // smootherstep
const damp = (current: number, target: number, k: number, dt: number) => lerp(current, target, 1 - Math.exp(-k * dt));

/* ═════════════════════════ Escena ═════════════════════════ */
export function createScene(canvas: HTMLCanvasElement, opts: SceneOptions): SceneHandle {
  const tier = detectTier();
  const q = QUALITY[tier];

  const renderer = new WebGLRenderer({ canvas, antialias: q.antialias, alpha: false, powerPreference: "high-performance" });
  let pixelRatio = Math.min(window.devicePixelRatio || 1, q.dpr);
  renderer.setPixelRatio(pixelRatio);

  const scene = new Scene();
  const camera = new PerspectiveCamera(55, 1, 0.1, 160);

  // Uniformes compartidos: el mismo objeto en todos los materiales
  const U = {
    uTime: { value: 0 },
    uFlow: { value: 0 },
    uScroll: { value: 0 },
    uVel: { value: 0 },
    uLight: { value: opts.theme === "light" ? 1 : 0 },
    uIntro: { value: opts.reducedMotion ? 1 : 0 },
    uSpread: { value: new Vector2(1, 0.72) },
    uPixelRatio: { value: pixelRatio },
    uEnergy: { value: 1 },
    uColA: { value: new Color() },
    uColB: { value: new Color() },
    uColHot: { value: new Color() },
  } satisfies Record<string, IUniform>;

  const materials: ShaderMaterial[] = [];
  const geometries: BufferGeometry[] = [];
  const mat = (vertexShader: string, fragmentShader: string, own: Record<string, IUniform> = {}) => {
    const m = new ShaderMaterial({
      uniforms: { ...U, ...own },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: AdditiveBlending,
    });
    materials.push(m);
    return m;
  };
  const track = <G extends BufferGeometry>(g: G) => {
    geometries.push(g);
    return g;
  };

  /* ── 1. Luz ambiental: dos focos difusos a pantalla completa ── */
  const glowUniforms = {
    uGlowA: { value: new Vector2(0.78, 0.6) },
    uGlowB: { value: new Vector2(0.12, 0.85) },
    uGlowI: { value: 1 },
    uAspect: { value: 1 },
  };
  const glow = new Mesh(
    track(new PlaneGeometry(2, 2)),
    mat(
      /* glsl */ `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
      `,
      /* glsl */ `
        uniform vec2 uGlowA;
        uniform vec2 uGlowB;
        uniform float uGlowI;
        uniform float uAspect;
        uniform float uLight;
        uniform float uIntro;
        uniform vec3 uColA;
        uniform vec3 uColB;
        varying vec2 vUv;
        void main() {
          vec2 asp = vec2(uAspect, 1.0);
          vec2 da = (vUv - uGlowA) * asp;
          vec2 db = (vUv - uGlowB) * asp;
          float ga = exp(-dot(da, da) * 2.6);
          float gb = exp(-dot(db, db) * 4.0);
          float k = mix(0.16, 0.2, uLight) * uGlowI * mix(0.4, 1.0, uIntro);
          float a = (ga + gb * 0.7) * k;
          vec3 col = mix(uColB, uColA, ga / (ga + gb * 0.7 + 1e-4));
          // Tramado para que el degradado no forme bandas
          float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
          gl_FragColor = vec4(col, a + (n - 0.5) / 255.0);
        }
      `,
      glowUniforms,
    ),
  );
  glow.frustumCulled = false;
  glow.renderOrder = -10;
  scene.add(glow);

  /* ── 2. Hilos de energía (5 hélices, cada una con 2 hebras acompañantes) ── */
  {
    const pos: number[] = [];
    const seed: number[] = [];
    const step = tier === "low" ? 1 : 0.6;
    for (let si = 0; si < STRANDS; si++) {
      const variants: [number, number, number][] = [
        [0, 0, 1],
        [0.07, 1.3, 0.6],
        [-0.05, -1.1, 0.4],
      ];
      for (const [phase, dr, w] of variants) {
        const s = Math.random();
        const packed = Math.round(w * 10) + s; // parte entera = brillo de la hebra, decimal = semilla
        for (let z = Z_NEAR; z > Z_FAR; z -= step) {
          const [x0, y0] = strandPoint(z, si, phase, dr);
          const [x1, y1] = strandPoint(z - step, si, phase, dr);
          pos.push(x0, y0, z, x1, y1, z - step);
          seed.push(packed, packed);
        }
      }
    }
    const g = track(new BufferGeometry());
    g.setAttribute("position", new Float32BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new Float32BufferAttribute(seed, 1));
    const lines = new LineSegments(
      g,
      mat(
        /* glsl */ `
          ${COMMON}
          uniform float uEnergy;
          attribute float aSeed;
          varying float vAlpha;
          varying float vPulse;
          void main() {
            float w = floor(aSeed) / 10.0;
            float s = fract(aSeed);
            vec3 p = tunnel(position);
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            // Pulsos de luz que viajan hacia el fondo (guían el recorrido); corren más rápido al hacer scroll
            float k = position.z * 0.06 + uFlow + s * 40.0;
            vPulse = pow(0.5 + 0.5 * sin(k), 26.0) + 0.6 * pow(0.5 + 0.5 * sin(k * 0.37 + 2.0), 40.0);
            vPulse *= uEnergy;
            vAlpha = depthFade(-mv.z) * w * uIntro;
          }
        `,
        /* glsl */ `
          uniform vec3 uColA;
          uniform vec3 uColHot;
          uniform float uLight;
          varying float vAlpha;
          varying float vPulse;
          void main() {
            float base = mix(0.11, 0.2, uLight);
            float a = vAlpha * (base + vPulse * mix(0.95, 0.55, uLight));
            gl_FragColor = vec4(mix(uColA, uColHot, clamp(vPulse, 0.0, 1.0) * 0.7), a);
          }
        `,
      ),
    );
    lines.frustumCulled = false;
    scene.add(lines);
  }

  /* ── 3. Partículas: concentradas sobre los hilos + polvo en el volumen ── */
  {
    const n = q.particles;
    const pos = new Float32Array(n * 3);
    const seed = new Float32Array(n);
    const size = new Float32Array(n);
    const kind = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const z = lerp(Z_NEAR, Z_FAR, Math.random());
      let x: number, y: number;
      if (Math.random() < 0.74) {
        const [sx, sy] = strandPoint(z, Math.floor(Math.random() * STRANDS));
        const spread = 0.5 + Math.random() * 1.1;
        x = sx + gauss() * spread;
        y = sy + gauss() * spread;
        kind[i] = 0;
        size[i] = Math.random() < 0.035 ? 2.6 + Math.random() * 1.2 : 0.6 + Math.random() * 1.2;
      } else {
        // Polvo: fuera de la franja central para no ensuciar el texto
        do {
          x = (Math.random() - 0.5) * 50;
          y = (Math.random() - 0.5) * 34;
        } while (Math.abs(x) < 4 && Math.abs(y) < 3);
        kind[i] = 1;
        size[i] = 0.35 + Math.random() * 0.7;
      }
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      seed[i] = Math.random();
    }
    const g = track(new BufferGeometry());
    g.setAttribute("position", new Float32BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new Float32BufferAttribute(seed, 1));
    g.setAttribute("aSize", new Float32BufferAttribute(size, 1));
    g.setAttribute("aKind", new Float32BufferAttribute(kind, 1));
    const pts = new Points(
      g,
      mat(
        /* glsl */ `
          ${COMMON}
          uniform float uPixelRatio;
          uniform vec3 uColA;
          uniform vec3 uColB;
          attribute float aSeed;
          attribute float aSize;
          attribute float aKind;
          varying float vAlpha;
          varying vec3 vColor;
          void main() {
            vec3 p = position;
            float t = uTime * 0.25 + aSeed * 40.0;
            p += vec3(sin(t * 0.9), cos(t * 0.7), sin(t * 0.5)) * mix(0.3, 0.6, aKind);
            p = tunnel(p);
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            float depth = max(-mv.z, 0.5);
            gl_Position = projectionMatrix * mv;
            float twinkle = 0.6 + 0.4 * sin(uTime * (1.2 + aSeed * 2.5) + aSeed * 90.0);
            gl_PointSize = min(aSize * uPixelRatio * (62.0 / depth) * (1.0 + uVel * 0.3), 40.0 * uPixelRatio);
            vAlpha = depthFade(depth) * twinkle * mix(1.0, 0.5, aKind) * uIntro * mix(1.0, 0.8, uLight);
            vColor = mix(uColA, uColB, step(0.55, fract(aSeed * 7.31)));
          }
        `,
        SOFT_POINT_FRAG,
        { uOpacity: { value: 0.9 } },
      ),
    );
    pts.frustumCulled = false;
    scene.add(pts);
  }

  /* ── 4. Poliedros holográficos a los lados del recorrido ── */
  {
    const shapes = [
      edgePositions(new TetrahedronGeometry(1)),
      edgePositions(new OctahedronGeometry(1)),
      edgePositions(new IcosahedronGeometry(1, 0)),
      edgePositions(new BoxGeometry(1.3, 1.3, 1.3)),
      edgePositions(new OctahedronGeometry(1, 1)),
    ];
    const pos: number[] = [];
    const center: number[] = [];
    const seed: number[] = [];
    const scale: number[] = [];
    const count = q.landmarks;
    for (let i = 0; i < count; i++) {
      const shape = shapes[i % shapes.length];
      const z = lerp(Z_NEAR - 10, Z_FAR + 20, (i + Math.random() * 0.7) / count);
      const a = Math.random() * TAU;
      const r = 8.5 + Math.random() * 4.5;
      const c = [Math.cos(a) * r, Math.sin(a) * r, z];
      const s = Math.random();
      const sc = 0.6 + Math.random() * 1.7;
      for (let v = 0; v < shape.length; v += 3) {
        pos.push(shape[v], shape[v + 1], shape[v + 2]);
        center.push(c[0], c[1], c[2]);
        seed.push(s);
        scale.push(sc);
      }
    }
    const g = track(new BufferGeometry());
    g.setAttribute("position", new Float32BufferAttribute(pos, 3));
    g.setAttribute("aCenter", new Float32BufferAttribute(center, 3));
    g.setAttribute("aSeed", new Float32BufferAttribute(seed, 1));
    g.setAttribute("aScale", new Float32BufferAttribute(scale, 1));
    const lm = new LineSegments(
      g,
      mat(
        /* glsl */ `
          ${COMMON}
          attribute vec3 aCenter;
          attribute float aSeed;
          attribute float aScale;
          varying float vFacing;
          varying float vWorldY;
          varying float vFade;
          void main() {
            // Giran con el tiempo y, sobre todo, con el scroll (al subir giran al revés)
            float a = uTime * (0.08 + aSeed * 0.2) + uScroll * (0.6 + aSeed * 0.9);
            float b = a * 0.7 + aSeed * 6.2831;
            vec3 p = position * aScale;
            p = vec3(cos(a) * p.x + sin(a) * p.z, p.y, -sin(a) * p.x + cos(a) * p.z);
            p = vec3(p.x, cos(b) * p.y - sin(b) * p.z, sin(b) * p.y + cos(b) * p.z);
            vec3 c = tunnel(aCenter);
            vec3 wp = c + p;
            vec4 mv = modelViewMatrix * vec4(wp, 1.0);
            gl_Position = projectionMatrix * mv;
            vFacing = dot(normalize(p + vec3(1e-4)), normalize(cameraPosition - c)) * 0.5 + 0.5;
            vWorldY = wp.y;
            vFade = depthFade(-mv.z);
          }
        `,
        HOLO_FRAG,
        { uOpacity: { value: 0.42 }, uHot: { value: 0.35 } },
      ),
    );
    lm.frustumCulled = false;
    scene.add(lm);
  }

  /* ── 5. Núcleo holográfico ── */
  const core = new Group();
  scene.add(core);
  // Materiales del núcleo con su opacidad base: en pantallas verticales se atenúan
  // porque el núcleo queda detrás del texto
  const coreMats: { m: ShaderMaterial; base: number }[] = [];
  const coreMat = (m: ShaderMaterial) => {
    coreMats.push({ m, base: m.uniforms.uOpacity.value as number });
    return m;
  };
  const holo = (geo: BufferGeometry, opacity: number, hot: number) => {
    const g = track(new BufferGeometry());
    g.setAttribute("position", new Float32BufferAttribute(edgePositions(geo), 3));
    const m = coreMat(mat(HOLO_VERT, HOLO_FRAG, { uOpacity: { value: opacity }, uHot: { value: hot } }));
    return new LineSegments(g, m);
  };
  const inner = holo(new OctahedronGeometry(1.6, 0), 0.9, 0.8);
  const shellA = holo(new IcosahedronGeometry(3.6, 1), 0.55, 0.45);
  const shellB = holo(new DodecahedronGeometry(5.4, 0), 0.42, 0.3);
  const shellC = new Group();
  shellC.add(holo(new IcosahedronGeometry(7.2, 1), 0.16, 0.1));
  {
    const verts = uniqueVertices(new IcosahedronGeometry(7.2, 1));
    const g = track(new BufferGeometry());
    g.setAttribute("position", new Float32BufferAttribute(verts, 3));
    g.setAttribute("aSeed", new Float32BufferAttribute(verts.filter((_, i) => i % 3 === 0).map(() => Math.random()), 1));
    shellC.add(
      new Points(
        g,
        coreMat(mat(
          /* glsl */ `
            ${COMMON}
            uniform float uPixelRatio;
            uniform vec3 uColA;
            attribute float aSeed;
            varying float vAlpha;
            varying vec3 vColor;
            void main() {
              vec4 wp = modelMatrix * vec4(position, 1.0);
              vec3 center = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
              float facing = dot(normalize(wp.xyz - center), normalize(cameraPosition - center)) * 0.5 + 0.5;
              vec4 mv = viewMatrix * wp;
              float pulse = 0.55 + 0.45 * sin(uTime * 1.7 + aSeed * 30.0);
              gl_PointSize = clamp(uPixelRatio * 95.0 / max(-mv.z, 0.5) * (0.7 + 0.6 * pulse), 1.0, 26.0 * uPixelRatio);
              vAlpha = mix(0.15, 1.0, facing) * pulse * depthFade(-mv.z) * uIntro;
              vColor = uColA;
              gl_Position = projectionMatrix * mv;
            }
          `,
          SOFT_POINT_FRAG,
          { uOpacity: { value: 0.85 } },
        )),
      ),
    );
  }
  const rings: LineLoop[] = [];
  {
    const radii = [9.5, 11.2, 13];
    radii.forEach((r, i) => {
      const segs = 220;
      const pos: number[] = [];
      const t: number[] = [];
      for (let k = 0; k < segs; k++) {
        const a = (k / segs) * TAU;
        pos.push(Math.cos(a) * r, Math.sin(a) * r, 0);
        t.push(k / segs);
      }
      const g = track(new BufferGeometry());
      g.setAttribute("position", new Float32BufferAttribute(pos, 3));
      g.setAttribute("aT", new Float32BufferAttribute(t, 1));
      const ring = new LineLoop(
        g,
        coreMat(mat(
          /* glsl */ `
            ${COMMON}
            attribute float aT;
            varying float vT;
            varying float vFacing;
            varying float vFade;
            void main() {
              vT = aT;
              vec4 wp = modelMatrix * vec4(position, 1.0);
              vec3 center = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
              vFacing = dot(normalize(wp.xyz - center), normalize(cameraPosition - center)) * 0.5 + 0.5;
              vec4 mv = viewMatrix * wp;
              vFade = depthFade(-mv.z);
              gl_Position = projectionMatrix * mv;
            }
          `,
          /* glsl */ `
            uniform float uFlow;
            uniform float uIntro;
            uniform vec3 uColA;
            uniform vec3 uColHot;
            uniform float uOpacity;
            uniform float uDashes;
            uniform float uDir;
            varying float vT;
            varying float vFacing;
            varying float vFade;
            void main() {
              float dash = step(0.5, fract(vT * uDashes));
              float run = pow(0.5 + 0.5 * sin(vT * 6.2831 * 2.0 - uFlow * 1.4 * uDir), 12.0);
              float a = uOpacity * vFade * uIntro * mix(0.3, 1.0, vFacing) * (0.22 + 0.45 * dash + 1.3 * run);
              gl_FragColor = vec4(mix(uColA, uColHot, run * 0.8), a);
            }
          `,
          { uOpacity: { value: 0.5 - i * 0.08 }, uDashes: { value: [90, 140, 60][i] }, uDir: { value: i % 2 ? -1 : 1 } },
        )),
      );
      rings.push(ring);
      core.add(ring);
    });
  }
  core.add(inner, shellA, shellB, shellC);

  /* ───────────── Medición de secciones ───────────── */
  // Para cada sección: el scrollY en que su centro coincide con el centro de la pantalla
  let stops: number[] = [0];
  const measure = () => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const vh = window.innerHeight;
    const list = sections.map((el) => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      return Math.min(maxScroll, Math.max(0, top + el.offsetHeight / 2 - vh / 2));
    });
    if (list.length) list[0] = 0;
    for (let i = 1; i < list.length; i++) list[i] = Math.max(list[i], list[i - 1] + 1);
    stops = list.length ? list.slice(0, KEYS.length) : [0];
  };
  const sectionAt = (y: number) => {
    if (stops.length < 2 || y <= stops[0]) return 0;
    for (let i = 0; i < stops.length - 1; i++) {
      if (y < stops[i + 1]) return i + (y - stops[i]) / (stops[i + 1] - stops[i]);
    }
    // Más allá de Contacto (pie de página): la cámara sigue avanzando un poco
    const last = stops.length - 1;
    return last + Math.min(0.5, (y - stops[last]) / window.innerHeight) * 0.6;
  };

  /* ───────────── Tamaño ───────────── */
  let aspect = 1;
  let lastW = 0;
  let lastH = 0;
  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    // En móvil la barra de direcciones cambia la altura al hacer scroll: se ignoran saltos pequeños
    if (w === lastW && Math.abs(h - lastH) < 120 && lastH !== 0) return;
    lastW = w;
    lastH = h;
    aspect = w / h;
    renderer.setSize(w, h, false);
    camera.aspect = aspect;
    camera.fov = aspect < 1 ? 64 : 55;
    camera.updateProjectionMatrix();
    U.uSpread.value.set(aspect >= 1 ? 1 + 0.25 * Math.min(aspect - 1, 1) : 0.35 + 0.4 * aspect, aspect >= 1 ? 0.72 : 0.95);
    glowUniforms.uAspect.value = aspect;
    const dim = aspect < 1 ? 0.5 : 1;
    for (const { m, base } of coreMats) m.uniforms.uOpacity.value = base * dim;
    measure();
  };

  /* ───────────── Estado animado ───────────── */
  let theme: Theme = opts.theme;
  let themeMix = theme === "light" ? 1 : 0;
  let reduced = opts.reducedMotion;
  let s = sectionAt(window.scrollY);
  let sPrev = s;
  let vel = 0;
  let intro = reduced ? 1 : 0;
  let time = 0;
  let flow = 0;
  let idle = 0;
  let frameNo = 0;
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  const perf = { sum: 0, n: 0, cooldown: 0 };

  const tmpA = new Color();
  const tmpB = new Color();
  const clear = new Color();
  const tone = (out: Color, name: Tone | "hot" | "clear") =>
    out.set(PALETTE.dark[name]).lerp(tmpB.set(PALETTE.light[name]), themeMix);
  const keyColor = (out: Color, a: Tone, b: Tone, f: number) => {
    tone(out, a);
    tone(tmpA, b);
    return out.lerp(tmpA, f);
  };

  const applyBlending = () => {
    const blending = theme === "light" ? NormalBlending : AdditiveBlending;
    for (const m of materials) m.blending = blending;
  };
  applyBlending();

  const update = (dt: number) => {
    time += dt;
    const target = sectionAt(window.scrollY);
    s = reduced ? target : damp(s, target, 3.2, dt);
    const v = dt > 0 ? Math.abs(s - sPrev) / dt : 0;
    sPrev = s;
    vel = damp(vel, Math.min(v * 0.9, 1.6), 4, dt);
    idle = v < 0.002 && Math.abs(mouse.tx - mouse.x) < 0.002 ? idle + dt : 0;
    flow += dt * (0.9 + vel * 2.6);
    intro = reduced ? 1 : Math.min(1, intro + dt / 2.4);
    themeMix = damp(themeMix, theme === "light" ? 1 : 0, 7, dt);
    mouse.x = damp(mouse.x, mouse.tx, 2.5, dt);
    mouse.y = damp(mouse.y, mouse.ty, 2.5, dt);

    // Interpolación entre las dos secciones vecinas
    const i0 = Math.min(KEYS.length - 1, Math.floor(s));
    const i1 = Math.min(KEYS.length - 1, i0 + 1);
    const f = smooth(Math.min(1, s - i0));
    const A = KEYS[i0];
    const B = KEYS[i1];
    const k = (sel: (key: Key) => number) => lerp(sel(A), sel(B), f);

    const introE = smooth(intro);
    const burst = Math.min(1, k((x) => x.burst) + (1 - introE) * 0.9);

    // Cámara: avanza en profundidad, se balancea y sigue un poco al mouse
    const camZ = -s * SPACING;
    const camX = k((x) => x.sway[0]) + mouse.x * 1.4 + Math.sin(time * 0.11) * 0.4;
    const camY = k((x) => x.sway[1]) - mouse.y * 0.9 + Math.cos(time * 0.13) * 0.3;
    camera.position.set(camX, camY, camZ);
    camera.lookAt(camX * 0.4, camY * 0.4, camZ - 30);
    camera.rotateZ(k((x) => x.roll) + mouse.x * 0.015);

    // Núcleo
    const hf = Math.min(1, Math.max(0.4, aspect / 1.6));
    core.position.set(k((x) => x.core[0]) * hf, k((x) => x.core[1]), camZ + k((x) => x.core[2]));
    core.scale.setScalar(k((x) => x.scale) * (aspect < 1 ? 0.6 : 1) * lerp(0.6, 1, introE));
    const t = time;
    inner.rotation.set(t * 0.4 + s * 1.1, t * 0.3 + s * 0.8, 0);
    shellA.rotation.set(t * 0.11 + s * 0.5, t * 0.07 + s * 0.9, 0);
    shellA.scale.setScalar(1 + burst * 0.35);
    shellB.rotation.set(-t * 0.05 - s * 0.4, t * 0.09 + s * 0.6, s * 0.2);
    shellB.scale.setScalar(1 + burst * 0.75);
    shellC.rotation.set(t * 0.03, -t * 0.04 - s * 0.35, 0);
    shellC.scale.setScalar(1 + burst * 1.15);
    const tilts = [0.35, -0.55, 0.18];
    rings.forEach((ring, i) => {
      ring.rotation.set(Math.PI / 2 + tilts[i] * (1 + burst * 1.6) + s * 0.12 * (i + 1), t * 0.05 * (i + 1) + s * 0.3, s * 0.08 * (i - 1));
      ring.scale.setScalar(1 + burst * 0.28 * (i + 1));
    });

    // Colores e iluminación por sección
    keyColor(U.uColA.value, A.tint, B.tint, f);
    keyColor(U.uColB.value, A.tint2, B.tint2, f);
    tone(U.uColHot.value, "hot");
    tone(clear, "clear");
    renderer.setClearColor(clear, 1);
    glowUniforms.uGlowA.value.set(lerp(A.glowA[0], B.glowA[0], f) + mouse.x * 0.02, 1 - lerp(A.glowA[1], B.glowA[1], f) - mouse.y * 0.02);
    glowUniforms.uGlowB.value.set(lerp(A.glowB[0], B.glowB[0], f), 1 - lerp(A.glowB[1], B.glowB[1], f));
    glowUniforms.uGlowI.value = k((x) => x.glow) * (1 + vel * 0.15);

    U.uTime.value = reduced ? 0 : time;
    U.uFlow.value = reduced ? 0 : flow;
    U.uScroll.value = s;
    U.uVel.value = vel;
    U.uLight.value = themeMix;
    U.uIntro.value = Math.min(1, intro * 1.6);
    U.uEnergy.value = k((x) => x.energy) * (1 + vel * 0.5);
  };

  const render = () => renderer.render(scene, camera);

  /* ───────────── Bucle ───────────── */
  let raf = 0;
  let last = 0;
  let readyFired = false;
  const fireReady = () => {
    if (!readyFired) {
      readyFired = true;
      opts.onReady();
    }
  };

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = last ? Math.min(0.1, (now - last) / 1000) : 1 / 60;
    last = now;
    frameNo++;
    // En reposo (sin scroll ni mouse) se pinta a ~30 fps para ahorrar batería
    if (idle > 2 && frameNo % 2) {
      return;
    }
    update(idle > 2 ? dt * 2 : dt);
    render();
    fireReady();

    // Calidad adaptativa: si los frames tardan demasiado, baja la resolución
    perf.sum += dt;
    perf.n++;
    if (perf.n >= 90) {
      const avg = perf.sum / perf.n;
      perf.sum = 0;
      perf.n = 0;
      if (perf.cooldown > 0) perf.cooldown--;
      else if (avg > 1 / 40 && idle <= 2 && pixelRatio > 0.75) {
        pixelRatio = Math.max(0.75, pixelRatio - 0.25);
        renderer.setPixelRatio(pixelRatio);
        renderer.setSize(lastW, lastH, false);
        U.uPixelRatio.value = pixelRatio;
        perf.cooldown = 2;
      }
    }
  };

  const start = () => {
    if (raf || reduced || document.hidden) return;
    last = 0;
    raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };
  /** Con "reducir movimiento" no hay bucle: un único frame estático (se repinta al cambiar tamaño o tema) */
  const renderStatic = () => {
    s = sectionAt(window.scrollY);
    themeMix = theme === "light" ? 1 : 0;
    update(0);
    render();
    fireReady();
  };

  /* ───────────── Eventos ───────────── */
  const onResize = () => {
    resize();
    if (reduced) renderStatic();
  };
  const onPointer = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
    idle = 0;
  };
  const onVisibility = () => (document.hidden ? stop() : start());
  const onLost = (e: Event) => {
    e.preventDefault();
    stop();
    opts.onContextLost();
  };
  let measureRaf = 0;
  const ro = new ResizeObserver(() => {
    cancelAnimationFrame(measureRaf);
    measureRaf = requestAnimationFrame(measure);
  });

  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("pointermove", onPointer, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  canvas.addEventListener("webglcontextlost", onLost);
  ro.observe(document.body);

  resize();
  if (reduced) renderStatic();
  else start();

  return {
    setTheme(next) {
      theme = next;
      applyBlending();
      if (reduced) renderStatic();
    },
    setReducedMotion(next) {
      reduced = next;
      if (reduced) {
        stop();
        intro = 1;
        renderStatic();
      } else start();
    },
    dispose() {
      stop();
      cancelAnimationFrame(measureRaf);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      for (const g of geometries) g.dispose();
      for (const m of materials) m.dispose();
      renderer.dispose();
    },
  };
}
