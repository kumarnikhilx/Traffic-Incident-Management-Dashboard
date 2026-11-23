/* ==========================================================================
   TRAFFIC COMMAND — MAIN JAVASCRIPT
   Features: Real-time Multi-Page Telemetry, Live Dispatch, Instant Sync
   Pages: Home, Incidents, Services, Features, About
   Theme: Pixel-faithful Light Enterprise Theme
   ========================================================================== */

/* ──────────────────────────────────────────
   STATE & DATA STORE
────────────────────────────────────────── */
const homeIncidents = [
  { id: '#INC-4092', cat: 'Accident',      icon: '🚗', loc: 'I-95 Northbound, Exit 24',     sev: 'Critical', team: 'Unit Alpha-04', status: 'On Scene'   },
  { id: '#INC-4091', cat: 'Road Closure',  icon: '🚫', loc: 'SR-400 East & Peachtree',      sev: 'Critical', team: 'HazMat-02',     status: 'En Route'   },
  { id: '#INC-4089', cat: 'Breakdown',     icon: '🚘', loc: 'I-285 Westbound, Mile 14',     sev: 'High',     team: 'Tow-11',        status: 'Dispatched' },
  { id: '#INC-4087', cat: 'Congestion',    icon: '🚦', loc: 'Downtown Connector, Exit 248', sev: 'Medium',   team: 'Signal Ops-03', status: 'On Scene'   },
  { id: '#INC-4085', cat: 'Accident',      icon: '🚗', loc: 'US-78 East, Bridge Overpass',  sev: 'Critical', team: 'Unit Bravo-07', status: 'On Scene'   },
  { id: '#INC-4082', cat: 'Breakdown',     icon: '🚘', loc: 'I-20 Westbound, Exit 51B',     sev: 'High',     team: 'HERO Unit-19',  status: 'En Route'   },
  { id: '#INC-4079', cat: 'Congestion',    icon: '🚦', loc: 'Midtown Tunnel Approach',      sev: 'Medium',   team: 'Patrol-08',     status: 'Dispatched' },
  { id: '#INC-4076', cat: 'Road Closure',  icon: '🚫', loc: 'Memorial Dr & Capitol Ave',    sev: 'High',     team: 'DOT Crew-05',   status: 'On Scene'   },
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
  { icon: '🛡️', name: 'Highway Patrol Units',             current: 4, total: 5, desc: 'High-speed pursuit, lane enforcement, and primary incident perimeter control.',                 dispatch: '3m 40s',  zone: 'I-95 & Metro Loop'      },
  { icon: '🚑', name: 'Emergency Medical Response (EMS)', current: 6, total: 8, desc: 'Advanced life support ambulances and trauma triage teams for collision injuries.',               dispatch: '4m 15s',  zone: 'All Municipal Sectors'  },
  { icon: '🏗️', name: 'Heavy Tow & Vehicle Recovery',    current: 3, total: 4, desc: 'Rotator cranes and heavy-duty wreckers for commercial freight and multi-car clearance.',         dispatch: '11m 20s', zone: 'Expressway & Bridges'   },
  { icon: '🔧', name: 'Road Closure & Barrier Crews',     current: 5, total: 6, desc: 'Rapid-deploy attenuator trucks, portable signage, and detour channelization.',                  dispatch: '8m 05s',  zone: 'Arterial & Tunnels'     },
  { icon: '🚦', name: 'Traffic Signal Engineering',        current: 2, total: 3, desc: 'Intersection cabinet repair, adaptive timing overrides, and smart-grid restoration.',           dispatch: '14m 30s', zone: 'Central Business Dist.' },
  { icon: '⚗️', name: 'Hazmat & Spill Response',          current: 2, total: 2, desc: 'Chemical containment, fuel spill neutralization, and environmental safety sweeps.',             dispatch: '6m 50s',  zone: 'Industrial & Freight'   },
];

