/* ==========================================================================
   TRAFFIC COMMAND — MAIN JAVASCRIPT
   Pages: Home, Incidents, Services, Features, About
   Theme: Exact Match to Uploaded Screenshots (Light Theme)
   ========================================================================== */

/* ──────────────────────────────────────────
   DATA
────────────────────────────────────────── */
const homeIncidents = [
  { id: '#INC-4092', cat: 'Accident',      icon: '🚗', iconColor: '#dc2626', loc: 'I-95 Northbound, Exit 24',     sev: 'Critical', team: 'Unit Alpha-04', status: 'On Scene'   },
  { id: '#INC-4091', cat: 'Road Closure',  icon: '🚫', iconColor: '#ea580c', loc: 'SR-400 East & Peachtree',      sev: 'Critical', team: 'HazMat-02',     status: 'En Route'   },
  { id: '#INC-4089', cat: 'Breakdown',     icon: '🚘', iconColor: '#ea580c', loc: 'I-285 Westbound, Mile 14',     sev: 'High',     team: 'Tow-11',        status: 'Dispatched' },
  { id: '#INC-4087', cat: 'Congestion',    icon: '🚦', iconColor: '#0284c7', loc: 'Downtown Connector, Exit 248', sev: 'Medium',   team: 'Signal Ops-03', status: 'On Scene'   },
  { id: '#INC-4085', cat: 'Accident',      icon: '🚗', iconColor: '#dc2626', loc: 'US-78 East, Bridge Overpass',  sev: 'Critical', team: 'Unit Bravo-07', status: 'On Scene'   },
  { id: '#INC-4082', cat: 'Breakdown',     icon: '🚘', iconColor: '#ea580c', loc: 'I-20 Westbound, Exit 51B',     sev: 'High',     team: 'HERO Unit-19',  status: 'En Route'   },
  { id: '#INC-4079', cat: 'Congestion',    icon: '🚦', iconColor: '#0284c7', loc: 'Midtown Tunnel Approach',      sev: 'Medium',   team: 'Patrol-08',     status: 'Dispatched' },
  { id: '#INC-4076', cat: 'Road Closure',  icon: '🚫', iconColor: '#ea580c', loc: 'Memorial Dr & Capitol Ave',    sev: 'High',     team: 'DOT Crew-05',   status: 'On Scene'   },
];

const allIncidents = [
  { id: 'INC-8492', ts: '14:22:08', loc: 'I-405 N • Exit 42B',   cat: 'Accident',          sev: 'Critical', team: 'Unit 14 • EMS-02',  status: 'On Scene'   },
  { id: 'INC-8491', ts: '14:15:41', loc: 'SR-110 S • Tunnel 3',  cat: 'Road Closure',      sev: 'High',     team: 'DOT-Crew 07',       status: 'Dispatched' },
  { id: 'INC-8489', ts: '13:58:12', loc: 'US-101 W • Mile 18',   cat: 'Vehicle Breakdown', sev: 'Medium',   team: 'Tow-Heavy 04',      status: 'On Scene'   },
  { id: 'INC-8488', ts: '13:49:03', loc: 'I-10 E • Interchange', cat: 'Accident',          sev: 'Critical', team: 'Pending Assign',    status: 'Reported'   },
  { id: 'INC-8485', ts: '13:31:55', loc: 'I-5 N • Corridor 9',   cat: 'Congestion',        sev: 'Low',      team: 'Signal-Ops 02',     status: 'Dispatched' },
  { id: 'INC-8482', ts: '12:50:19', loc: 'SR-60 E • Exit 11',    cat: 'Road Closure',      sev: 'High',     team: 'Unit 09 • DOT-03',  status: 'Resolved'   },
  { id: 'INC-8479', ts: '12:14:44', loc: 'I-710 S • Port Gate',  cat: 'Vehicle Breakdown', sev: 'Medium',   team: 'Tow-Light 11',      status: 'Resolved'   },
];

