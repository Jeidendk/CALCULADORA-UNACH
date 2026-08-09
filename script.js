/* =========================================================
   1. MODO OSCURO
   ========================================================= */
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const themeToggleBtn = document.getElementById('theme-toggle');

function updateThemeIcons() {
    if (document.documentElement.classList.contains('dark')) {
        themeToggleLightIcon.classList.remove('hidden');
        themeToggleDarkIcon.classList.add('hidden');
    } else {
        themeToggleDarkIcon.classList.remove('hidden');
        themeToggleLightIcon.classList.add('hidden');
    }
}

if (localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}
updateThemeIcons();

themeToggleBtn.addEventListener('click', function () {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('color-theme',
        document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    updateThemeIcons();
});

/* =========================================================
   2. MENÚ HAMBURGUESA + CAMBIO DE PANTALLA
   ========================================================= */
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const menuDrawer = document.getElementById('menu-drawer');
const menuBackdrop = document.getElementById('menu-backdrop');
const navBtns = document.querySelectorAll('.nav-btn');
const screens = document.querySelectorAll('.screen');

function openMenu() {
    menuDrawer.classList.add('open');
    menuBackdrop.classList.add('open');
}
function closeMenu() {
    menuDrawer.classList.remove('open');
    menuBackdrop.classList.remove('open');
}

menuToggle.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuBackdrop.addEventListener('click', closeMenu);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

function showScreen(name) {
    screens.forEach(s => s.classList.toggle('hidden', s.id !== 'screen-' + name));
    navBtns.forEach(b => b.classList.toggle('active', b.dataset.screen === name));
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        showScreen(btn.dataset.screen);
        closeMenu();
    });
});

// Pantalla inicial
showScreen('calculadora');

/* =========================================================
   3. CALCULADORA DE PUNTAJE
   ========================================================= */
const inputAntecedentes = document.getElementById('input-antecedentes');
const inputAciertos = document.getElementById('input-aciertos');
const resultadoAntecedentes = document.getElementById('resultado-antecedentes');
const resultadoEvaluacion = document.getElementById('resultado-evaluacion');
const notaFinal = document.getElementById('nota-final');

inputAntecedentes.addEventListener('keydown', (e) => {
    if (['-', '+', 'e', 'E'].includes(e.key)) e.preventDefault();
});
inputAciertos.addEventListener('keydown', (e) => {
    if (['-', '+', 'e', 'E', '.', ','].includes(e.key)) e.preventDefault();
});

inputAntecedentes.addEventListener('input', function () {
    let valor = parseFloat(this.value);
    if (valor < 0) this.value = 0;
    if (valor > 10) this.value = 10;
    calcularPuntajes();
});
inputAciertos.addEventListener('input', function () {
    let valor = parseInt(this.value);
    if (valor < 0) this.value = 0;
    if (valor > 80) this.value = 80;
    calcularPuntajes();
});

function fmt(n) {
    return Number.isInteger(n) ? n : n.toFixed(2);
}

function calcularPuntajes() {
    const antecedentes = parseFloat(inputAntecedentes.value) || 0;
    const aciertos = parseInt(inputAciertos.value) || 0;

    const calcAntecedentes = antecedentes * 50;          // 50%
    const calcEvaluacion = (aciertos * 500) / 80;        // 50%
    const totalFinal = calcAntecedentes + calcEvaluacion;

    resultadoAntecedentes.textContent = fmt(calcAntecedentes);
    resultadoEvaluacion.textContent = fmt(calcEvaluacion);
    notaFinal.textContent = fmt(totalFinal);
}

calcularPuntajes();

/* =========================================================
   4. PUNTAJES REFERENCIALES UNACH 2026
   Fuente: La Prensa — Primer periodo 2026 (referenciales)
   ========================================================= */
const FASES = [
    'Registro nacional en la plataforma del Gobierno.',
    'Inscripción en la universidad donde se rendirá la prueba.',
    'Evaluación de admisión.',
    'Postulación a las carreras seleccionadas.',
    'Asignación meritocrática de cupos.',
    'Aceptación del cupo.',
    'Matriculación (última semana de abril y primera de mayo).'
];

