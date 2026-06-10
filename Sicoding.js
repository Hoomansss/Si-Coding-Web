// si-coding.js - JavaScript untuk Platform Belajar Bahasa C (Orange & White Theme)

// ======================== DATA MODUL ========================
const modules = [
    { id: 1, title: "Dasar & Variabel", desc: "Memahami syntax dasar, tipe data, deklarasi variabel", icon: "fa-solid fa-cube", duration: "25 menit", defaultCode: '#include <stdio.h>\n\nint main() {\n    int umur = 20;\n    printf("Umur: %d\\n", umur);\n    return 0;\n}', hint: "Gunakan %d untuk integer, %f untuk float.", quiz: [
        { q: "Apa fungsi `#include <stdio.h>`?", opts: ["Menjalankan program", "Menyertakan library input-output", "Mendeklarasikan variabel"], answer: 1 },
        { q: "Tipe data untuk bilangan bulat?", opts: ["float", "char", "int"], answer: 2 },
        { q: "Simbol komentar satu baris di C?", opts: ["//", "/* */", "#"], answer: 0 }
    ] },
    { id: 2, title: "Percabangan (if-else)", desc: "Logika kondisi if, else if, else", icon: "fa-solid fa-code-branch", duration: "30 menit", defaultCode: '#include <stdio.h>\n\nint main() {\n    int nilai = 85;\n    if(nilai >= 80) printf("Lulus\\n");\n    else printf("Remidi\\n");\n    return 0;\n}', hint: "Gunakan if untuk percabangan.", quiz: [
        { q: "Output jika nilai = 70? (if nilai>=80)", opts: ["Lulus", "Remidi", "Error"], answer: 1 },
        { q: "Operator logika AND di C?", opts: ["&", "&&", "and"], answer: 1 },
        { q: "else if digunakan untuk?", opts: ["Perulangan", "Percabangan bertingkat", "Deklarasi"], answer: 1 }
    ] },
    { id: 3, title: "Perulangan (Loops)", desc: "for, while, do-while", icon: "fa-solid fa-repeat", duration: "35 menit", defaultCode: '#include <stdio.h>\n\nint main() {\n    for(int i=1; i<=3; i++) {\n        printf("Iterasi %d\\n", i);\n    }\n    return 0;\n}', hint: "Hati-hati infinite loop!", quiz: [
        { q: "Perulangan for (i=0;i<3;i++) berapa kali?", opts: ["2", "3", "4"], answer: 1 },
        { q: "Keyword untuk keluar dari loop?", opts: ["break", "exit", "continue"], answer: 0 },
        { q: "Loop yang menjamin minimal 1x eksekusi?", opts: ["for", "while", "do-while"], answer: 2 }
    ] },
    { id: 4, title: "Fungsi", desc: "Membuat fungsi, parameter, return", icon: "fa-solid fa-function", duration: "30 menit", defaultCode: '#include <stdio.h>\n\nint tambah(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int hasil = tambah(5,3);\n    printf("Hasil: %d\\n", hasil);\n    return 0;\n}', hint: "Fungsi dapat mengembalikan nilai dengan return.", quiz: [
        { q: "Keyword mengembalikan nilai?", opts: ["return", "void", "break"], answer: 0 },
        { q: "Tipe data fungsi yang tidak mengembalikan nilai?", opts: ["int", "float", "void"], answer: 2 },
        { q: "Parameter fungsi bersifat?", opts: ["Lokal", "Global", "Statis"], answer: 0 }
    ] },
    { id: 5, title: "Array", desc: "Array satu dimensi dan pengolahannya", icon: "fa-solid fa-table-cells", duration: "30 menit", defaultCode: '#include <stdio.h>\n\nint main() {\n    int angka[3] = {10,20,30};\n    printf("Elemen pertama: %d\\n", angka[0]);\n    return 0;\n}', hint: "Indeks array dimulai dari 0.", quiz: [
        { q: "Indeks pertama array?", opts: ["1", "0", "-1"], answer: 1 },
        { q: "Deklarasi array 5 integer benar?", opts: ["int arr[5];", "array int[5];", "int arr(5);"], answer: 0 },
        { q: "Mengakses elemen ke-3?", opts: ["arr[2]", "arr[3]", "arr(3)"], answer: 0 }
    ] },
    { id: 6, title: "Pointer & String", desc: "Konsep pointer dan manipulasi string", icon: "fa-solid fa-memory", duration: "40 menit", defaultCode: '#include <stdio.h>\n\nint main() {\n    char nama[] = "Si Coding";\n    printf("Halo %s\\n", nama);\n    return 0;\n}', hint: "Pointer menyimpan alamat memori.", quiz: [
        { q: "Operator alamat di C?", opts: ["*", "&", "#"], answer: 1 },
        { q: "String diakhiri dengan?", opts: ["\\n", "\\0", "\\t"], answer: 1 },
        { q: "Deklarasi pointer ke integer?", opts: ["int *ptr;", "ptr int;", "int& ptr;"], answer: 0 }
    ] }
];