const resolutionEntries = [
  {
    id: 'INC-8482 • SR-60 E Exit 11',
    cleared: '34m',
    note: 'DOT-03 & Unit 09: Debris swept from right two lanes; temporary signage removed and traffic flow normalized.',
    time: 'Resolved at 13:24 • Verified by TMC-04'
  },
  {
    id: 'INC-8479 • I-710 S Port Gate',
    cleared: '19m',
    note: 'Tow-Light 11: Commercial box truck relocated to shoulder bay; no structural barrier damage reported.',
    time: 'Resolved at 12:33 • Verified by TMC-02'
  },
  {
    id: 'INC-8474 • I-405 S Mulholland',
    cleared: '41m',
    note: 'Unit 12 & EMS-05: Two-vehicle collision cleared; minor fluid spill neutralized with absorbent.',
    time: 'Resolved at 11:48 • Verified by TMC-04'
  },
];

const unitData = [
  { icon: '🛡️', name: 'Highway Patrol Units',             avail: '4/5 Available', pct: 80,  desc: 'High-speed pursuit, lane enforcement, and primary incident perimeter control.',                 dispatch: '3m 40s',  zone: 'I-95 & Metro Loop'      },
  { icon: '🚑', name: 'Emergency Medical Response (EMS)', avail: '6/8 Available', pct: 75,  desc: 'Advanced life support ambulances and trauma triage teams for collision injuries.',               dispatch: '4m 15s',  zone: 'All Municipal Sectors'  },
  { icon: '🏗️', name: 'Heavy Tow & Vehicle Recovery',    avail: '3/4 Available', pct: 75,  desc: 'Rotator cranes and heavy-duty wreckers for commercial freight and multi-car clearance.',         dispatch: '11m 20s', zone: 'Expressway & Bridges'   },
  { icon: '🔧', name: 'Road Closure & Barrier Crews',     avail: '5/6 Available', pct: 83,  desc: 'Rapid-deploy attenuator trucks, portable signage, and detour channelization.',                  dispatch: '8m 05s',  zone: 'Arterial & Tunnels'     },
  { icon: '🚦', name: 'Traffic Signal Engineering',        avail: '2/3 Available', pct: 67,  desc: 'Intersection cabinet repair, adaptive timing overrides, and smart-grid restoration.',           dispatch: '14m 30s', zone: 'Central Business Dist.' },
  { icon: '⚗️', name: 'Hazmat & Spill Response',          avail: '2/2 Available', pct: 100, desc: 'Chemical containment, fuel spill neutralization, and environmental safety sweeps.',             dispatch: '6m 50s',  zone: 'Industrial & Freight'   },
];

const dispatchData = [
  { id: '#DSP-4092', team: 'Highway Patrol • Unit 14', loc: 'I-95 Northbound, Milepost 42.8', status: 'On Scene', eta: 'Arrived' },
  { id: '#DSP-4091', team: 'EMS • Medic 07',           loc: 'I-95 Northbound, Milepost 42.8', status: 'En Route', eta: '02m 15s' },
  { id: '#DSP-4088', team: 'Heavy Tow • Rig 03',       loc: 'Harbor Bridge Eastbound, Lane 1', status: 'En Route', eta: '06m 40s' },
  { id: '#DSP-4085', team: 'Signal Eng. • Crew 02',    loc: '5th Ave & Pine St Intersection', status: 'On Scene', eta: 'Arrived' },
  { id: '#DSP-4081', team: 'Barrier Crew • Unit 05',   loc: 'Midtown Tunnel Approach, West',  status: 'Staging',  eta: '01m 10s' },
];

const lifecycleData = [
  { icon: '📡', name: 'Stage 01: Structured Intake',        desc: 'Captures highway corridor, milepost, lane blockage, and initial hazard classification in under 15 seconds.',                   sla: 'SLA: < 15s Intake'   },
  { icon: '⚡', name: 'Stage 02: Automated Prioritization', desc: 'Deterministic scoring evaluates volume, hazard type, and arterial impact to surface critical events instantly.',                sla: 'SLA: < 5s Score'     },
  { icon: '▷', name: 'Stage 03: Multi-Agency Dispatch',    desc: 'CAD routing assigns nearest available unit; GPS handshake confirms en-route within 60 seconds.',                                sla: 'SLA: < 60s Dispatch' },
  { icon: '✅', name: 'Stage 04: Resolution & Archive',     desc: 'Lane clearance verified by field unit, incident sealed with tamper-proof audit log and TMC sign-off.',                         sla: 'SLA: < 3min Archive' },
];

