const VIEWS = ["home", "dashboard", "projects", "tasks", "team", "activity"];
const PRIMARY_VIEWS = ["home"];
let state = {
  projects: [
    {
      id: 1,
      name: "Website Redesign",
      desc: "Rework the company web experience end to end.",
      status: "Active",
    },
    {
      id: 2,
      name: "Mobile Experience",
      desc: "Native-feeling mobile app for existing customers.",
      status: "Active",
    },
    {
      id: 3,
      name: "Launch Campaign",
      desc: "Go-to-market plan for the Q4 product launch.",
      status: "Planning",
    },
    {
      id: 4,
      name: "Internal Operations",
      desc: "Streamline internal tooling and reporting.",
      status: "Review",
    },
  ],
  tasks: [
    {
      id: 1,
      name: "Design homepage",
      project: 1,
      assignee: "Nimra",
      priority: "High",
      status: "Completed",
    },
    {
      id: 2,
      name: "User research",
      project: 1,
      assignee: "Ayesha",
      priority: "Medium",
      status: "Review",
    },
    {
      id: 3,
      name: "Create mobile wireframes",
      project: 2,
      assignee: "Hamza",
      priority: "High",
      status: "Active",
    },
    {
      id: 4,
      name: "Review navigation",
      project: 1,
      assignee: "Nimra",
      priority: "Low",
      status: "Backlog",
    },
    {
      id: 5,
      name: "Write landing page copy",
      project: 3,
      assignee: "Sara",
      priority: "Medium",
      status: "Active",
    },
    {
      id: 6,
      name: "Build pricing section",
      project: 1,
      assignee: "Nimra",
      priority: "High",
      status: "Active",
    },
    {
      id: 7,
      name: "Prepare launch assets",
      project: 3,
      assignee: "Sara",
      priority: "High",
      status: "Backlog",
    },
    {
      id: 8,
      name: "Test responsive layout",
      project: 2,
      assignee: "Hamza",
      priority: "Medium",
      status: "Review",
    },
    {
      id: 9,
      name: "Set up analytics",
      project: 4,
      assignee: "Ayesha",
      priority: "Low",
      status: "Backlog",
    },
    {
      id: 10,
      name: "Onboarding flow",
      project: 2,
      assignee: "Hamza",
      priority: "Medium",
      status: "Completed",
    },
    {
      id: 11,
      name: "Audit design system",
      project: 1,
      assignee: "Nimra",
      priority: "Low",
      status: "Completed",
    },
    {
      id: 12,
      name: "Draft email sequence",
      project: 3,
      assignee: "Sara",
      priority: "Medium",
      status: "Backlog",
    },
    {
      id: 13,
      name: "Fix checkout bug",
      project: 2,
      assignee: "Ayesha",
      priority: "High",
      status: "Active",
    },
    {
      id: 14,
      name: "Internal dashboard cleanup",
      project: 4,
      assignee: "Bilal",
      priority: "Low",
      status: "Active",
    },
    {
      id: 15,
      name: "Team retro notes",
      project: 4,
      assignee: "Bilal",
      priority: "Low",
      status: "Completed",
    },
    {
      id: 16,
      name: "Competitor audit",
      project: 3,
      assignee: "Sara",
      priority: "Medium",
      status: "Review",
    },
  ],
  team: [
    {
      name: "Nimra Sultan",
      role: "Frontend",
      status: "Working",
      color: "#6D5DFB",
    },
    {
      name: "Ayesha Khan",
      role: "Product",
      status: "Working",
      color: "#4C3BCF",
    },
    {
      name: "Hamza Ali",
      role: "Design",
      status: "Available",
      status2: "",
      color: "#17151A",
    },
    { name: "Sara Ahmed", role: "Marketing", status: "Away", color: "#A6720B" },
    {
      name: "Bilal Raza",
      role: "Operations",
      status: "Offline",
      color: "#77727F",
    },
  ],
  activities: [
    { text: 'Nimra completed "Design homepage"', time: "10 minutes ago" },
    { text: 'Ayesha moved "User research" to Review', time: "24 minutes ago" },
    { text: 'Hamza created "Mobile navigation"', time: "1 hour ago" },
  ],
};
let currentView = "dashboard",
  currentFilter = "All";

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("frontierx"));
    if (saved) {
      state.tasks = saved.tasks || state.tasks;
      state.team = saved.team || state.team;
    }
  } catch (e) {}
}
function saveState() {
  try {
    localStorage.setItem(
      "frontierx",
      JSON.stringify({ tasks: state.tasks, team: state.team }),
    );
  } catch (e) {}
}
function addActivity(text) {
  state.activities.unshift({ text, time: "Just now" });
  saveState();
}
function projectName(id) {
  return state.projects.find((p) => p.id === id)?.name || "";
}
function projectProgress(p) {
  const ts = state.tasks.filter((t) => t.project === p.id);
  const done = ts.filter((t) => t.status === "Completed").length;
  return {
    total: ts.length,
    done,
    pct: ts.length ? Math.round((done / ts.length) * 100) : 0,
  };
}

