// Interactive hologram of the 1992 Ford F150 plus the build log.
// Part data lives in parts.js; this file only draws it.

const { systems: SYSTEMS, parts: PARTS } = window.F150_BUILD;
const partById = new Map(PARTS.map(p => [p.id, p]));
const systemById = new Map(SYSTEMS.map(s => [s.id, s]));

const STATUS = {
    'original':    { label: 'Original',    color: 0x2f7bff },
    'replaced':    { label: 'Replaced',    color: 0x38e1ff },
    'in-progress': { label: 'In Progress', color: 0xffb13d },
    'planned':     { label: 'Planned',     color: 0x9aa4bd }
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// Accept "in progress", "In-Progress", etc.
const statusKey = p => {
    const k = String(p.status ?? '').trim().toLowerCase().replace(/\s+/g, '-');
    return STATUS[k] ? k : 'original';
};
const badge = p => `<small class="status-badge status-${statusKey(p)}">${STATUS[statusKey(p)].label}</small>`;

let viewer = null;
let selectedId = null;
let filter = 'all';

// ---------- Progress summary ----------

function renderSummary() {
    const count = k => PARTS.filter(p => statusKey(p) === k).length;
    const total = PARTS.length;
    const replaced = count('replaced');
    const inProgress = count('in-progress');
    const planned = count('planned');
    $('progress-summary').innerHTML = `
        <p><strong>${replaced}</strong> of ${total} parts replaced
        &middot; ${inProgress} in progress &middot; ${planned} planned</p>
        <div class="progress-bar" role="img" aria-label="${replaced} of ${total} parts replaced">
            <i class="seg-replaced" style="width:${(replaced / total) * 100}%"></i>
            <i class="seg-in-progress" style="width:${(inProgress / total) * 100}%"></i>
        </div>`;
}

// ---------- Build log ----------

function renderLog() {
    $('log-legend').innerHTML = Object.keys(STATUS)
        .map(k => `<small class="status-badge status-${k}">${STATUS[k].label}</small>`)
        .join('');

    $('log-groups').innerHTML = SYSTEMS.map(sys => {
        const rows = PARTS.filter(p => p.system === sys.id).map(p => {
            const detail = statusKey(p) === 'replaced' && p.replacedWith
                ? `<small class="replaced">${esc(p.replacedWith)}</small>`
                : `<small>${esc(p.original)}</small>`;
            return `<button class="log-row" data-part="${esc(p.id)}"><div><b>${esc(p.name)}</b>${detail}</div>${badge(p)}</button>`;
        }).join('');
        if (!rows) return '';
        return `<div class="log-group"><h3><i class="${esc(sys.icon)}"></i>${esc(sys.name)}</h3>${rows}</div>`;
    }).join('');

    $('log-groups').addEventListener('click', e => {
        const row = e.target.closest('.log-row');
        if (!row) return;
        select(row.dataset.part);
        $('viewer').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    });
}

function markLog(id) {
    document.querySelectorAll('.log-row').forEach(r => r.classList.toggle('active', r.dataset.part === id));
}

// ---------- Part panel ----------

function showPanel(p) {
    const sys = systemById.get(p.system);
    const k = statusKey(p);
    $('panel-system').textContent = sys ? sys.name : '';
    $('panel-name').textContent = p.name;
    $('panel-status').innerHTML = badge(p);

    let replaced;
    if (p.replacedWith) replaced = `<dd class="replaced">${esc(p.replacedWith)}</dd>`;
    else if (k === 'planned') replaced = '<dd>Planned, part not chosen yet</dd>';
    else if (k === 'in-progress') replaced = '<dd>Work in progress</dd>';
    else replaced = '<dd>Not replaced yet</dd>';

    $('panel-specs').innerHTML = `
        <dt>Factory original</dt><dd>${esc(p.original) || '&mdash;'}</dd>
        <dt>Replaced with</dt>${replaced}
        ${p.date ? `<dt>Date</dt><dd>${esc(p.date)}</dd>` : ''}
        ${p.notes ? `<dt>Notes</dt><dd>${esc(p.notes)}</dd>` : ''}`;

    $('panel-photos').innerHTML = (p.photos || []).map(ph => {
        const src = typeof ph === 'string' ? ph : ph.src;
        const caption = typeof ph === 'string' ? '' : ph.caption;
        return `<figure><a href="${esc(src)}" target="_blank" rel="noopener"><img src="${esc(src)}" alt="${esc(caption || p.name)}" loading="lazy"></a>${caption ? `<figcaption>${esc(caption)}</figcaption>` : ''}</figure>`;
    }).join('');

    $('panel-note').textContent = viewer && !viewer.has(p.id) ? 'This part isn\'t drawn on the 3D model.' : '';
    $('part-panel').classList.add('open');
}

function hidePanel() {
    $('part-panel').classList.remove('open');
}

// ---------- Selection & filters ----------

function select(id) {
    const p = partById.get(id);
    if (!p) return;
    if (filter !== 'all' && filter !== p.system) setFilter('all');
    selectedId = id;
    showPanel(p);
    markLog(id);
    viewer?.select(id);
    history.replaceState(null, '', `#part=${encodeURIComponent(id)}`);
}

function clearSelection() {
    selectedId = null;
    hidePanel();
    markLog(null);
    viewer?.select(null);
    history.replaceState(null, '', location.pathname + location.search);
}

function renderFilters() {
    const chips = [{ id: 'all', name: 'All systems' }, ...SYSTEMS]
        .filter(s => s.id === 'all' || PARTS.some(p => p.system === s.id))
        .map(s => `<button class="chip${s.id === filter ? ' active' : ''}" data-system="${esc(s.id)}">${esc(s.name)}</button>`)
        .join('');
    $('system-filter').innerHTML = chips;
}

function setFilter(id) {
    filter = id;
    document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.system === id));
    if (selectedId && id !== 'all' && partById.get(selectedId).system !== id) clearSelection();
    viewer?.setFilter(id);
}