/* ──────────────────────────────────────────
   NAVIGATION
────────────────────────────────────────── */
function navTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  if (page === 'incidents') setTimeout(drawSectorMap, 80);
  if (page === 'home') setTimeout(() => drawMiniMap('miniMapCanvas'), 80);
}

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    navTo(a.dataset.page);
  });
});

/* ──────────────────────────────────────────
   HELPERS — CSS CLASS SELECTORS
────────────────────────────────────────── */
function sevClass(s) {
  if (s === 'Critical') return 'sev-critical';
  if (s === 'High')     return 'sev-high';
  if (s === 'Medium')   return 'sev-medium';
  return 'sev-low';
}

function statusClass(s) {
  const key = s.replace(/\s+/g, '');
  if (key === 'OnScene')    return 'status-onscene';
  if (key === 'EnRoute')    return 'status-enroute';
  if (key === 'Dispatched') return 'status-dispatched';
  if (key === 'Reported')   return 'status-reported';
  if (key === 'Resolved')   return 'status-resolved';
  return 'status-dispatched';
}

/* ──────────────────────────────────────────
   HOME TABLE
────────────────────────────────────────── */
function renderHomeTable(data) {
  const tbody = document.getElementById('homeTableBody');
  if (!tbody) return;
  tbody.innerHTML = data.map(r => `
    <tr>
      <td><a class="inc-id" href="#" onclick="showToast('📋 Viewing ${r.id}')">${r.id}</a></td>
      <td>
        <span style="display:inline-flex;align-items:center;gap:6px">
          <span>${r.icon || '🚗'}</span>
          <span>${r.cat}</span>
        </span>
      </td>
      <td>${r.loc}</td>
      <td><span class="sev-pill ${sevClass(r.sev)}">${r.sev}</span></td>
      <td>${r.team}</td>
      <td><span class="status-pill ${statusClass(r.status)}">${r.status}</span></td>
    </tr>
  `).join('');
}

function filterHomeTable() {
  const q = document.getElementById('homeSearch').value.toLowerCase();
  const filtered = homeIncidents.filter(r =>
    r.id.toLowerCase().includes(q) ||
    r.loc.toLowerCase().includes(q) ||
    r.cat.toLowerCase().includes(q) ||
    r.team.toLowerCase().includes(q)
  );
  renderHomeTable(filtered);
}

/* ──────────────────────────────────────────
   INCIDENTS TABLE
────────────────────────────────────────── */
let currentSevFilter = 'all';

function renderIncTable(data) {
  const tbody = document.getElementById('incTableBody');
  if (!tbody) return;
  tbody.innerHTML = data.map(r => `
    <tr>
      <td><a class="inc-id" href="#" onclick="showToast('📋 Viewing ${r.id}')">${r.id}</a></td>
      <td style="color:var(--text-secondary)">${r.ts}</td>
      <td style="font-weight:500">${r.loc}</td>
      <td>${r.cat}</td>
      <td><span class="sev-pill ${sevClass(r.sev)}">${r.sev}</span></td>
      <td>${r.team}</td>
      <td><span class="status-pill ${statusClass(r.status)}">${r.status}</span></td>
      <td><button class="btn-track" onclick="showToast('📍 Tracking ${r.id}')">⋮</button></td>
    </tr>
  `).join('');
  const countEl = document.getElementById('incCount');
  if (countEl) {
    countEl.textContent = `Showing ${data.length} of ${allIncidents.length} incidents`;
  }
}

function filterIncTable() {
  const q   = document.getElementById('incSearch').value.toLowerCase();
  const cat = document.getElementById('catFilter').value;
  const st  = document.getElementById('statusFilter').value;
  const data = allIncidents.filter(r => {
    const matchQ   = !q   || r.id.toLowerCase().includes(q) || r.loc.toLowerCase().includes(q) || r.team.toLowerCase().includes(q);
    const matchCat = !cat || r.cat === cat;
    const matchSt  = !st  || r.status === st;
    const matchSev = currentSevFilter === 'all' || r.sev === currentSevFilter;
    return matchQ && matchCat && matchSt && matchSev;
  });
  renderIncTable(data);
}