function projectImage(p, idx) {
  const arts = [
    `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="g0" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#241B45"/><stop offset="1" stop-color="#120C28"/></linearGradient></defs>
      <rect width="400" height="260" fill="url(#g0)"/>
      <g transform="translate(80,55)">
        <polygon points="120,0 240,50 120,100 0,50" fill="none" stroke="#9B7CFF" stroke-width="1.5" opacity=".8"/>
        <polygon points="120,20 220,60 120,100 20,60" fill="#3A2C74" opacity=".55"/>
        <line x1="120" y1="20" x2="120" y2="140" stroke="#9B7CFF" stroke-width="1" opacity=".5"/>
        <circle cx="120" cy="20" r="4" fill="#E6469C"/>
        <circle cx="220" cy="60" r="4" fill="#4C8DFF"/>
        <circle cx="20" cy="60" r="4" fill="#7C5CFF"/>
      </g>
      <circle cx="330" cy="60" r="3" fill="#E6469C"/><circle cx="60" cy="200" r="3" fill="#4C8DFF"/>
    </svg>`,
    `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1B2A4A"/><stop offset="1" stop-color="#0D1526"/></linearGradient></defs>
      <rect width="400" height="260" fill="url(#g1)"/>
      <rect x="165" y="40" width="70" height="150" rx="10" fill="#1E2B52" stroke="#6FA8FF" stroke-width="1.5"/>
      <rect x="176" y="56" width="48" height="90" rx="3" fill="#4C8DFF" opacity=".35"/>
      <rect x="270" y="70" width="60" height="60" fill="#22315C" stroke="#7C5CFF" stroke-width="1" opacity=".8"/>
      <rect x="70" y="120" width="55" height="55" fill="#22315C" stroke="#E6469C" stroke-width="1" opacity=".8"/>
      <circle cx="200" cy="30" r="3" fill="#4C8DFF"/><circle cx="300" cy="180" r="3" fill="#7C5CFF"/>
      <line x1="235" y1="90" x2="270" y2="90" stroke="#4C8DFF" stroke-width="1" opacity=".6"/>
      <line x1="165" y1="150" x2="125" y2="150" stroke="#E6469C" stroke-width="1" opacity=".6"/>
    </svg>`,
    `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="g2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3A1740"/><stop offset="1" stop-color="#140A28"/></linearGradient></defs>
      <rect width="400" height="260" fill="url(#g2)"/>
      <polygon points="200,40 225,150 200,180 175,150" fill="#7C5CFF"/>
      <polygon points="200,150 225,150 235,200 200,190" fill="#E6469C" opacity=".85"/>
      <polygon points="200,150 175,150 165,200 200,190" fill="#4C8DFF" opacity=".85"/>
      <circle cx="130" cy="80" r="4" fill="#E6469C"/><circle cx="280" cy="70" r="3" fill="#4C8DFF"/>
      <circle cx="310" cy="150" r="5" fill="#7C5CFF"/><circle cx="90" cy="170" r="3" fill="#9B7CFF"/>
    </svg>`,
    `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="g3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1A2036"/><stop offset="1" stop-color="#0C0F1C"/></linearGradient></defs>
      <rect width="400" height="260" fill="url(#g3)"/>
      <g stroke="#3A4468" stroke-width="1" opacity=".4">${Array.from({
        length: 6,
      })
        .map((_, i) => `<line x1="${i * 70}" y1="0" x2="${i * 70}" y2="260"/>`)
        .join("")}</g>
      <rect x="150" y="60" width="100" height="34" rx="4" fill="#22315C" stroke="#7C5CFF"/>
      <rect x="150" y="100" width="100" height="34" rx="4" fill="#22315C" stroke="#4C8DFF"/>
      <rect x="150" y="140" width="100" height="34" rx="4" fill="#22315C" stroke="#E6469C"/>
      <circle cx="240" cy="77" r="3" fill="#7C5CFF"/><circle cx="240" cy="117" r="3" fill="#4C8DFF"/><circle cx="240" cy="157" r="3" fill="#E6469C"/>
    </svg>`,
  ];
  return arts[idx % arts.length];
}