const dispatchData = [
  { id: '#DSP-4092', team: 'Highway Patrol • Unit 14', loc: 'I-95 Northbound, Milepost 42.8', status: 'On Scene', eta: 'Arrived', etaSeconds: 0 },
  { id: '#DSP-4091', team: 'EMS • Medic 07',           loc: 'I-95 Northbound, Milepost 42.8', status: 'En Route', eta: '02m 15s', etaSeconds: 135 },
  { id: '#DSP-4088', team: 'Heavy Tow • Rig 03',       loc: 'Harbor Bridge Eastbound, Lane 1', status: 'En Route', eta: '06m 40s', etaSeconds: 400 },
  { id: '#DSP-4085', team: 'Signal Eng. • Crew 02',    loc: '5th Ave & Pine St Intersection', status: 'On Scene', eta: 'Arrived', etaSeconds: 0 },
  { id: '#DSP-4081', team: 'Barrier Crew • Unit 05',   loc: 'Midtown Tunnel Approach, West',  status: 'Staging',  eta: '01m 10s', etaSeconds: 70 },
];

const lifecycleData = [
  { icon: '📡', name: 'Stage 01: Structured Intake',        desc: 'Captures highway corridor, milepost, lane blockage, and initial hazard classification in under 15 seconds.',                   sla: 'SLA: < 15s Intake'   },
  { icon: '⚡', name: 'Stage 02: Automated Prioritization', desc: 'Deterministic scoring evaluates volume, hazard type, and arterial impact to surface critical events instantly.',                sla: 'SLA: < 5s Score'     },
  { icon: '▷', name: 'Stage 03: Multi-Agency Dispatch',    desc: 'CAD routing assigns nearest available unit; GPS handshake confirms en-route within 60 seconds.',                                sla: 'SLA: < 60s Dispatch' },
  { icon: '✅', name: 'Stage 04: Resolution & Archive',     desc: 'Lane clearance verified by field unit, incident sealed with tamper-proof audit log and TMC sign-off.',                         sla: 'SLA: < 3min Archive' },
];

let globalStats = {
  activeIncidents: 18,
  criticalAlerts: 3,
  activeCalls: 6,
  unitsDeployed: 19
};

let incCounter = 4100;
let currentSevFilter = 'all';

/* ──────────────────────────────────────────
   TIME & TIMESTAMP HELPERS
────────────────────────────────────────── */
function getCurrentTimeFormatted() {
  const now = new Date();
  return now.toTimeString().split(' ')[0];
}

/* ──────────────────────────────────────────
   NAVIGATION
────────────────────────────────────────── */
function navTo(page) {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.remove('mobile-open');

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  // Render context-specific maps or tables promptly
  if (page === 'home') {
    renderHomeTable(homeIncidents);
    setTimeout(() => drawMiniMap('miniMapCanvas'), 50);
  } else if (page === 'incidents') {
    renderIncTable(allIncidents);
    renderResolutionLog();
    setTimeout(() => drawSectorMap(), 50);
  } else if (page === 'services') {
    renderUnitCards();
    renderDispTable(dispatchData);
  }
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
  tbody.innerHTML = data.map((r, index) => `
    <tr class="${r.isNew ? 'row-highlight' : ''}">
      <td><a class="inc-id" href="#" onclick="showToast('📋 Incident ${r.id}: ${r.loc}')">${r.id}</a></td>
      <td>
        <span style="display:inline-flex;align-items:center;gap:6px">
          <span>${r.icon || '🚗'}</span>
          <span>${r.cat}</span>
        </span>
      </td>
      <td style="font-weight:500">${r.loc}</td>
      <td><span class="sev-pill ${sevClass(r.sev)}">${r.sev}</span></td>
      <td>${r.team}</td>
      <td>
        <span class="status-pill ${statusClass(r.status)}" onclick="cycleIncidentStatus('${r.id}', 'home')" title="Click to update status">
          ${r.status}
        </span>
      </td>
    </tr>
  `).join('');
}

function filterHomeTable() {
  const q = document.getElementById('homeSearch').value.trim().toLowerCase();
  const filtered = homeIncidents.filter(r =>
    !q ||
    r.id.toLowerCase().includes(q) ||
    r.loc.toLowerCase().includes(q) ||
    r.cat.toLowerCase().includes(q) ||
    r.team.toLowerCase().includes(q)
  );
  renderHomeTable(filtered);
}