function filterSev(btn, sev) {
  document.querySelectorAll('.sev-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentSevFilter = sev;
  filterIncTable();
}

/* ──────────────────────────────────────────
   RESOLUTION LOG
────────────────────────────────────────── */
function renderResolutionLog() {
  const container = document.getElementById('resolutionLog');
  if (!container) return;
  container.innerHTML = resolutionEntries.map(e => `
    <div style="background:#ffffff;border:1px solid var(--border-card);border-radius:8px;padding:14px 16px;box-shadow:var(--shadow-card)">
      <div class="flex-between" style="margin-bottom:6px">
        <span style="font-size:0.8rem;font-weight:700;color:var(--text-main)">${e.id}</span>
        <span class="stat-badge badge-blue">Cleared in ${e.cleared}</span>
      </div>
      <p style="font-size:0.75rem;color:var(--text-secondary);line-height:1.5;margin-bottom:6px">${e.note}</p>
      <span style="font-size:0.68rem;color:var(--text-muted)">${e.time}</span>
    </div>
  `).join('');
}

/* ──────────────────────────────────────────
   UNIT CARDS (Services Page)
────────────────────────────────────────── */
function renderUnitCards() {
  const container = document.getElementById('unitCards');
  if (!container) return;
  container.innerHTML = unitData.map(u => `
    <div class="unit-card">
      <div class="unit-card-top">
        <div class="unit-icon">${u.icon}</div>
        <span class="stat-badge badge-blue">${u.avail}</span>
      </div>
      <div class="unit-name">${u.name}</div>
      <div class="unit-desc">${u.desc}</div>
      <div class="unit-progress"><div class="unit-progress-fill" style="width:${u.pct}%"></div></div>
      <div class="unit-meta">
        <div class="unit-meta-item"><label>AVG DISPATCH</label><span>${u.dispatch}</span></div>
        <div class="unit-meta-item"><label>COVERAGE ZONE</label><span>${u.zone}</span></div>
      </div>
      <button class="btn-dispatch-unit" onclick="showToast('🚀 ${u.name} dispatched!')">▷ Dispatch Unit</button>
    </div>
  `).join('');
}

/* ──────────────────────────────────────────
   DISPATCH TABLE (Services Page)
────────────────────────────────────────── */
function renderDispTable(data) {
  const tbody = document.getElementById('dispTableBody');
  if (!tbody) return;
  tbody.innerHTML = data.map(r => `
    <tr>
      <td><a class="inc-id" href="#" onclick="showToast('📋 ${r.id}')">${r.id}</a></td>
      <td style="font-weight:500">${r.team}</td>
      <td>${r.loc}</td>
      <td><span class="status-pill ${statusClass(r.status)}">${r.status}</span></td>
      <td style="font-weight:600;color:var(--text-main)">${r.eta}</td>
      <td>
        ${(r.status === 'On Scene' || r.eta === 'Arrived')
          ? `<button class="btn-track" onclick="showToast('📋 Log for ${r.id}')">View Log</button>`
          : `<button class="btn-track" onclick="showToast('📍 Tracking ${r.id}')">Track</button>`
        }
      </td>
    </tr>
  `).join('');
}

function filterDisp() {
  const q = document.getElementById('dispSearch').value.toLowerCase();
  const data = dispatchData.filter(r =>
    r.id.toLowerCase().includes(q) ||
    r.team.toLowerCase().includes(q) ||
    r.loc.toLowerCase().includes(q)
  );
  renderDispTable(data);
}

/* ──────────────────────────────────────────
   LIFECYCLE (Features Page)
────────────────────────────────────────── */
let lcActive = 0;

function selectLifecycle(idx) {
  lcActive = idx;
  document.querySelectorAll('.lc-step').forEach((el, i) =>
    el.classList.toggle('active', i === idx)
  );
  const d = lifecycleData[idx];
  const detail = document.getElementById('lcDetail');
  if (detail) {
    detail.innerHTML = `
      <div class="lc-detail-icon">${d.icon}</div>
      <div class="lc-detail-text">
        <h4>${d.name}</h4>
        <p>${d.desc}</p>
      </div>
      <div class="lc-sla">
        <div class="lc-sla-val">${d.sla}</div>
        <div class="lc-sla-label">Time Target</div>
      </div>
    `;
  }
}

function cycleLifecycle() {
  lcActive = (lcActive + 1) % 4;
  selectLifecycle(lcActive);
}

/* ──────────────────────────────────────────
   TOAST NOTIFICATIONS
────────────────────────────────────────── */
function showToast(msg, duration = 3000) {
  const tc = document.getElementById('toastContainer');
  if (!tc) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  tc.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateY(10px)';
    t.style.transition = 'all 0.25s';
    setTimeout(() => t.remove(), 250);
  }, duration);
}