const AREAS = [
    {
        nombre: 'Administrativa y Social',
        carreras: [
            { n: 'Administración de Empresas', p: 819 },
            { n: 'Contabilidad y Auditoría', p: 824 },
            { n: 'Economía', p: 772 },
            { n: 'Derecho', p: 806 },
            { n: 'Comunicación', p: 734 },
            { n: 'Turismo', p: 526 },
            { n: 'Psicología Clínica', p: 807 },
            { n: 'Psicopedagogía', p: 776 }
        ]
    },
    {
        nombre: 'Salud',
        carreras: [
            { n: 'Medicina', p: 955 },
            { n: 'Enfermería', p: 793 },
            { n: 'Odontología', p: 955 },
            { n: 'Fisioterapia', p: 806 },
            { n: 'Laboratorio Clínico', p: 890 }
        ]
    },
    {
        nombre: 'Ingeniería y Tecnología',
        carreras: [
            { n: 'Ingeniería Civil', p: 634 },
            { n: 'Ingeniería Ambiental', p: 906 },
            { n: 'Ingeniería Industrial', p: 844 },
            { n: 'Tecnologías de la Información', p: 876 },
            { n: 'Telecomunicaciones', p: 670 },
            { n: 'Agroindustria', p: 782 }
        ]
    },
    {
        nombre: 'Arquitectura y Diseño',
        carreras: [
            { n: 'Arquitectura', p: 888 },
            { n: 'Diseño Gráfico', p: 765 }
        ]
    },
    {
        nombre: 'Educación y Pedagogía',
        carreras: [
            { n: 'Educación Básica', p: 826 },
            { n: 'Educación Inicial', p: 793 },
            { n: 'Pedagogía de la Actividad Física y Deporte', p: 802 },
            { n: 'Pedagogía de la Historia y Ciencias Sociales', p: 548 },
            { n: 'Pedagogía de la Lengua y la Literatura', p: 705 },
            { n: 'Pedagogía de las Artes y Humanidades (Artes)', p: 628 },
            { n: 'Pedagogía de las Ciencias Experimentales (Informática)', p: 700 },
            { n: 'Pedagogía de las Ciencias Experimentales (Química y Biología)', p: 677 },
            { n: 'Pedagogía de las Ciencias Experimentales (Matemáticas y Física)', p: 810 },
            { n: 'Pedagogía de los Idiomas Nacionales y Extranjeros (Inglés)', p: 848 }
        ]
    }
];

// Ranking tal como lo publica la fuente
const TOP = [
    { n: 'Medicina', p: 955 },
    { n: 'Odontología', p: 955 },
    { n: 'Psicología Clínica', p: 807 },
    { n: 'Enfermería', p: 793 },
    { n: 'Ingeniería Civil', p: 634 }
];

// Color del badge según rango de puntaje
function badgeClasses(p) {
    if (p >= 900) return 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300';
    if (p >= 800) return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300';
    if (p >= 700) return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300';
    return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300';
}