/* ──────────────────────────────────────────
   INCIDENTS QUEUE TABLE
────────────────────────────────────────── */
function renderIncTable(data) {
  const tbody = document.getElementById('incTableBody');
  if (!tbody) return;
  tbody.innerHTML = data.map(r => `
    <tr class="${r.isNew ? 'row-highlight' : ''}">
      <td><a class="inc-id" href="#" onclick="showToast('📋 Incident ${r.id}: ${r.loc}')">${r.id}</a></td>
      <td style="color:var(--text-secondary);font-variant-numeric:tabular-nums">${r.ts}</td>
      <td style="font-weight:500">${r.loc}</td>
      <td>${r.cat}</td>
      <td><span class="sev-pill ${sevClass(r.sev)}">${r.sev}</span></td>
      <td>${r.team}</td>
      <td>
        <span class="status-pill ${statusClass(r.status)}" onclick="cycleIncidentStatus('${r.id}', 'incidents')" title="Click to advance status">
          ${r.status}
        </span>
      </td>
      <td>
        <button class="btn-track" onclick="cycleIncidentStatus('${r.id}', 'incidents')" title="Quick Status Action">⋮</button>
      </td>
    </tr>
  `).join('');

  const countEl = document.getElementById('incCount');
  if (countEl) {
    countEl.textContent = `Showing ${data.length} of ${allIncidents.length} incidents`;
  }
}

function filterIncTable() {
  const q   = document.getElementById('incSearch').value.trim().toLowerCase();
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
   STATUS LIFECYCLE PROGRESSION (INTERACTIVE ACTION)
────────────────────────────────────────── */
function cycleIncidentStatus(id, sourcePage) {
  const normId = id.replace('#', '');
  const nextStatuses = {
    'Reported': 'Dispatched',
    'Dispatched': 'On Scene',
    'On Scene': 'Resolved',
    'Resolved': 'On Scene',
    'En Route': 'On Scene'
  };

  // Update in homeIncidents
  const hItem = homeIncidents.find(x => x.id.replace('#', '') === normId);
  // Update in allIncidents
  const aItem = allIncidents.find(x => x.id.replace('#', '') === normId);

  const curStatus = (hItem && hItem.status) || (aItem && aItem.status) || 'Dispatched';
  const newStatus = nextStatuses[curStatus] || 'On Scene';

  if (hItem) hItem.status = newStatus;
  if (aItem) aItem.status = newStatus;

  // If marked resolved, update stats and resolution log
  if (newStatus === 'Resolved') {
    globalStats.activeIncidents = Math.max(0, globalStats.activeIncidents - 1);
    updateMetricCounters();
    resolutionEntries.unshift({
      id: `${id} • Corridors Verified`,
      cleared: `${Math.floor(Math.random() * 20) + 10}m`,
      note: `Unit handoff complete. Corridors cleared, barriers verified, and normal highway flow resumed.`,
      time: `Resolved at ${getCurrentTimeFormatted()} • Verified by TMC-01`
    });
    renderResolutionLog();
    showToast(`✅ ${id} marked as RESOLVED & logged to archive!`);
  } else {
    showToast(`⚡ ${id} status updated to: ${newStatus}`);
  }

  renderHomeTable(homeIncidents);
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
  container.innerHTML = unitData.map((u, idx) => {
    const pct = Math.round((u.current / u.total) * 100);
    return `
      <div class="unit-card">
        <div class="unit-card-top">
          <div class="unit-icon">${u.icon}</div>
          <span class="stat-badge badge-blue">${u.current}/${u.total} Available</span>
        </div>
        <div class="unit-name">${u.name}</div>
        <div class="unit-desc">${u.desc}</div>
        <div class="unit-progress"><div class="unit-progress-fill" style="width:${pct}%"></div></div>
        <div class="unit-meta">
          <div class="unit-meta-item"><label>AVG DISPATCH</label><span>${u.dispatch}</span></div>
          <div class="unit-meta-item"><label>COVERAGE ZONE</label><span>${u.zone}</span></div>
        </div>
        <button class="btn-dispatch-unit" onclick="deploySpecificUnit(${idx})">▷ Dispatch Unit</button>
      </div>
    `;
  }).join('');
}

/* Deploy unit button action: updates readiness and adds active assignment immediately */
function deploySpecificUnit(idx) {
  const u = unitData[idx];
  if (u.current > 0) {
    u.current -= 1;
  }
  globalStats.activeCalls += 1;
  updateMetricCounters();

  const newDspId = `#DSP-${Math.floor(1000 + Math.random() * 9000)}`;
  dispatchData.unshift({
    id: newDspId,
    team: `${u.name.split(' ')[0]} • Unit ${Math.floor(10 + Math.random() * 90)}`,
    loc: `${u.zone}, Sector ${Math.floor(1 + Math.random() * 8)}`,
    status: 'En Route',
    eta: '04m 30s',
    etaSeconds: 270,
    isNew: true
  });

  renderUnitCards();
  renderDispTable(dispatchData);
  showToast(`🚀 ${u.name} dispatched! Assignment ${newDspId} active.`);
}

/* ──────────────────────────────────────────
   DISPATCH TABLE (Services Page)
────────────────────────────────────────── */
function renderDispTable(data) {
  const tbody = document.getElementById('dispTableBody');
  if (!tbody) return;
  tbody.innerHTML = data.map(r => `
    <tr class="${r.isNew ? 'row-highlight' : ''}">
      <td><a class="inc-id" href="#" onclick="showToast('📋 ${r.id}')">${r.id}</a></td>
      <td style="font-weight:500">${r.team}</td>
      <td>${r.loc}</td>
      <td><span class="status-pill ${statusClass(r.status)}">${r.status}</span></td>
      <td style="font-weight:600;color:var(--text-main);font-variant-numeric:tabular-nums">${r.eta}</td>
      <td>
        ${(r.status === 'On Scene' || r.eta === 'Arrived')
          ? `<button class="btn-track" onclick="showToast('📋 Log for ${r.id}: Clearance in progress')">View Log</button>`
          : `<button class="btn-track" onclick="showToast('📍 Live GPS: ${r.team} is ${r.eta} away')">Track</button>`
        }
      </td>
    </tr>
  `).join('');
}

function filterDisp() {
  const q = document.getElementById('dispSearch').value.trim().toLowerCase();
  const data = dispatchData.filter(r =>
    !q ||
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
  showToast(`↗ Switched to: ${lifecycleData[lcActive].name}`);
}

/* ──────────────────────────────────────────
   TOAST NOTIFICATIONS
────────────────────────────────────────── */
function showToast(msg, duration = 2800) {
  const tc = document.getElementById('toastContainer');
  if (!tc) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  tc.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateY(10px)';
    t.style.transition = 'all 0.25s ease';
    setTimeout(() => t.remove(), 250);
  }, duration);
}