// ======================== STATE ========================
let state = {
    moduleProgress: {},
    streakDates: [],
    totalTimeSpent: 0,
    currentQuizModule: null,
    quizAnswers: [],
    quizTimer: null,
    quizIndex: 0
};

// ======================== HELPERS ========================
function loadState() {
    const saved = localStorage.getItem("cState");
    if (saved) Object.assign(state, JSON.parse(saved));
    modules.forEach(m => {
        if (!state.moduleProgress[m.id]) {
            state.moduleProgress[m.id] = {
                completed: false,
                quizScore: 0,
                code: m.defaultCode,
                notes: "",
                bookmarked: false
            };
        }
    });
}

function saveState() {
    localStorage.setItem("cState", JSON.stringify(state));
}

function showToast(msg, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="fa-regular fa-bell"></i> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

function triggerConfetti() {
    const container = document.getElementById("confettiContainer");
    if (!container) return;
    for (let i = 0; i < 60; i++) {
        const piece = document.createElement("div");
        piece.style.position = "absolute";
        piece.style.width = Math.random() * 8 + 5 + "px";
        piece.style.height = piece.style.width;
        piece.style.backgroundColor = ["#f97316", "#ea580c", "#fb923c"][Math.floor(Math.random() * 3)];
        piece.style.left = Math.random() * 100 + "%";
        piece.style.top = "-20px";
        piece.style.animation = "fall 2s linear forwards";
        container.appendChild(piece);
        setTimeout(() => piece.remove(), 2000);
    }
}

// ======================== RENDER MODULES ========================
function renderModules() {
    const grid = document.getElementById("modulesGrid");
    if (!grid) return;
    grid.innerHTML = modules.map((m, idx) => {
        const prog = state.moduleProgress[m.id];
        const prevCompleted = idx === 0 || state.moduleProgress[modules[idx - 1].id]?.completed;
        const locked = !prevCompleted && idx !== 0;
        return `<div class="module-card ${prog.completed ? 'completed' : ''} ${locked ? 'locked' : ''}" data-id="${m.id}">
                    <div style="display:flex; justify-content:space-between;">
                        <span class="module-card__number">MODUL ${m.id}</span>
                        <span class="bookmark-star ${prog.bookmarked ? 'bookmarked' : ''}" onclick="toggleBookmark(${m.id}, this)">
                            <i class="fa-solid fa-star"></i>
                        </span>
                    </div>
                    <h3 style="margin:8px 0"><i class="${m.icon}"></i> ${m.title}</h3>
                    <p style="color:var(--gray-600);">${m.desc}</p>
                    <div class="progress-bar"><div class="progress-fill" style="width:${prog.completed ? 100 : 0}%"></div></div>
                    <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:12px;">
                        <button class="btn btn-primary btn-sm" onclick="openSandbox(${m.id})" ${locked ? 'disabled' : ''}>
                            <i class="fa-solid fa-code"></i> Sandbox
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="openQuiz(${m.id})" ${locked ? 'disabled' : ''}>
                            <i class="fa-regular fa-circle-question"></i> Quiz
                        </button>
                    </div>
                </div>`;
    }).join('');
}

// ======================== SANDBOX ========================
window.openSandbox = function(id) {
    const mod = modules.find(m => m.id === id);
    const sandboxOverlay = document.getElementById("sandboxOverlay");
    if (!sandboxOverlay) return;
    document.getElementById("sandboxTitle").innerHTML = `🧪 Sandbox: ${mod.title}`;
    document.getElementById("codeEditor").value = state.moduleProgress[id].code || mod.defaultCode;
    document.getElementById("hintContent").innerHTML = mod.hint;
    sandboxOverlay.dataset.moduleId = id;
    sandboxOverlay.classList.add("active");
};

function setupSandboxEvents() {
    const closeBtn = document.getElementById("closeSandbox");
    const runBtn = document.getElementById("runCodeBtn");
    const resetBtn = document.getElementById("resetCodeBtn");
    if (closeBtn) closeBtn.onclick = () => document.getElementById("sandboxOverlay").classList.remove("active");
    if (runBtn) {
        runBtn.onclick = () => {
            const code = document.getElementById("codeEditor").value;
            const outputDiv = document.getElementById("consoleOutput");
            // Simulasi output untuk kode C (menangkap printf)
            const outputs = [];
            const lines = code.split("\n");
            for (const line of lines) {
                const match = line.match(/printf\(["'](.*?)["']/);
                if (match) outputs.push(match[1].replace(/\\n/g, ''));
            }
            outputDiv.innerHTML = outputs.length ? outputs.join("\n") : "(Simulasi: kode C berhasil dianalisis. Gunakan kompiler lokal untuk eksekusi penuh.)";
            const mid = parseInt(document.getElementById("sandboxOverlay").dataset.moduleId);
            if (mid && state.moduleProgress[mid]) {
                state.moduleProgress[mid].code = code;
                saveState();
            }
        };
    }
    if (resetBtn) {
        resetBtn.onclick = () => {
            const mid = parseInt(document.getElementById("sandboxOverlay").dataset.moduleId);
            const mod = modules.find(m => m.id === mid);
            if (mod) document.getElementById("codeEditor").value = mod.defaultCode;
            showToast("Kode direset ke default");
        };
    }
    const hintBox = document.getElementById("hintBox");
    if (hintBox) hintBox.onclick = () => alert(document.getElementById("hintContent").innerText);
}

// ======================== QUIZ ========================
window.openQuiz = function(id) {
    state.currentQuizModule = id;
    state.quizIndex = 0;
    state.quizAnswers = [];
    renderQuizQuestion();
    document.getElementById("quizOverlay").classList.add("active");
};

function renderQuizQuestion() {
    const mod = modules.find(m => m.id === state.currentQuizModule);
    const q = mod.quiz[state.quizIndex];
    const modal = document.getElementById("quizModal");
    if (!modal) return;
    modal.innerHTML = `<div class="modal-header">
                            <h3>📝 Quiz: ${mod.title}</h3>
                            <button class="btn btn-ghost btn-sm" onclick="closeQuiz()">&times;</button>
                       </div>
                       <div class="modal-body">
                            <p><strong>Pertanyaan ${state.quizIndex + 1}/${mod.quiz.length}</strong></p>
                            <p style="margin:16px 0">${q.q}</p>
                            <div id="quizOptions">
                                ${q.opts.map((opt, i) => `<button class="quiz-option" onclick="selectAnswer(${i})">${String.fromCharCode(65 + i)}. ${opt}</button>`).join('')}
                            </div>
                       </div>`;
}

window.selectAnswer = function(ans) {
    const mod = modules.find(m => m.id === state.currentQuizModule);
    const correct = mod.quiz[state.quizIndex].answer;
    state.quizAnswers.push(ans);
    if (state.quizIndex + 1 < mod.quiz.length) {
        state.quizIndex++;
        renderQuizQuestion();
    } else {
        let score = 0;
        for (let i = 0; i < mod.quiz.length; i++) {
            if (state.quizAnswers[i] === mod.quiz[i].answer) score++;
        }
        const percent = Math.round((score / mod.quiz.length) * 100);
        const passed = percent >= 70;
        if (state.moduleProgress[state.currentQuizModule]) {
            state.moduleProgress[state.currentQuizModule].quizScore = percent;
            if (passed) state.moduleProgress[state.currentQuizModule].completed = true;
        }
        const today = new Date().toISOString().split('T')[0];
        if (!state.streakDates.includes(today)) state.streakDates.push(today);
        saveState();
        renderModules();
        renderDashboard();
        const modal = document.getElementById("quizModal");
        if (modal) {
            modal.innerHTML = `<div class="modal-body">
                                    <h3>${passed ? "🎉 Selamat!" : "😔 Coba lagi"}</h3>
                                    <p>Skor Anda: ${percent}%</p>
                                    <button class="btn btn-primary" onclick="closeQuiz()">Tutup</button>
                               </div>`;
        }
        if (passed) triggerConfetti();
        const allCompleted = modules.every(m => state.moduleProgress[m.id]?.completed);
        if (passed && allCompleted) {
            setTimeout(() => {
                const certContent = document.getElementById("certificateContent");
                if (certContent) {
                    certContent.innerHTML = `<div style="padding:32px; text-align:center;">
                                                <i class="fa-solid fa-certificate" style="font-size:4rem; color:var(--orange)"></i>
                                                <h2>Sertifikat Kelulusan</h2>
                                                <p>Selamat! Anda telah menyelesaikan seluruh modul C Programming.</p>
                                                <button class="btn btn-primary" onclick="document.getElementById('certificateOverlay').classList.remove('active')">Tutup</button>
                                             </div>`;
                    document.getElementById("certificateOverlay").classList.add("active");
                }
                triggerConfetti();
            }, 500);
        }
    }
};

window.closeQuiz = function() {
    document.getElementById("quizOverlay").classList.remove("active");
};

// ======================== DASHBOARD ========================
function renderDashboard() {
    const completed = modules.filter(m => state.moduleProgress[m.id]?.completed).length;
    const total = modules.length;
    let totalScore = 0;
    modules.forEach(m => { totalScore += state.moduleProgress[m.id]?.quizScore || 0; });
    const avg = Math.round(totalScore / total);
    let streak = 0;
    if (state.streakDates.length) {
        const sorted = [...state.streakDates].sort().reverse();
        streak = 1;
        for (let i = 1; i < sorted.length; i++) {
            const diff = (new Date(sorted[i - 1]) - new Date(sorted[i])) / (1000 * 60 * 60 * 24);
            if (Math.round(diff) === 1) streak++;
            else break;
        }
    }
    const dashboardGrid = document.getElementById("dashboardGrid");
    if (dashboardGrid) {
        dashboardGrid.innerHTML = `<div class="dashboard-card">
                                        <h3>📘 Progress</h3>
                                        <div style="font-size:2rem; font-weight:800; color:var(--orange)">${completed}/${total}</div>
                                        <p>Modul Selesai</p>
                                   </div>
                                   <div class="dashboard-card">
                                        <h3>⭐ Rata-rata Skor</h3>
                                        <div style="font-size:2rem; font-weight:800">${avg}%</div>
                                   </div>
                                   <div class="dashboard-card">
                                        <h3>🔥 Streak</h3>
                                        <div style="font-size:2rem; font-weight:800; color:var(--orange)">${streak}</div>
                                        <p>hari berturut-turut</p>
                                   </div>`;
    }
}

// ======================== LEADERBOARD ========================
function renderLeaderboard() {
    const dummy = [
        { name: "Budi Santoso", points: 2850, modules: 6, streak: 21 },
        { name: "Siti Aminah", points: 2720, modules: 6, streak: 18 },
        { name: "Andi Wijaya", points: 2590, modules: 5, streak: 15 },
        { name: "Cynthia Dewi", points: 2410, modules: 5, streak: 14 },
        { name: "Rizki Maulana", points: 2280, modules: 4, streak: 12 }
    ];
    const tbody = document.getElementById("leaderboardBody");
    if (tbody) {
        tbody.innerHTML = dummy.map((u, i) => `<tr>
                                                    <td>${i + 1}</td>
                                                    <td><strong>${u.name}</strong></td>
                                                    <td>${u.points}</td>
                                                    <td>${u.modules}/6</td>
                                                    <td>🔥 ${u.streak}</td>
                                                </tr>`).join('');
    }
}

// ======================== BOOKMARK & NOTES ========================
window.toggleBookmark = function(id, el) {
    state.moduleProgress[id].bookmarked = !state.moduleProgress[id].bookmarked;
    if (el) el.classList.toggle("bookmarked");
    saveState();
    updateBookmarkList();
    showToast(state.moduleProgress[id].bookmarked ? "Modul ditandai" : "Bookmark dihapus");
};

function updateBookmarkList() {
    const container = document.getElementById("bookmarkList");
    if (!container) return;
    const bookmarked = modules.filter(m => state.moduleProgress[m.id]?.bookmarked);
    if (bookmarked.length) {
        container.innerHTML = bookmarked.map(m => `<div>⭐ Modul ${m.id}: ${m.title}</div>`).join('');
    } else {
        container.innerHTML = "Belum ada bookmark";
    }
}

function setupNotes() {
    const notesToggle = document.getElementById("notesToggle");
    const notesPanel = document.getElementById("notesPanel");
    const closeNotes = document.getElementById("closeNotesPanel");
    const saveNotes = document.getElementById("saveNotesBtn");
    const notesTextarea = document.getElementById("notesTextarea");
    const notesModuleLabel = document.getElementById("notesModuleLabel");
    let activeNotesModule = 1;

    if (notesToggle) {
        notesToggle.onclick = () => {
            notesPanel.classList.toggle("open");
            if (notesPanel.classList.contains("open")) {
                const firstModule = modules[0];
                if (firstModule) {
                    activeNotesModule = firstModule.id;
                    notesModuleLabel.innerText = firstModule.title;
                    notesTextarea.value = state.moduleProgress[firstModule.id]?.notes || "";
                }
            }
        };
    }
    if (closeNotes) closeNotes.onclick = () => notesPanel.classList.remove("open");
    if (saveNotes) {
        saveNotes.onclick = () => {
            if (state.moduleProgress[activeNotesModule]) {
                state.moduleProgress[activeNotesModule].notes = notesTextarea.value;
                saveState();
                showToast("Catatan tersimpan", "success");
            }
        };
    }
    // Update active module saat memilih dari mana? Bisa via tombol di modul nanti.
    // Untuk demo, kita sediakan cara manual via modul card (opsional)
}

// ======================== EXPORT / RESET ========================
function setupExportReset() {
    const exportBtn = document.getElementById("exportBtn");
    const resetBtn = document.getElementById("resetBtn");
    if (exportBtn) {
        exportBtn.onclick = () => {
            const dataStr = JSON.stringify(state, null, 2);
            const blob = new Blob([dataStr], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "sicoding-c-progress.json";
            a.click();
            URL.revokeObjectURL(url);
            showToast("Progress diekspor", "success");
        };
    }
    if (resetBtn) {
        resetBtn.onclick = () => {
            if (confirm("⚠️ Reset semua progress? Tindakan ini tidak bisa dibatalkan.")) {
                modules.forEach(m => {
                    state.moduleProgress[m.id] = {
                        completed: false,
                        quizScore: 0,
                        code: m.defaultCode,
                        notes: "",
                        bookmarked: false
                    };
                });
                state.streakDates = [];
                state.totalTimeSpent = 0;
                saveState();
                renderModules();
                renderDashboard();
                updateBookmarkList();
                showToast("Semua progress berhasil direset", "info");
            }
        };
    }
}

// ======================== ANIMATIONS & AUTO-SAVE ========================
function animateStats() {
    const statNumbers = document.querySelectorAll("[data-count]");
    statNumbers.forEach(el => {
        const target = parseInt(el.dataset.count, 10);
        let current = 0;
        const step = Math.ceil(target / 30);
        const interval = setInterval(() => {
            current += step;
            if (current >= target) {
                el.innerText = target;
                clearInterval(interval);
            } else {
                el.innerText = current;
            }
        }, 30);
    });
}

function startAutoSave() {
    setInterval(() => {
        state.totalTimeSpent += 30;
        saveState();
    }, 30000);
}

// ======================== INITIALIZATION ========================
function init() {
    loadState();
    renderModules();
    renderDashboard();
    renderLeaderboard();
    updateBookmarkList();
    setupSandboxEvents();
    setupNotes();
    setupExportReset();
    animateStats();
    startAutoSave();

    // Demo login/register (simulasi)
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    if (loginBtn) loginBtn.onclick = () => showToast("Fitur login segera hadir");
    if (registerBtn) registerBtn.onclick = () => showToast("Pendaftaran gratis, selamat belajar!");

    // Pastikan navigasi smooth
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Jalankan saat DOM siap
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}