// Normaliza para búsqueda sin acentos
function norm(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Todas las carreras aplanadas (para stats)
const TODAS = AREAS.flatMap(a => a.carreras.map(c => c.p));

// ----- Mini stats en el hero -----
const miniStats = document.getElementById('mini-stats');
const stat = (label, val, color) => `
    <div class="rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur border border-white/50 dark:border-slate-700/50 px-3 py-2 text-center">
        <div class="text-lg sm:text-xl font-black ${color} leading-none">${val}</div>
        <div class="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mt-0.5">${label}</div>
    </div>`;
miniStats.innerHTML =
    stat('Carreras', TODAS.length, 'text-slate-800 dark:text-white') +
    stat('Máximo', Math.max(...TODAS), 'text-rose-500') +
    stat('Mínimo', Math.min(...TODAS), 'text-emerald-500');

// ----- Fases (compactas, dentro del details) -----
const fasesLista = document.getElementById('fases-lista');
fasesLista.innerHTML = FASES.map((f, i) => `
    <li class="flex items-start gap-2">
        <span class="shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">${i + 1}</span>
        <span class="text-xs text-slate-600 dark:text-slate-300 leading-snug">${f}</span>
    </li>
`).join('');

// ----- Top (chips horizontales) -----
const topCarreras = document.getElementById('top-carreras');
topCarreras.innerHTML = TOP.map((c, i) => `
    <div class="flex items-center gap-2 rounded-full bg-white/10 pl-2 pr-3 py-1.5">
        <span class="w-5 h-5 rounded-full bg-white/15 text-white text-[11px] font-black flex items-center justify-center">${i + 1}</span>
        <span class="text-xs sm:text-sm font-semibold text-white">${c.n}</span>
        <span class="text-sm font-black text-white tracking-tight">${c.p}</span>
    </div>
`).join('');

// ----- Render de áreas (búsqueda por nombre o puntaje + orden) -----
const areasContainer = document.getElementById('areas-container');
const sinResultados = document.getElementById('sin-resultados');
const filtroInfo = document.getElementById('filtro-info');
const buscar = document.getElementById('buscar-carrera');
const sortBtns = document.querySelectorAll('.sort-btn');

let sortMode = 'puntaje'; // 'puntaje' | 'az'

function ordenar(carreras) {
    return [...carreras].sort((a, b) =>
        sortMode === 'az' ? a.n.localeCompare(b.n, 'es') : b.p - a.p
    );
}

function renderAreas() {
    const raw = buscar.value.trim();
    // ¿La búsqueda es un número? -> filtra por puntaje mínimo
    const esNumero = raw !== '' && /^\d+$/.test(raw);
    const minPuntaje = esNumero ? parseInt(raw, 10) : null;
    const q = esNumero ? '' : norm(raw);

    // Chip informativo del filtro por puntaje
    if (minPuntaje !== null) {
        filtroInfo.classList.remove('hidden');
        filtroInfo.innerHTML = `
            <span class="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                Puntaje ≥ ${minPuntaje}
                <button id="limpiar-filtro" class="hover:opacity-70" aria-label="Limpiar">✕</button>
            </span>`;
        document.getElementById('limpiar-filtro').addEventListener('click', () => {
            buscar.value = ''; renderAreas();
        });
    } else {
        filtroInfo.classList.add('hidden');
        filtroInfo.innerHTML = '';
    }

    let totalVisibles = 0;

    areasContainer.innerHTML = AREAS.map(area => {
        let carreras = area.carreras.filter(c =>
            minPuntaje !== null ? c.p >= minPuntaje : norm(c.n).includes(q)
        );
        carreras = ordenar(carreras);

        if (carreras.length === 0) return '';
        totalVisibles += carreras.length;

        const filas = carreras.map(c => `
            <div class="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                <span class="text-sm font-medium text-slate-700 dark:text-slate-200">${c.n}</span>
                <span class="shrink-0 text-sm font-bold px-3 py-1 rounded-full ${badgeClasses(c.p)}">${c.p}</span>
            </div>
        `).join('');

        return `
            <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 sm:p-5">
                <div class="flex items-center justify-between gap-2 mb-3">
                    <div class="flex items-center gap-2 min-w-0">
                        <span class="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                        <h3 class="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wide truncate">${area.nombre}</h3>
                    </div>
                    <span class="text-[11px] font-semibold text-slate-400 dark:text-slate-500 shrink-0">${carreras.length}</span>
                </div>
                <div class="space-y-1.5">${filas}</div>
            </div>
        `;
    }).join('');

    sinResultados.classList.toggle('hidden', totalVisibles > 0);
}

// Botones de orden
function updateSortUI() {
    sortBtns.forEach(b => {
        const active = b.dataset.sort === sortMode;
        b.classList.toggle('bg-blue-600', active);
        b.classList.toggle('text-white', active);
        b.classList.toggle('text-slate-500', !active);
        b.classList.toggle('dark:text-slate-400', !active);
    });
}
sortBtns.forEach(b => b.addEventListener('click', () => {
    sortMode = b.dataset.sort;
    updateSortUI();
    renderAreas();
}));

buscar.addEventListener('input', renderAreas);
updateSortUI();
renderAreas();