/* ──────────────────────────────────────────
   MODAL — Report Incident
────────────────────────────────────────── */
function openReportModal() {
  const m = document.getElementById('reportModal');
  if (m) {
    m.classList.add('open');
    setTimeout(() => {
      const locInput = document.getElementById('mLocation');
      if (locInput) locInput.focus();
    }, 50);
  }
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

// Global escape key to close modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeReportModal();
});

/* ──────────────────────────────────────────
   UNIFIED INCIDENT DISPATCH CREATOR
────────────────────────────────────────── */
function createAndDispatchIncident(loc, cat, sev, rawTeam) {
  incCounter++;
  const newId = `#INC-${incCounter}`;
  const team = rawTeam.replace(' (Recommended)', '').replace(' (Available)', '').replace('Auto-Assign', 'Unit Alpha-04');
  const icon = cat === 'Accident' ? '🚗' : cat === 'Road Closure' ? '🚫' : cat === 'Breakdown' ? '🚘' : '🚦';
  const nowTime = getCurrentTimeFormatted();

  // 1. Prepend to Home Incidents
  homeIncidents.unshift({
    id: newId,
    cat: cat,
    icon: icon,
    loc: loc,
    sev: sev,
    team: team,
    status: 'Dispatched',
    isNew: true
  });

  // 2. Prepend to Full Incident Queue
  allIncidents.unshift({
    id: `INC-${incCounter}`,
    ts: nowTime,
    loc: loc,
    cat: cat,
    sev: sev,
    team: team,
    status: 'Dispatched',
    isNew: true
  });

  // 3. Prepend to Dispatch Assignment Feed
  dispatchData.unshift({
    id: `#DSP-${incCounter}`,
    team: team,
    loc: loc,
    status: 'En Route',
    eta: '03m 15s',
    etaSeconds: 195,
    isNew: true
  });

  // 4. Update Global Metrics
  globalStats.activeIncidents += 1;
  if (sev === 'Critical') globalStats.criticalAlerts += 1;
  globalStats.activeCalls += 1;
  updateMetricCounters();

  // 5. Re-render affected tables immediately
  renderHomeTable(homeIncidents);
  filterIncTable();
  renderDispTable(dispatchData);

  // 6. Provide instant feedback
  showToast(`✅ ${newId} logged & dispatched to ${team}!`);
}