function buildNav() {
  const labels = {
    home: "Home",
    dashboard: "Dashboard",
    projects: "Projects",
    tasks: "Tasks",
    team: "Team",
    activity: "Activity",
  };
  document.getElementById("navLinks").innerHTML = VIEWS.map((v, i) => {
    const kind = PRIMARY_VIEWS.includes(v) ? "primary" : "secondary";
    const divider =
      v === "dashboard" ? `<span class="nav-divider"></span>` : "";
    return `${divider}<li class="${kind}"><button class="${v === currentView ? "active" : ""}" onclick="showView('${v}')">${labels[v]}</button></li>`;
  }).join("");
  document.getElementById("mobileMenu").innerHTML = VIEWS.map(
    (v) =>
      `<button onclick="showView('${v}');document.getElementById('mobileMenu').classList.remove('open')">${labels[v]}</button>`,
  ).join("");
}
function showView(v) {
  currentView = v;
  document
    .querySelectorAll(".view")
    .forEach((el) => el.classList.remove("active"));
  document.getElementById("view-" + v).classList.add("active");
  buildNav();
  renderAll();
}
function quickSearch(val) {
  showView("tasks");
  document.getElementById("taskSearch").value = val;
  renderTasks();
}

function renderDashboard() {
  document.getElementById("todayDate").textContent =
    new Date().toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  const total = state.tasks.length;
  const completed = state.tasks.filter((t) => t.status === "Completed").length;
  const active = state.tasks.filter((t) => t.status === "Active").length;
  const overall = total ? Math.round((completed / total) * 100) : 0;
  const rows = [
    ["Total tasks", total],
    ["Completed", completed],
    ["Active", active],
    ["Overall progress", overall + "%"],
  ];
  document.getElementById("statsGrid").innerHTML = rows
    .map(
      ([l, v]) =>
        `<div class="stat-row"><span class="stat-num serif">${v}</span><span class="stat-label">${l}</span></div>`,
    )
    .join("");
  document.getElementById("dashProgress").innerHTML = state.projects
    .map((p) => {
      const pr = projectProgress(p);
      return `<div class="progress-row"><div class="progress-top"><span>${p.name}</span><span>${pr.pct}%</span></div><div class="bar-track"><div class="bar-fill" style="width:${pr.pct}%"></div></div></div>`;
    })
    .join("");
  document.getElementById("dashActivity").innerHTML = state.activities
    .slice(0, 5)
    .map(
      (a) =>
        `<div class="timeline-item">${a.text}<div class="timeline-time">${a.time}</div></div>`,
    )
    .join("");
}

function renderProjects() {
  document.getElementById("projectsList").innerHTML = state.projects
    .map((p, i) => {
      const pr = projectProgress(p);
      return `<div class="project-row">
      <div class="project-art">${projectImage(p, i)}</div>
      <div>
        <div class="project-eyebrow">${p.status.toUpperCase()} · ${pr.total} TASKS</div>
        <div class="project-name serif">${p.name}</div>
        <div class="project-desc">${p.desc}</div>
        <div class="project-progress-top"><span>${pr.done} of ${pr.total} completed</span><span>${pr.pct}%</span></div>
        <div class="bar-track"><div class="bar-fill" style="width:${pr.pct}%"></div></div>
      </div>
    </div>`;
    })
    .join("");
}