$('system-filter').addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (chip) setFilter(chip.dataset.system);
});

$('panel-close').addEventListener('click', clearSelection);

$('reset-view').addEventListener('click', () => {
    clearSelection();
    setFilter('all');
    viewer?.reset();
});

$('status-toggle').addEventListener('click', e => {
    const btn = e.currentTarget;
    const on = btn.getAttribute('aria-pressed') !== 'true';
    btn.setAttribute('aria-pressed', String(on));
    viewer?.setStatusColors(on);
});

renderSummary();
renderLog();
renderFilters();

// ---------- 3D hologram ----------

try {
    viewer = await initViewer();
    $('viewer-message').classList.add('hidden');
} catch (err) {
    console.error(err);
    $('viewer-message').textContent = 'The 3D hologram couldn\'t load in this browser. The full build log is below.';
}

// Links like f150.html#part=engine-block open straight to that part.
const linked = decodeURIComponent(location.hash.match(/^#part=(.+)$/)?.[1] ?? '');
if (partById.has(linked)) select(linked);

async function initViewer() {
    const THREE = await import('three');
    const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
    const { EffectComposer } = await import('three/addons/postprocessing/EffectComposer.js');
    const { RenderPass } = await import('three/addons/postprocessing/RenderPass.js');
    const { UnrealBloomPass } = await import('three/addons/postprocessing/UnrealBloomPass.js');
    const { OutputPass } = await import('three/addons/postprocessing/OutputPass.js');

    const PI = Math.PI;
    const canvas = $('truck-canvas');
    const wrap = $('viewer-wrap');
    const label = $('hover-label');

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x03060c, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200);
    const HOME_POS = new THREE.Vector3(17, 8.5, 17);
    const HOME_TARGET = new THREE.Vector3(0, 2.6, 0);
    camera.position.copy(HOME_POS);

    const controls = new OrbitControls(camera, canvas);
    controls.target.copy(HOME_TARGET);
    controls.enableDamping = true;
    controls.minDistance = 2.5;
    controls.maxDistance = 45;
    controls.maxPolarAngle = PI * 0.62;
    controls.autoRotate = !reduceMotion;
    controls.autoRotateSpeed = 0.6;

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.45, 0.4, 0.15));
    composer.addPass(new OutputPass());

    // ---- Hologram material: fresnel rim glow with moving scanlines

    const time = { value: 0 };
    const HOLO = new THREE.Color(0x3d8bff);
    const HIGHLIGHT = new THREE.Color(0xc6ecff);

    const VERT = `
        varying vec3 vNormal;
        varying vec3 vView;
        varying float vY;
        void main() {
            vec4 world = modelMatrix * vec4(position, 1.0);
            vec4 mv = viewMatrix * world;
            vY = world.y;
            vNormal = normalize(normalMatrix * normal);
            vView = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
        }`;

    const FRAG = `
        uniform vec3 uColor;
        uniform float uOpacity;
        uniform float uGlow;
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vView;
        varying float vY;
        void main() {
            float rim = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.0);
            float scan = 0.82 + 0.18 * sin(vY * 30.0 - uTime * 3.0);
            float a = (0.025 + rim * 0.45) * uOpacity * scan;
            gl_FragColor = vec4(uColor * (0.55 + rim * uGlow), a);
        }`;

    // ---- Part registry

    const visuals = new Map();
    let pickables = [];
    const truck = new THREE.Group();
    truck.position.x = 0.9; // center the truck on the projector
    scene.add(truck);

    function vis(id) {
        let v = visuals.get(id);
        if (v) return v;
        const data = partById.get(id);
        if (!data) throw new Error(`No entry for "${id}" in parts.js`);
        const mat = new THREE.ShaderMaterial({
            uniforms: { uColor: { value: HOLO.clone() }, uOpacity: { value: 1 }, uGlow: { value: 1.2 }, uTime: time },
            vertexShader: VERT,
            fragmentShader: FRAG,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide
        });
        const lineMat = new THREE.LineBasicMaterial({
            color: HOLO.clone(), transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending
        });
        const group = new THREE.Group();
        truck.add(group);
        v = { data, group, meshes: [], mat, lineMat };
        visuals.set(id, v);
        return v;
    }

    function add(id, geo, pos, rot, edges = true) {
        const v = vis(id);
        const mesh = new THREE.Mesh(geo, v.mat);
        if (pos) mesh.position.set(...pos);
        if (rot) mesh.rotation.set(...rot);
        mesh.userData.id = id;
        if (edges) mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 28), v.lineMat));
        v.group.add(mesh);
        v.meshes.push(mesh);
        return mesh;
    }

    const box = (id, x1, x2, y1, y2, z1, z2, rot) =>
        add(id, new THREE.BoxGeometry(x2 - x1, y2 - y1, z2 - z1), [(x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2], rot);

    const UP = new THREE.Vector3(0, 1, 0);
    function rod(id, a, b, rA, rB = rA, seg = 16) {
        const va = new THREE.Vector3(...a);
        const vb = new THREE.Vector3(...b);
        const dir = vb.clone().sub(va);
        const mesh = add(id, new THREE.CylinderGeometry(rB, rA, dir.length(), seg), va.clone().add(vb).multiplyScalar(0.5).toArray());
        mesh.quaternion.setFromUnitVectors(UP, dir.normalize());
        return mesh;
    }

    const shape = pts => new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2(x, y)));

    // Side-profile shapes are drawn in x/y and extruded across the truck's width (z).
    function extrude(id, s, z1, z2) {
        const geo = new THREE.ExtrudeGeometry(s instanceof THREE.Shape ? s : shape(s), { depth: z2 - z1, bevelEnabled: false, curveSegments: 16 });
        return add(id, geo, [0, 0, z1]);
    }

    function bothSides(id, s, inner, outer) {
        extrude(id, s, inner, outer);
        extrude(id, s, -outer, -inner);
    }

    // A thin panel between two side-profile points, e.g. the sloped windshield.
    function slab(id, a, b, halfWidth, thickness) {
        const dx = b[0] - a[0];
        const dy = b[1] - a[1];
        return add(id, new THREE.BoxGeometry(Math.hypot(dx, dy), thickness, halfWidth * 2),
            [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 0], [0, 0, Math.atan2(dy, dx)]);
    }

    function tube(id, pts, r) {
        const curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)));
        return add(id, new THREE.TubeGeometry(curve, 48, r, 8, false), null, null, false);
    }

    function coil(id, x, z, y1, y2, radius, wire, turns) {
        const pts = [];
        const n = turns * 24;
        for (let i = 0; i <= n; i++) {
            const t = i / n;
            const a = t * turns * PI * 2;
            pts.push([x + radius * Math.cos(a), y1 + (y2 - y1) * t, z + radius * Math.sin(a)]);
        }
        const curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)));
        return add(id, new THREE.TubeGeometry(curve, n, wire, 6, false), null, null, false);
    }

    // ---- The truck. Units are feet: +x is forward, +y is up, -z is the driver side.
    // Front axle at x=6.0, rear axle at x=-6.9 (155" SuperCab long-bed wheelbase).

    const FRONT_X = 6.0;
    const REAR_X = -6.9;
    const WHEEL_Y = 1.2;
    const TRACK_Z = 2.65;

    // Frame
    box('frame', -10.3, 8.5, 1.5, 2.05, 1.3, 1.5);
    box('frame', -10.3, 8.5, 1.5, 2.05, -1.5, -1.3);
    [8.3, 4.2, 1.5, -2.0, -5.6, -10.1].forEach(x => box('frame', x - 0.15, x + 0.15, 1.6, 1.95, -1.3, 1.3));

    // Wheels, tires, brakes
    for (const x of [FRONT_X, REAR_X]) {
        for (const s of [1, -1]) {
            const z = s * TRACK_Z;
            add('tires', new THREE.TorusGeometry(0.84, 0.37, 18, 48), [x, WHEEL_Y, z]);
            add('wheels', new THREE.CylinderGeometry(0.6, 0.6, 0.5, 24), [x, WHEEL_Y, z], [PI / 2, 0, 0]);
            add(x === FRONT_X ? 'locking-hubs' : 'wheels', new THREE.CylinderGeometry(0.2, 0.24, 0.3, 12), [x, WHEEL_Y, z + s * 0.3], [PI / 2, 0, 0]);
            if (x === FRONT_X) {
                add('front-brakes', new THREE.CylinderGeometry(0.52, 0.52, 0.1, 24), [x, WHEEL_Y, s * 2.2], [PI / 2, 0, 0]);
                box('front-brakes', 5.42, 5.7, 1.0, 1.6, s * 2.2 - 0.18, s * 2.2 + 0.18);
            } else {
                add('rear-brakes', new THREE.CylinderGeometry(0.55, 0.55, 0.32, 24), [x, WHEEL_Y, s * 2.22], [PI / 2, 0, 0]);
            }
        }
    }

    // Front suspension & steering
    for (const s of [1, -1]) {
        rod('front-axle', [FRONT_X, 1.05, s * 2.15], [s > 0 ? 6.4 : 5.75, 1.45, -s * 0.95], 0.11, 0.11, 6);
        rod('front-axle', [FRONT_X, 0.85, s * 2.15], [FRONT_X, 1.55, s * 2.15], 0.1);
        rod('radius-arms', [FRONT_X, 1.05, s * 2.0], [3.0, 1.6, s * 1.4], 0.07);
        coil('front-springs', FRONT_X, s * 1.75, 1.3, 2.1, 0.2, 0.04, 5);
        rod('front-shocks', [6.35, 1.15, s * 2.0], [6.6, 2.35, s * 1.65], 0.09);
        rod('front-shocks', [6.6, 2.35, s * 1.65], [6.7, 2.85, s * 1.6], 0.04);
    }
    box('steering-gearbox', 7.35, 7.85, 1.75, 2.2, -1.85, -1.4);
    rod('steering-linkage', [6.55, 1.15, -2.15], [6.55, 1.15, 2.15], 0.045);
    rod('steering-stabilizer', [6.75, 1.3, -1.6], [6.75, 1.3, -0.2], 0.07);
    rod('steering-stabilizer', [6.75, 1.3, -0.2], [6.75, 1.3, 0.6], 0.03);
    rod('steering-stabilizer', [6.75, 1.3, 0.6], [6.55, 1.17, 0.6], 0.03);
    rod('pitman-arm', [7.6, 1.75, -1.62], [7.6, 1.45, -1.7], 0.06);
    rod('steering-linkage', [7.6, 1.45, -1.7], [6.6, 1.18, 1.3], 0.05);
    rod('steering-linkage', [7.55, 2.2, -1.6], [4.85, 3.55, -1.4], 0.05);
    rod('power-steering-pump', [7.0, 3.1, -1.0], [7.35, 3.1, -1.0], 0.22);
    rod('power-steering-pump', [7.17, 3.3, -1.0], [7.17, 3.55, -1.0], 0.12);

    // Rear axle & suspension
    rod('rear-axle', [REAR_X, WHEEL_Y, -2.25], [REAR_X, WHEEL_Y, 2.25], 0.13);
    add('rear-axle', new THREE.SphereGeometry(0.45, 20, 14), [REAR_X, WHEEL_Y, 0.15]);
    rod('rear-axle', [REAR_X, 1.25, 0.15], [-6.25, 1.3, 0.15], 0.16, 0.12);
    for (const s of [1, -1]) {
        [0, 1, 2].forEach(i => tube('rear-leaf-springs', [
            [-4.4 - i * 0.45, 1.62 - i * 0.07, s * 1.4],
            [REAR_X, 1.36 - i * 0.07, s * 1.4],
            [-9.4 + i * 0.45, 1.62 - i * 0.07, s * 1.4]
        ], 0.045));
        rod('rear-shocks', [s > 0 ? -7.35 : -6.45, 1.05, s * 1.7], [s > 0 ? -6.6 : -7.2, 2.05, s * 1.2], 0.07);
    }

    // Drivetrain
    rod('transmission', [4.85, 2.4, 0], [4.1, 2.28, 0], 0.78, 0.55);
    rod('transmission', [4.1, 2.28, 0], [1.95, 2.0, 0], 0.48, 0.33);
    box('trans-pan', 2.4, 3.9, 1.65, 1.9, -0.4, 0.4);
    box('trans-pan-gasket', 2.34, 3.96, 1.88, 1.93, -0.46, 0.46);
    box('trans-filter', 2.6, 3.7, 1.7, 1.82, -0.3, 0.3);
    for (const x of [2.5, 2.95, 3.4, 3.85]) {
        for (const s of [1, -1]) rod('trans-pan-bolts', [x, 1.95, s * 0.43], [x, 1.82, s * 0.43], 0.035, 0.035, 6);
    }

    // 4x4: transfer case behind the transmission drives the rear axle and,
    // through a driver-side front driveshaft, the Dana 44 front differential.
    box('transfer-case', 0.8, 1.95, 1.5, 2.25, -0.6, 0.35);
    rod('transfer-case', [0.8, 1.9, 0], [0.6, 1.9, 0], 0.13);
    rod('front-driveshaft', [1.95, 1.65, -0.5], [5.55, 1.25, -0.5], 0.08);
    add('front-axle', new THREE.SphereGeometry(0.4, 20, 14), [FRONT_X, WHEEL_Y, -0.5]);
    rod('front-axle', [FRONT_X, 1.22, -0.5], [5.55, 1.25, -0.5], 0.14, 0.11);
    rod('driveshaft', [0.6, 1.9, 0], [-2.4, 1.62, 0.08], 0.1);
    rod('driveshaft', [-2.4, 1.62, 0.08], [-6.25, 1.3, 0.15], 0.1);
    add('carrier-bearing', new THREE.SphereGeometry(0.17, 12, 8), [-2.4, 1.62, 0.08]);
    box('carrier-bearing', -2.5, -2.3, 1.7, 1.95, -0.2, 0.35);
    rod('driveshaft-yoke', [0.62, 1.9, 0], [0.3, 1.87, 0], 0.12);
    rod('driveshaft-yoke', [1.95, 1.65, -0.5], [2.3, 1.61, -0.5], 0.11);

    // U-joints are drawn as small crosses around the shaft they sit on.
    function ujoint(id, pos, alongZ) {
        box(id, pos[0] - 0.03, pos[0] + 0.03, pos[1] - 0.15, pos[1] + 0.15, pos[2] - 0.03, pos[2] + 0.03);
        if (alongZ) box(id, pos[0] - 0.15, pos[0] + 0.15, pos[1] - 0.03, pos[1] + 0.03, pos[2] - 0.03, pos[2] + 0.03);
        else box(id, pos[0] - 0.03, pos[0] + 0.03, pos[1] - 0.03, pos[1] + 0.03, pos[2] - 0.15, pos[2] + 0.15);
    }
    [[0.2, 1.86, 0.01], [-2.15, 1.64, 0.07], [-2.65, 1.6, 0.09], [-6.1, 1.31, 0.15], [2.45, 1.59, -0.5], [5.45, 1.26, -0.5]]
        .forEach(p => ujoint('driveshaft-ujoints', p, false));
    for (const s of [1, -1]) ujoint('axle-ujoints', [FRONT_X, WHEEL_Y, s * 1.95], true);

    // Engine: 302 V8. The block is a V-shaped front profile extruded front to back.
    add('engine-block', new THREE.ExtrudeGeometry(shape([
        [-0.8, 1.98], [0.8, 1.98], [0.85, 2.55], [1.25, 3.05], [0.88, 3.38], [0.35, 2.9],
        [-0.35, 2.9], [-0.88, 3.38], [-1.25, 3.05], [-0.85, 2.55]
    ]), { depth: 2.05, bevelEnabled: false }), [4.95, 0, 0], [0, PI / 2, 0]);
    for (const s of [1, -1]) {
        add('cylinder-heads', new THREE.BoxGeometry(1.95, 0.28, 0.5), [5.97, 3.32, s * 1.158], [s * 0.729, 0, 0]);
        rod('exhaust-manifolds', [5.05, 2.7, s * 1.3], [6.85, 2.7, s * 1.3], 0.1);
        [5.3, 5.75, 6.2, 6.65].forEach(x => rod('exhaust-manifolds', [x, 2.95, s * 1.15], [x, 2.75, s * 1.3], 0.06, 0.06, 8));
    }
    add('intake-manifold', new THREE.BoxGeometry(1.8, 0.45, 0.75), [5.95, 3.2, 0]);
    add('intake-manifold', new THREE.BoxGeometry(2.0, 0.32, 0.6), [5.95, 3.62, 0]);
    rod('intake-manifold', [6.95, 3.62, 0], [7.25, 3.6, 0], 0.17);
    box('oil-pan', 5.0, 6.95, 1.62, 1.98, -0.65, 0.65);
    box('oil-pan-gasket', 4.95, 7.0, 1.96, 2.01, -0.72, 0.72);
    box('oil-pump', 6.3, 6.7, 1.8, 1.97, -0.35, -0.05);
    tube('oil-pickup-tube', [[6.4, 1.82, -0.2], [6.15, 1.72, -0.1], [5.8, 1.69, 0.1]], 0.04);
    add('oil-pickup-tube', new THREE.CylinderGeometry(0.18, 0.18, 0.04, 16), [5.7, 1.68, 0.15]);
    for (const s of [1, -1]) box('motor-mounts', 5.5, 5.9, 2.0, 2.3, s > 0 ? 1.05 : -1.35, s > 0 ? 1.35 : -1.05);
    box('water-pump', 7.0, 7.22, 2.15, 3.15, -0.62, 0.62);
    rod('water-pump', [7.22, 2.85, 0], [7.42, 2.85, 0], 0.26);
    rod('water-pump', [7.22, 2.3, 0], [7.34, 2.3, 0], 0.3);
    rod('cooling-fan', [7.42, 2.85, 0], [7.6, 2.85, 0], 0.12);
    for (let i = 0; i < 5; i++) {
        const a = (i / 5) * PI * 2;
        add('cooling-fan', new THREE.BoxGeometry(0.04, 0.7, 0.22), [7.55, 2.85 + 0.42 * Math.cos(a), 0.42 * Math.sin(a)], [a, 0.3, 0]);
    }
    box('radiator', 7.95, 8.15, 2.2, 4.0, -1.45, 1.45);
    rod('radiator-cap', [8.05, 4.0, 0.9], [8.05, 4.16, 0.9], 0.12);
    tube('radiator-hoses', [[7.95, 3.7, 0.9], [7.6, 3.5, 0.6], [7.2, 3.2, 0.3]], 0.07);
    tube('radiator-hoses', [[7.95, 2.4, -0.9], [7.6, 2.35, -0.6], [7.3, 2.3, -0.2]], 0.07);
    rod('thermostat', [6.98, 3.2, 0.3], [7.2, 3.2, 0.3], 0.1);
    tube('water-pump-hoses', [[7.1, 2.6, 0.5], [6.8, 3.0, 1.0], [5.5, 3.5, 1.6], [4.9, 3.6, 1.7]], 0.05);
    tube('water-pump-hoses', [[7.0, 2.9, 0.35], [6.6, 3.3, 0.9], [5.5, 3.65, 1.85], [4.9, 3.75, 1.9]], 0.05);
    box('coolant', 6.5, 7.0, 3.2, 3.75, -2.6, -2.1); // overflow reservoir
    box('air-intake', 7.0, 7.85, 3.3, 3.85, 1.8, 2.7);
    tube('air-intake', [[7.1, 3.6, 1.8], [7.15, 3.7, 0.9], [7.25, 3.62, 0.2]], 0.14);
    tube('vacuum-lines', [[5.3, 3.78, -0.2], [5.1, 3.9, -0.8], [4.95, 3.6, -1.45]], 0.03);
    tube('vacuum-lines', [[6.3, 3.78, 0.25], [6.5, 3.9, 0.8], [6.6, 3.8, 1.3]], 0.03);
    tube('vacuum-lines', [[6.8, 3.78, -0.2], [6.95, 3.85, -0.3], [7.05, 3.7, -0.35]], 0.03);
    box('egr-solenoid', 6.5, 6.75, 3.65, 3.85, 1.3, 1.55);

    // Brake booster and master cylinder on the driver-side firewall
    rod('brake-booster', [4.85, 3.4, -1.95], [5.45, 3.4, -1.95], 0.4);
    box('master-cylinder', 5.45, 6.1, 3.25, 3.55, -2.1, -1.8);
    box('master-cylinder', 5.6, 6.0, 3.55, 3.75, -2.08, -1.82);
    for (const s of [1, -1]) {
        rod('bleeder-screws', [5.56, 1.6, s * 2.2], [5.56, 1.74, s * 2.2], 0.04, 0.04, 6);
        rod('bleeder-screws', [REAR_X, 1.75, s * 2.0], [REAR_X + 0.05, 1.89, s * 2.0], 0.04, 0.04, 6);
    }

    // Sway bars
    tube('front-sway-bar', [[6.3, 1.3, -1.75], [7.0, 1.72, -1.65], [7.15, 1.78, 0], [7.0, 1.72, 1.65], [6.3, 1.3, 1.75]], 0.055);
    tube('rear-sway-bar', [[-6.6, 1.15, -1.4], [-7.5, 1.05, -1.2], [-7.6, 1.05, 0], [-7.5, 1.05, 1.2], [-6.6, 1.15, 1.4]], 0.05);
    for (const s of [1, -1]) rod('rear-sway-bar-links', [-7.5, 1.05, s * 1.2], [-7.5, 1.55, s * 1.4], 0.035);

    // Electrical
    box('battery', 7.25, 7.95, 3.0, 3.6, -2.7, -2.05);
    rod('alternator', [7.0, 3.05, 1.0], [7.4, 3.05, 1.0], 0.28);
    rod('starter', [4.8, 2.1, 1.0], [5.45, 2.1, 1.0], 0.17);
    rod('distributor', [7.08, 3.15, -0.35], [7.08, 3.55, -0.35], 0.12);
    rod('distributor', [7.08, 3.55, -0.35], [7.08, 3.75, -0.35], 0.24, 0.2);
    for (const s of [1, -1]) {
        [5.5, 5.95, 6.4, 6.85].forEach(x => rod('spark-plugs', [x, 3.05, s * 1.2], [x, 3.15, s * 1.5], 0.04, 0.04, 8));
    }

    // Fuel & exhaust
    box('fuel-tanks', -4.6, -2.1, 1.5, 2.2, -2.85, -1.6);
    box('fuel-tanks', -9.85, -7.95, 1.45, 2.15, -1.25, 1.25);
    for (const x of [-4.0, -2.7]) {
        box('fuel-tank-straps', x - 0.06, x + 0.06, 1.44, 1.5, -2.91, -1.55);
        box('fuel-tank-straps', x - 0.06, x + 0.06, 1.44, 2.2, -2.91, -2.85);
    }
    for (const x of [-9.4, -8.4]) box('fuel-tank-straps', x - 0.06, x + 0.06, 1.39, 1.45, -1.3, 1.3);
    rod('fuel-pumps', [-3.3, 2.0, -2.2], [-3.3, 2.32, -2.2], 0.15);
    rod('fuel-pumps', [-8.9, 1.95, 0.5], [-8.9, 2.27, 0.5], 0.15);
    rod('fuel-filter', [-0.8, 1.75, -1.6], [-0.2, 1.75, -1.6], 0.1);
    tube('fuel-filler-necks', [[-2.8, 2.15, -2.6], [-2.7, 2.9, -2.85], [-2.6, 3.5, -3.05]], 0.1);
    tube('fuel-filler-necks', [[-8.7, 2.1, -1.1], [-8.7, 2.9, -2.3], [-8.7, 3.5, -3.05]], 0.1);
    for (const x of [-2.6, -8.7]) add('gas-caps', new THREE.CylinderGeometry(0.17, 0.17, 0.06, 20), [x, 3.5, -3.12], [PI / 2, 0, 0]);
    for (const s of [1, -1]) rod('o2-sensors', [4.6, 2.15, s * 1.32], [4.6, 2.3, s * 1.55], 0.05);
    for (const s of [1, -1]) {
        tube('exhaust-pipes', [[5.0, 2.7, s * 1.3], [4.6, 2.1, s * 1.25], [4.2, 1.6, s * 0.9], [3.4, 1.5, 0.25]], 0.085);
    }
    box('catalytic-converter', 1.9, 3.3, 1.32, 1.68, 0.0, 0.55);
    tube('exhaust-pipes', [[1.9, 1.5, 0.28], [0.8, 1.5, 0.6], [-0.8, 1.55, 0.9]], 0.085);
    box('muffler', -3.4, -0.8, 1.28, 1.8, 0.55, 1.2);
    tube('exhaust-pipes', [[-3.4, 1.55, 0.95], [-5.2, 1.5, 1.0], [-6.9, 1.6, 1.0], [-8.0, 1.35, 1.9], [-8.4, 1.35, 2.75]], 0.08);

    // Body
    extrude('hood', [[4.72, 4.22], [8.55, 4.02], [8.62, 3.9], [4.72, 4.08]], -2.95, 2.95);

    const fender = new THREE.Shape();
    fender.moveTo(4.85, 4.12);
    fender.lineTo(8.55, 4.0);
    fender.lineTo(8.62, 2.0);
    fender.lineTo(7.15, 2.0);
    fender.absarc(FRONT_X, WHEEL_Y, 1.4, 0.608, PI - 0.608, false);
    fender.lineTo(4.85, 2.0);
    bothSides('front-fenders', fender, 2.95, 3.25);

    box('grille', 8.55, 8.68, 2.65, 3.85, -1.85, 1.85);
    [3.05, 3.45].forEach(y => box('grille', 8.6, 8.7, y - 0.04, y + 0.04, -1.8, 1.8));
    for (const s of [1, -1]) {
        box('headlights', 8.5, 8.66, 3.2, 3.88, s > 0 ? 1.9 : -2.95, s > 0 ? 2.95 : -1.9);
        box('headlights', 8.2, 8.62, 3.2, 3.85, s > 0 ? 2.95 : -3.22, s > 0 ? 3.22 : -2.95);
    }
    box('front-bumper', 8.65, 9.05, 1.75, 2.45, -3.2, 3.2);

    extrude('cab', [[4.85, 2.0], [4.85, 4.12], [4.65, 4.25], [3.2, 6.02], [-1.7, 6.05], [-1.95, 5.8], [-1.95, 2.0]], -3.05, 3.05);
    slab('windshield', [4.64, 4.3], [3.27, 6.0], 2.8, 0.04);
    box('rear-window', -2.0, -1.96, 4.35, 5.6, -2.1, 2.1);

    const door = shape([[4.78, 2.05], [4.78, 4.2], [3.3, 5.95], [0.95, 5.95], [0.85, 2.05]]);
    door.holes.push(new THREE.Path([[4.4, 4.35], [3.32, 5.72], [1.1, 5.72], [1.1, 4.35]].map(([x, y]) => new THREE.Vector2(x, y))));
    bothSides('doors', door, 3.05, 3.13);

    for (const s of [1, -1]) {
        box('mirrors', 4.25, 4.45, 4.55, 5.0, s > 0 ? 3.3 : -3.6, s > 0 ? 3.6 : -3.3);
        rod('mirrors', [4.4, 4.6, s * 3.1], [4.35, 4.7, s * 3.35], 0.04);
    }

    const bedSide = new THREE.Shape();
    bedSide.moveTo(-2.1, 2.0);
    bedSide.lineTo(-2.1, 4.3);
    bedSide.lineTo(-10.4, 4.3);
    bedSide.lineTo(-10.4, 2.0);
    bedSide.lineTo(-8.05, 2.0);
    bedSide.absarc(REAR_X, WHEEL_Y, 1.4, PI - 0.608, 0.608, true);
    bedSide.lineTo(-2.1, 2.0);
    bothSides('bed', bedSide, 2.92, 3.12);
    box('bed', -10.35, -2.2, 2.22, 2.36, -2.92, 2.92);
    box('bed', -2.2, -2.08, 2.22, 4.3, -2.92, 2.92);
    box('tailgate', -10.52, -10.4, 2.25, 4.25, -2.9, 2.9);
    for (const s of [1, -1]) {
        box('taillights', -10.47, -10.37, 3.0, 4.15, s > 0 ? 2.93 : -3.12, s > 0 ? 3.12 : -2.93);
    }
    box('rear-bumper', -10.9, -10.55, 1.75, 2.3, -3.15, 3.15);

    // Interior
    box('dashboard', 3.75, 4.62, 3.6, 4.25, -2.9, 2.9);
    box('dashboard', 3.62, 3.78, 3.95, 4.35, -1.9, -0.9);
    const column = rod('steering-wheel', [4.55, 3.85, -1.4], [3.55, 4.42, -1.4], 0.06);
    const wheelDir = new THREE.Vector3(0, 1, 0).applyQuaternion(column.quaternion);
    const wheel = add('steering-wheel', new THREE.TorusGeometry(0.55, 0.045, 10, 40), [3.5, 4.45, -1.4]);
    wheel.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), wheelDir);
    add('steering-wheel', new THREE.SphereGeometry(0.12, 12, 8), [3.5, 4.45, -1.4]);
    box('front-seat', 1.45, 2.95, 2.6, 3.05, -2.65, 2.65);
    add('front-seat', new THREE.BoxGeometry(0.32, 1.75, 5.3), [1.29, 3.88, 0], [0, 0, 0.18]);
    box('rear-seats', -1.85, -0.95, 2.6, 3.0, 0.35, 2.7);
    box('rear-seats', -1.85, -0.95, 2.6, 3.0, -2.7, -0.35);
    box('rear-seats', -1.92, -1.75, 3.0, 4.6, -2.7, 2.7);

    // ---- Projector base and drifting particles

    const glow = opacity => new THREE.MeshBasicMaterial({
        color: 0x2f7bff, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide
    });
    const floor = new THREE.Group();
    floor.rotation.x = -PI / 2;
    floor.add(new THREE.Mesh(new THREE.RingGeometry(11.3, 11.42, 128), glow(0.5)));
    floor.add(new THREE.Mesh(new THREE.RingGeometry(11.9, 11.95, 128), glow(0.25)));
    floor.add(new THREE.Mesh(new THREE.CircleGeometry(11.3, 96), glow(0.015)));
    scene.add(floor);
    const polar = new THREE.PolarGridHelper(11.3, 16, 8, 96, 0x1d4f9e, 0x123a75);
    polar.material.transparent = true;
    polar.material.opacity = 0.3;
    polar.material.blending = THREE.AdditiveBlending;
    polar.material.depthWrite = false;
    scene.add(polar);

    const PARTICLES = 350;
    const particlePos = new Float32Array(PARTICLES * 3);
    for (let i = 0; i < PARTICLES; i++) {
        const r = Math.sqrt(Math.random()) * 11;
        const a = Math.random() * PI * 2;
        particlePos.set([r * Math.cos(a), Math.random() * 9, r * Math.sin(a)], i * 3);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({
        color: 0x5ea8ff, size: 0.05, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false
    }));
    scene.add(particles);

    // ---- Highlight state

    let hovered = null;
    let selected = null;
    let systemFilter = 'all';
    let statusColors = false;

    function refresh() {
        for (const v of visuals.values()) {
            const sys = v.data.system;
            const ghost = systemFilter !== 'all' && sys !== systemFilter;
            const shell = systemFilter === 'all' && sys === 'body';
            let color = statusColors ? new THREE.Color(STATUS[statusKey(v.data)].color) : HOLO;
            let opacity = shell ? 0.5 : 1;
            let line = shell ? 0.35 : 0.5;
            let glowAmt = 1.2;
            if (ghost) {
                opacity = 0.08;
                line = 0.035;
            } else if (selected && v !== selected) {
                opacity *= 0.3;
                line *= 0.3;
            }
            if (v === hovered || v === selected) {
                color = HIGHLIGHT;
                opacity = 1.4;
                line = 1;
                glowAmt = 1.6;
            }
            v.mat.uniforms.uColor.value.copy(color);
            v.mat.uniforms.uOpacity.value = opacity;
            v.mat.uniforms.uGlow.value = glowAmt;
            v.lineMat.color.copy(color);
            v.lineMat.opacity = line;
        }
        pickables = [...visuals.values()]
            .filter(v => systemFilter === 'all' || v.data.system === systemFilter)
            .flatMap(v => v.meshes);
    }

    // ---- Camera moves

    let tween = null;
    function flyTo(target, position) {
        if (reduceMotion) {
            controls.target.copy(target);
            camera.position.copy(position);
            return;
        }
        tween = { start: performance.now(), fromT: controls.target.clone(), toT: target, fromP: camera.position.clone(), toP: position };
    }
    controls.addEventListener('start', () => {
        controls.autoRotate = false;
        tween = null;
    });

    function focus(v) {
        const bounds = new THREE.Box3().setFromObject(v.group);
        const center = bounds.getCenter(new THREE.Vector3());
        const radius = Math.max(bounds.getSize(new THREE.Vector3()).length() / 2, 0.6);
        const vFov = THREE.MathUtils.degToRad(camera.fov);
        const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
        const dist = THREE.MathUtils.clamp((radius / Math.sin(Math.min(vFov, hFov) / 2)) * 1.15, 4.5, 40);
        const dir = camera.position.clone().sub(controls.target).normalize();
        const pos = center.clone().addScaledVector(dir, dist);
        pos.y = Math.max(pos.y, 0.5);
        flyTo(center, pos);
    }

    // ---- Pointer interaction

    // Parts hidden inside another part, mapped to the part they sit in.
    const INSIDE = { 'oil-pump': 'oil-pan', 'oil-pickup-tube': 'oil-pan', 'trans-filter': 'trans-pan' };

    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    function pick(e) {
        const r = canvas.getBoundingClientRect();
        ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        raycaster.setFromCamera(ndc, camera);
        const hits = raycaster.intersectObjects(pickables, false);
        if (!hits.length) return null;
        // When the pointer is on a part that has another part inside it, pick the inner one.
        const first = hits[0].object.userData.id;
        const inner = hits.find(h => INSIDE[h.object.userData.id] === first);
        return visuals.get((inner ?? hits[0]).object.userData.id);
    }

    function setHover(v, e) {
        if (v !== hovered) {
            hovered = v;
            refresh();
        }
        canvas.classList.toggle('is-hovering', !!v);
        label.classList.toggle('show', !!v);
        if (v && e) {
            const r = wrap.getBoundingClientRect();
            label.textContent = v.data.name;
            label.style.transform = `translate(${e.clientX - r.left + 16}px, ${e.clientY - r.top + 16}px)`;
        }
    }

    canvas.addEventListener('pointermove', e => {
        if (e.pointerType === 'touch' || e.buttons) return;
        setHover(pick(e), e);
    });
    canvas.addEventListener('pointerleave', () => setHover(null));

    let down = null;
    canvas.addEventListener('pointerdown', e => {
        down = { x: e.clientX, y: e.clientY };
    });
    canvas.addEventListener('pointerup', e => {
        if (!down) return;
        const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
        down = null;
        if (moved > 6) return;
        const v = pick(e);
        if (v) select(v.data.id);
        else if (selected) clearSelection();
    });

    // ---- Render loop

    function resize() {
        const w = wrap.clientWidth;
        const h = wrap.clientHeight;
        renderer.setSize(w, h, false);
        composer.setSize(w, h);
        camera.aspect = w / h;
        // Keep the selected part centered in the space the info panel leaves free
        // (beside it on wide screens, above it on phones).
        const panel = $('part-panel');
        const wide = w > 700;
        const shiftX = selected && wide ? (panel.offsetWidth + 20) / 2 : 0;
        const shiftY = selected && !wide ? (panel.offsetHeight + 12) / 2 : 0;
        if (shiftX || shiftY) camera.setViewOffset(w, h, shiftX, shiftY, w, h);
        else camera.clearViewOffset();
        camera.updateProjectionMatrix();
    }
    new ResizeObserver(resize).observe(wrap);
    resize();

    let onScreen = true;
    new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; }).observe(wrap);

    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
        const dt = Math.min(clock.getDelta(), 0.1);
        if (!onScreen) return;
        if (!reduceMotion) {
            time.value += dt;
            const p = particleGeo.attributes.position;
            for (let i = 0; i < PARTICLES; i++) {
                const y = p.getY(i) + dt * 0.35;
                p.setY(i, y > 9 ? 0 : y);
            }
            p.needsUpdate = true;
        }
        if (tween) {
            const k = Math.min((performance.now() - tween.start) / 900, 1);
            const ease = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
            controls.target.lerpVectors(tween.fromT, tween.toT, ease);
            camera.position.lerpVectors(tween.fromP, tween.toP, ease);
            if (k === 1) tween = null;
        }
        controls.update();
        composer.render();
    });

    refresh();

    return {
        has: id => visuals.has(id),
        select(id) {
            selected = id ? visuals.get(id) || null : null;
            refresh();
            resize();
            if (selected) {
                controls.autoRotate = false;
                focus(selected);
            }
        },
        setFilter(id) {
            systemFilter = id;
            refresh();
        },
        setStatusColors(on) {
            statusColors = on;
            refresh();
        },
        reset() {
            controls.autoRotate = !reduceMotion;
            flyTo(HOME_TARGET.clone(), HOME_POS.clone());
        }
    };
}