/* ──────────────────────────────────────────
   MODAL — Report Incident
────────────────────────────────────────── */
function openReportModal() {
  const m = document.getElementById('reportModal');
  if (m) m.classList.add('open');
}

function closeReportModal() {
  const m = document.getElementById('reportModal');
  if (m) m.classList.remove('open');
}

const modalOverlay = document.getElementById('reportModal');
if (modalOverlay) {
  modalOverlay.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeReportModal();
  });
}

let incCounter = 4100;

function submitReport() {
  const locInput = document.getElementById('mLocation');
  const loc = locInput ? locInput.value.trim() : '';
  if (!loc) {
    showToast('⚠️ Please enter a location');
    return;
  }
  incCounter++;
  const cat = document.getElementById('mCategory').value;
  const newInc = {
    id: `#INC-${incCounter}`,
    cat: cat,
    icon: cat === 'Accident' ? '🚗' : cat === 'Road Closure' ? '🚫' : cat === 'Breakdown' ? '🚘' : '🚦',
    loc: loc,
    sev: document.getElementById('mSeverity').value,
    team: document.getElementById('mTeam').value.replace(' (Recommended)', '').replace('Auto-Assign', 'Unit Alpha-04'),
    status: 'Dispatched',
  };
  homeIncidents.unshift(newInc);
  renderHomeTable(homeIncidents.slice(0, 8));

  const activeCountEl = document.getElementById('stat-active');
  if (activeCountEl) {
    activeCountEl.textContent = parseInt(activeCountEl.textContent) + 1;
  }

  closeReportModal();
  showToast(`✅ Incident #INC-${incCounter} logged & dispatched!`);
  if (locInput) locInput.value = '';
  const notesInput = document.getElementById('mNotes');
  if (notesInput) notesInput.value = '';
}

/* ──────────────────────────────────────────
   QUICK DISPATCH (Home Sidebar)
────────────────────────────────────────── */
function dispatchIncident() {
  const locInput = document.getElementById('qLocation');
  const loc = locInput ? locInput.value.trim() : '';
  if (!loc) {
    showToast('⚠️ Please enter a location');
    return;
  }
  incCounter++;
  const cat = document.getElementById('qCategory').value;
  const newInc = {
    id: `#INC-${incCounter}`,
    cat: cat,
    icon: cat === 'Accident' ? '🚗' : cat === 'Road Closure' ? '🚫' : cat === 'Breakdown' ? '🚘' : '🚦',
    loc: loc,
    sev: document.getElementById('qSeverity').value,
    team: document.getElementById('qTeam').value.replace(' (Available)', ''),
    status: 'Dispatched',
  };
  homeIncidents.unshift(newInc);
  renderHomeTable(homeIncidents.slice(0, 8));

  const activeCountEl = document.getElementById('stat-active');
  if (activeCountEl) {
    activeCountEl.textContent = parseInt(activeCountEl.textContent) + 1;
  }

  showToast(`✅ Incident #INC-${incCounter} logged & dispatched!`);
  if (locInput) locInput.value = '';
}

function syncTable() {
  showToast('🔄 Syncing live data...');
  setTimeout(() => showToast('✅ Data synced — 18 active incidents'), 1200);
}