function setFilter(f) {
  currentFilter = f;
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.toggle("active", b.dataset.f === f));
  renderTasks();
}
function renderTasks() {
  const q = (document.getElementById("taskSearch")?.value || "").toLowerCase();
  let list = state.tasks.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      projectName(t.project).toLowerCase().includes(q) ||
      t.assignee.toLowerCase().includes(q),
  );
  const cols = ["Backlog", "Active", "Review", "Completed"];
  document.getElementById("taskMatrix").innerHTML = cols
    .map((col) => {
      if (!(currentFilter === "All" || currentFilter === col))
        return `<div class="matrix-col"><h3>${col}</h3></div>`;
      const items = list.filter((t) => t.status === col);
      const body = items.length
        ? items
            .map(
              (t) => `
      <div class="task-card">
        <div class="task-title">${t.name}</div>
        <div class="task-meta">${projectName(t.project)} · ${t.assignee} <span class="pill ${t.priority.toLowerCase()}">${t.priority}</span></div>
        <select onchange="moveTask(${t.id},this.value)">
          ${cols.map((c) => `<option value="${c}" ${c === t.status ? "selected" : ""}>${c}</option>`).join("")}
        </select>
      </div>`,
            )
            .join("")
        : `<div class="empty">No tasks found</div>`;
      return `<div class="matrix-col"><h3>${col} (${items.length})</h3>${body}</div>`;
    })
    .join("");
}
function moveTask(id, status) {
  const t = state.tasks.find((t) => t.id === id);
  if (!t) return;
  t.status = status;
  addActivity(
    status === "Completed"
      ? `You completed "${t.name}"`
      : `You moved "${t.name}" to ${status}`,
  );
  saveState();
  renderAll();
}

function renderTeam() {
  document.getElementById("teamGrid").innerHTML = state.team
    .map((m, i) => {
      const initials = m.name
        .split(" ")
        .map((n) => n[0])
        .join("");
      const count = state.tasks.filter(
        (t) => t.assignee === m.name.split(" ")[0] && t.status !== "Completed",
      ).length;
      return `<div class="member-block">
      <div class="avatar-block grad-${i % 5}">${initials}</div>
      <div><strong>${m.name}</strong><div class="member-role">${m.role}</div></div>
      <div class="status-line"><span class="dot ${m.status}"></span>${m.status} · ${count} active tasks</div>
      <select class="member-select" onchange="setStatus('${m.name}',this.value)">
        ${["Working", "Available", "Away", "Offline"].map((s) => `<option ${s === m.status ? "selected" : ""}>${s}</option>`).join("")}
      </select>
    </div>`;
    })
    .join("");
}
function setStatus(name, status) {
  const m = state.team.find((m) => m.name === name);
  m.status = status;
  addActivity(`${name.split(" ")[0]} is now ${status}`);
  saveState();
  renderAll();
}

function renderActivity() {
  document.getElementById("activityList").innerHTML = state.activities
    .map(
      (a) =>
        `<div class="timeline-item">${a.text}<div class="timeline-time">${a.time}</div></div>`,
    )
    .join("");
}

function openModal() {
  document.getElementById("fProject").innerHTML = state.projects
    .map((p) => `<option value="${p.id}">${p.name}</option>`)
    .join("");
  document.getElementById("fAssignee").innerHTML = state.team
    .map((m) => `<option>${m.name.split(" ")[0]}</option>`)
    .join("");
  document.getElementById("fName").value = "";
  document.getElementById("modalOverlay").classList.add("open");
}
function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
}
function addTask() {
  const name = document.getElementById("fName").value.trim();
  if (!name) return;
  const project = parseInt(document.getElementById("fProject").value);
  const assignee = document.getElementById("fAssignee").value;
  const priority = document.getElementById("fPriority").value;
  const id = Math.max(0, ...state.tasks.map((t) => t.id)) + 1;
  state.tasks.push({
    id,
    name,
    project,
    assignee,
    priority,
    status: "Backlog",
  });
  addActivity(`${assignee} created "${name}"`);
  closeModal();
  saveState();
  renderAll();
}

function renderHome() {
  const el = document.getElementById("homeStrip");
  if (!el) return;
  const totalTasks = state.tasks.length;
  const completed = state.tasks.filter((t) => t.status === "Completed").length;
  const rows = [
    [state.projects.length, "Active projects"],
    [totalTasks, "Tasks tracked"],
    [completed, "Completed"],
    [state.team.length, "Team members"],
  ];
  el.innerHTML = rows
    .map(
      ([v, l]) =>
        `<div class="stat-row"><span class="stat-num serif">${v}</span><span class="stat-label">${l}</span></div>`,
    )
    .join("");
}

function renderAll() {
  renderHome();
  renderDashboard();
  renderProjects();
  renderTasks();
  renderTeam();
  renderActivity();
}
loadState();
buildNav();
showView("home");