function submitReport() {
  const locInput = document.getElementById('mLocation');
  const loc = locInput ? locInput.value.trim() : '';
  if (!loc) {
    showToast('⚠️ Please enter an incident location');
    if (locInput) locInput.focus();
    return;
  }
  const cat = document.getElementById('mCategory').value;
  const sev = document.getElementById('mSeverity').value;
  const team = document.getElementById('mTeam').value;

  createAndDispatchIncident(loc, cat, sev, team);

  closeReportModal();
  if (locInput) locInput.value = '';
  const notesInput = document.getElementById('mNotes');
  if (notesInput) notesInput.value = '';
}

function dispatchIncident() {
  const locInput = document.getElementById('qLocation');
  const loc = locInput ? locInput.value.trim() : '';
  if (!loc) {
    showToast('⚠️ Please enter an incident location');
    if (locInput) locInput.focus();
    return;
  }
  const cat = document.getElementById('qCategory').value;
  const sev = document.getElementById('qSeverity').value;
  const team = document.getElementById('qTeam').value;

  createAndDispatchIncident(loc, cat, sev, team);
  if (locInput) locInput.value = '';
}

// Enter key support for quick forms
const qLocationInput = document.getElementById('qLocation');
if (qLocationInput) {
  qLocationInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') dispatchIncident();
  });
}
const mLocationInput = document.getElementById('mLocation');
if (mLocationInput) {
  mLocationInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') submitReport();
  });
}

function syncTable() {
  showToast('🔄 Synchronizing CAD & field radar telemetry...');
  setTimeout(() => {
    renderHomeTable(homeIncidents);
    filterIncTable();
    renderDispTable(dispatchData);
    drawMiniMap('miniMapCanvas');
    showToast('✅ All telemetry synchronized (0ms latency)');
  }, 400);
}

/* ──────────────────────────────────────────
   UPDATE METRIC COUNTERS FAST
────────────────────────────────────────── */
function updateMetricCounters() {
  const activeHome = document.getElementById('stat-active');
  if (activeHome) activeHome.textContent = globalStats.activeIncidents;

  const critHome = document.getElementById('stat-critical');
  if (critHome) critHome.textContent = globalStats.criticalAlerts;

  const incActive = document.querySelector('#page-incidents .stat-value');
  if (incActive) incActive.textContent = globalStats.activeIncidents;

  const activeCallEl = document.querySelector('.services-stat-box.active-call-box .services-stat-num');
  if (activeCallEl) activeCallEl.textContent = globalStats.activeCalls.toString().padStart(2, '0');
}