/* ──────────────────────────────────────────
   REALISTIC LIGHT-THEMED GEOSPATIAL MAP CANVAS
   (Matched to Atlanta / LA snapshot in screenshots)
────────────────────────────────────────── */
function drawMiniMap(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const parent = canvas.parentElement;
  canvas.width  = parent.offsetWidth  || 300;
  canvas.height = parent.offsetHeight || 180;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  // 1. Base land color (soft warm light gray)
  ctx.fillStyle = '#f1f3f6';
  ctx.fillRect(0, 0, W, H);

  // 2. Parks & green zones (mint green)
  ctx.fillStyle = '#d7f3e3';
  ctx.beginPath();
  ctx.ellipse(W * 0.25, H * 0.35, W * 0.14, H * 0.22, 0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(W * 0.78, H * 0.72, W * 0.16, H * 0.18, -0.3, 0, Math.PI * 2);
  ctx.fill();

  // 3. Water body / river (soft light blue)
  ctx.strokeStyle = '#cbe4fb';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(0, H * 0.15);
  ctx.bezierCurveTo(W * 0.4, H * 0.2, W * 0.6, H * 0.8, W, H * 0.85);
  ctx.stroke();

  // 4. Minor street grid lines (crisp white with faint border)
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  for (let x = 15; x < W; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 15; y < H; y += 28) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // 5. Major Highways / Arterials (solid light blue-gray corridor)
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 6;
  // Highway 1: North-South
  ctx.beginPath();
  ctx.moveTo(W * 0.52, 0);
  ctx.bezierCurveTo(W * 0.52, H * 0.4, W * 0.48, H * 0.6, W * 0.5, H);
  ctx.stroke();

  // Highway 2: East-West
  ctx.beginPath();
  ctx.moveTo(0, H * 0.48);
  ctx.bezierCurveTo(W * 0.3, H * 0.46, W * 0.7, H * 0.52, W, H * 0.5);
  ctx.stroke();

  // Overlay Highway core (white)
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(W * 0.52, 0);
  ctx.bezierCurveTo(W * 0.52, H * 0.4, W * 0.48, H * 0.6, W * 0.5, H);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, H * 0.48);
  ctx.bezierCurveTo(W * 0.3, H * 0.46, W * 0.7, H * 0.52, W, H * 0.5);
  ctx.stroke();

  // 6. Metro Highway Center ring
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2.5;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.ellipse(W * 0.5, H * 0.5, W * 0.16, H * 0.22, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // 7. City Labels
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 12px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Atlanta', W * 0.5, H * 0.54);

  ctx.fillStyle = '#64748b';
  ctx.font = '500 8px Inter, sans-serif';
  ctx.fillText('Downtown', W * 0.5, H * 0.62);
  ctx.fillText('Midtown', W * 0.52, H * 0.36);
  ctx.fillText('Decatur', W * 0.85, H * 0.45);

  // 8. Incident Marker Pins (matching screenshot styling)
  function drawPin(x, y, color, pulse) {
    // Halo
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.22;
    ctx.beginPath();
    ctx.arc(x, y, pulse ? 9 : 7, 0, Math.PI * 2);
    ctx.fill();

    // Border
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();

    // Solid Center
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Critical pins (Red)
  drawPin(W * 0.48, H * 0.46, '#dc2626', true);
  drawPin(W * 0.54, H * 0.24, '#dc2626', true);
  drawPin(W * 0.72, H * 0.52, '#dc2626', true);

  // High pins (Orange)
  drawPin(W * 0.32, H * 0.48, '#ea580c', false);
  drawPin(W * 0.5,  H * 0.74, '#ea580c', false);
  drawPin(W * 0.65, H * 0.38, '#ea580c', false);
  drawPin(W * 0.22, H * 0.68, '#ea580c', false);

  // Response Units (Blue/Teal)
  drawPin(W * 0.44, H * 0.38, '#005bf6', false);
  drawPin(W * 0.58, H * 0.62, '#005bf6', false);
}

function drawSectorMap() {
  drawMiniMap('sectorMapCanvas');
}

/* ──────────────────────────────────────────
   LIVE TICKER
────────────────────────────────────────── */
function tickResponseTime() {
  const el = document.getElementById('stat-response');
  if (!el) return;
  const mins = Math.floor(Math.random() * 3) + 5;
  const secs = Math.floor(Math.random() * 60);
  el.textContent = `${mins}m ${secs.toString().padStart(2, '0')}s`;
}

/* ──────────────────────────────────────────
   INIT
────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  renderHomeTable(homeIncidents);
  renderIncTable(allIncidents);
  renderResolutionLog();
  renderUnitCards();
  renderDispTable(dispatchData);
  drawMiniMap('miniMapCanvas');

  setInterval(tickResponseTime, 15000);
});

window.addEventListener('resize', () => {
  drawMiniMap('miniMapCanvas');
  const incidentsPage = document.getElementById('page-incidents');
  if (incidentsPage && incidentsPage.classList.contains('active')) {
    drawSectorMap();
  }
});