/* ──────────────────────────────────────────
   REALISTIC LIGHT-THEMED GEOSPATIAL MAP CANVAS
   (Atlanta / Metro Corridor snapshot)
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

  // 4. Minor street grid lines (crisp white)
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

  // 5. Major Highways (solid light blue-gray corridor)
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(W * 0.52, 0);
  ctx.bezierCurveTo(W * 0.52, H * 0.4, W * 0.48, H * 0.6, W * 0.5, H);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, H * 0.48);
  ctx.bezierCurveTo(W * 0.3, H * 0.46, W * 0.7, H * 0.52, W, H * 0.5);
  ctx.stroke();

  // Highway Core (white)
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

  // Highway ring
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2.5;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.ellipse(W * 0.5, H * 0.5, W * 0.16, H * 0.22, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Labels
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 12px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Atlanta', W * 0.5, H * 0.54);

  ctx.fillStyle = '#64748b';
  ctx.font = '500 8px Inter, sans-serif';
  ctx.fillText('Downtown', W * 0.5, H * 0.62);
  ctx.fillText('Midtown', W * 0.52, H * 0.36);

  // Incident Marker Pins
  function drawPin(x, y, color) {
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.22;
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1.0;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  drawPin(W * 0.48, H * 0.46, '#dc2626');
  drawPin(W * 0.54, H * 0.24, '#dc2626');
  drawPin(W * 0.72, H * 0.52, '#dc2626');
  drawPin(W * 0.32, H * 0.48, '#ea580c');
  drawPin(W * 0.5,  H * 0.74, '#ea580c');
  drawPin(W * 0.65, H * 0.38, '#ea580c');
  drawPin(W * 0.44, H * 0.38, '#005bf6');
  drawPin(W * 0.58, H * 0.62, '#005bf6');
}

function drawSectorMap() {
  drawMiniMap('sectorMapCanvas');
}

/* ──────────────────────────────────────────
   FAST REAL-TIME LIVE UPDATE TICKERS
────────────────────────────────────────── */
// 1. Live Clock updating every second
function updateLiveClock() {
  const badge = document.querySelector('.live-badge');
  if (badge) {
    const timeStr = getCurrentTimeFormatted();
    badge.innerHTML = `<div class="live-dot"></div> LIVE OPERATIONS • 24/7 &nbsp;·&nbsp; ${timeStr}`;
  }
}

// 2. Dynamic response time updating every 6 seconds
function updateResponseTime() {
  const el = document.getElementById('stat-response');
  if (!el) return;
  const baseSec = Math.floor(Math.random() * 20) + 30; // 30s - 50s
  el.textContent = `6m ${baseSec}s`;

  // Dynamically wiggle the mini-bars
  const bars = document.querySelectorAll('.mini-bar');
  bars.forEach((b, i) => {
    const randH = Math.min(100, Math.max(25, 30 + i * 15 + (Math.random() * 20 - 10)));
    b.style.height = `${randH}%`;
  });
}

// 3. Live countdown for en-route units every 3 seconds
function updateDispatchETAs() {
  let changed = false;
  dispatchData.forEach(item => {
    if (item.status === 'En Route' && item.etaSeconds > 0) {
      item.etaSeconds = Math.max(0, item.etaSeconds - 4);
      const m = Math.floor(item.etaSeconds / 60);
      const s = item.etaSeconds % 60;
      item.eta = `${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
      if (item.etaSeconds === 0) {
        item.status = 'On Scene';
        item.eta = 'Arrived';
      }
      changed = true;
    }
  });
  if (changed) {
    const servicesPage = document.getElementById('page-services');
    if (servicesPage && servicesPage.classList.contains('active')) {
      renderDispTable(dispatchData);
    }
  }
}

/* ──────────────────────────────────────────
   INIT & EVENT REGISTRATION
────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  renderHomeTable(homeIncidents);
  renderIncTable(allIncidents);
  renderResolutionLog();
  renderUnitCards();
  renderDispTable(dispatchData);
  drawMiniMap('miniMapCanvas');

  // Fast Update Timers
  updateLiveClock();
  setInterval(updateLiveClock, 1000);        // Every 1s: clock
  setInterval(updateDispatchETAs, 3000);     // Every 3s: ETA countdown
  setInterval(updateResponseTime, 6000);     // Every 6s: telemetry response time

  // Mobile drawer menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('mobile-open');
    });
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('mobile-open');
      }
    });
  }

  // Navigation link click routing
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      if (page) navTo(page);
    });
  });

  // Brand click navigates home
  const brand = document.querySelector('.nav-brand');
  if (brand) {
    brand.addEventListener('click', e => {
      e.preventDefault();
      navTo('home');
    });
  }
});

window.addEventListener('resize', () => {
  drawMiniMap('miniMapCanvas');
  const incidentsPage = document.getElementById('page-incidents');
  if (incidentsPage && incidentsPage.classList.contains('active')) {
    drawSectorMap();
  }
});
