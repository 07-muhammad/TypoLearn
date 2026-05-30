'use strict';

const LESSONS = [
    { id: 1, title: 'Home Row Basics', keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'], done: true },
    { id: 2, title: 'Home Row Practice', keys: ['a', 's', 'd', 'f', 'j', 'k', 'l'], done: true },
    { id: 3, title: 'Add: G & H', keys: ['g', 'h'], done: true },
    { id: 4, title: 'Review Home Row', keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], done: true },
    { id: 5, title: 'Upper Row: E & I', keys: ['e', 'i'], done: false, current: true },
    { id: 6, title: 'Upper Row: R & U', keys: ['r', 'u'], done: false },
    { id: 7, title: 'Upper Row: T & Y', keys: ['t', 'y'], done: false },
    { id: 8, title: 'Upper Row: W & O', keys: ['w', 'o'], done: false },
    { id: 9, title: 'Upper Row: Q & P', keys: ['q', 'p'], done: false },
    { id: 10, title: 'Review Upper Row', keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], done: false },
    { id: 11, title: 'Lower Row: V & M', keys: ['v', 'm'], done: false },
    { id: 12, title: 'Lower Row: C & ,', keys: ['c', ','], done: false },
    { id: 13, title: 'Lower Row: X & .', keys: ['x', '.'], done: false },
    { id: 14, title: 'Lower Row: Z & /', keys: ['z', '/'], done: false },
    { id: 15, title: 'Review Lower Row', keys: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'], done: false },
    { id: 16, title: 'Numbers: 4 & 7', keys: ['4', '7'], done: false },
    { id: 17, title: 'Numbers: 3 & 8', keys: ['3', '8'], done: false },
    { id: 18, title: 'Numbers: 2 & 9', keys: ['2', '9'], done: false },
    { id: 19, title: 'Numbers: 1 & 0', keys: ['1', '0'], done: false },
    { id: 20, title: 'Review Numbers', keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], done: false },
    { id: 21, title: 'Shift: Capitals A-F', keys: ['A', 'S', 'D', 'F', 'G'], done: false },
    { id: 22, title: 'Shift: Capitals J-L', keys: ['J', 'K', 'L'], done: false },
    { id: 23, title: 'Shift: Upper Caps', keys: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], done: false },
    { id: 24, title: 'Shift: Lower Caps', keys: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'], done: false },
    { id: 25, title: 'Common Words I', keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'e', 'i', 'r', 'u'], done: false },
    { id: 26, title: 'Common Words II', keys: ['t', 'y', 'w', 'o', 'q', 'p', 'v', 'm', 'c', 'n', 'b'], done: false },
    { id: 27, title: 'Full Keyboard', keys: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'], done: false },
];

const KEYBOARD_LAYOUT = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '⌫'],
    ['⇥', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['⇪', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '↩'],
    ['⇧', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '⇧'],
    ['fn', '⌃', '⌥', '⌘', ' ', '⌘', '⌥', '◀', '▲', '▼', '▶'],
];

const KEY_WIDTHS = {
    '⌫': 'kw-175', '⇥': 'kw-15', '\\': 'kw-175', '⇪': 'kw-2', '↩': 'kw-225',
    '⇧': 'kw-275', 'fn': 'kw-15', '⌃': 'kw-15', '⌥': 'kw-15', '⌘': 'kw-2',
    ' ': 'kw-sp',
};

const FINGER_MAP = {
    '`': 'lp', '1': 'lp', '2': 'lr', '3': 'lm', '4': 'li', '5': 'li',
    '6': 'ri', '7': 'ri', '8': 'rm', '9': 'rr', '0': 'rp', '-': 'rp', '=': 'rp',
    'q': 'lp', 'w': 'lr', 'e': 'lm', 'r': 'li', 't': 'li',
    'y': 'ri', 'u': 'ri', 'i': 'rm', 'o': 'rr', 'p': 'rp', '[': 'rp', ']': 'rp', '\\': 'rp',
    'a': 'lp', 's': 'lr', 'd': 'lm', 'f': 'li', 'g': 'li',
    'h': 'ri', 'j': 'ri', 'k': 'rm', 'l': 'rr', ';': 'rp', "'": 'rp',
    'z': 'lp', 'x': 'lr', 'c': 'lm', 'v': 'li', 'b': 'li',
    'n': 'ri', 'm': 'ri', ',': 'rm', '.': 'rr', '/': 'rp',
    ' ': 'th', '⌘': 'th', '⌥': 'th', '⌃': 'th', 'fn': 'lp',
    '⇥': 'lp', '⇪': 'lp', '⇧': 'lp', '⌫': 'rp', '↩': 'rp',
};

// Maps finger code → CSS variable
const FINGER_COLORS = {
    'lp': 'var(--f-lp)', 'lr': 'var(--f-lr)', 'lm': 'var(--f-lm)', 'li': 'var(--f-li)',
    'ri': 'var(--f-ri)', 'rm': 'var(--f-rm)', 'rr': 'var(--f-rr)', 'rp': 'var(--f-rp)',
    'th': 'var(--f-th)',
};

// Word banks for text generation
const WORD_BANKS = {
    home: ['ask', 'dad', 'fall', 'add', 'slag', 'flash', 'glad', 'flask', 'hall', 'lad', 'flag', 'lass', 'glass'],
    upper: ['ripe', 'tire', 'wire', 'euro', 'tour', 'your', 'poet', 'quit', 'wipe', 'trio', 'pour', 'rope'],
    lower: ['verb', 'cave', 'move', 'zinc', 'flex', 'vibe', 'vent', 'corn', 'comb', 'dove', 'civic', 'exam'],
    common: ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her', 'was', 'one', 'our', 'out',
        'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who'],
    full: ['quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog', 'pack', 'my', 'box', 'with', 'five', 'dozen',
        'liquor', 'jugs', 'how', 'vexingly', 'bright', 'quiz', 'gawked', 'jumbo', 'sphinx'],
};

// ============================================
// STATE
// ============================================
let state = {
    currentView: 'learn',
    currentLesson: null,
    currentLessonIdx: 4,  // 0-based; lesson 5 default

    // typing state
    typingText: '',
    typedInput: '',
    charStates: [],       // 'pending' | 'correct' | 'wrong'
    cursorIdx: 0,

    // timing
    startTime: null,
    timerHandle: null,
    elapsedSeconds: 0,

    // counts
    totalKeystrokes: 0,
    correctKeystrokes: 0,

    // settings
    showKeyboard: true,
    showHands: true,
    colorFingers: true,
    soundEnabled: false,
};

// ============================================
// DOM REFS
// ============================================
const $ = id => document.getElementById(id);

const DOM = {
    views: document.querySelectorAll('.view'),
    navPills: document.querySelectorAll('.nav-pill'),
    langItems: document.querySelectorAll('.lang-item'),
    lessonsGrid: $('lessons-grid'),
    keyboard: $('keyboard'),
    typingBox: $('typing-box'),
    typingText: $('typing-text'),
    hiddenInput: $('hidden-input'),
    typingHint: $('typing-hint'),
    statWpm: $('stat-wpm'),
    statAcc: $('stat-acc'),
    statTime: $('stat-time'),
    statChars: $('stat-chars'),
    lessonBadge: $('lesson-badge'),
    lessonNameSm: $('lesson-name-sm'),
    backBtn: $('back-btn'),
    restartBtn: $('restart-btn'),
    prevBtn: $('prev-lesson-btn'),
    nextBtn: $('next-lesson-btn'),
    handsRow: $('hands-row'),
    leftHandSvg: $('left-hand-svg'),
    rightHandSvg: $('right-hand-svg'),
    modalOverlay: $('modal-overlay'),
    modalWpm: $('modal-wpm'),
    modalAcc: $('modal-acc'),
    modalTime: $('modal-time'),
    modalRetry: $('modal-retry'),
    modalNext: $('modal-next'),
    progressFill: $('progress-fill'),
    progressPct: $('progress-pct'),
    progressLessons: $('progress-lessons'),
    toggleKeyboard: $('toggle-keyboard'),
    toggleHands: $('toggle-hands'),
    toggleColors: $('toggle-colors'),
    toggleSound: $('toggle-sound'),
};

// ============================================
// NAVIGATION
// ============================================
function showView(viewName) {
    state.currentView = viewName;
    DOM.views.forEach(v => v.classList.remove('active'));
    const target = document.getElementById(`view-${viewName}`);
    if (target) target.classList.add('active');

    DOM.navPills.forEach(p => {
        p.classList.toggle('active', p.dataset.view === viewName);
    });
}

DOM.navPills.forEach(pill => {
    pill.addEventListener('click', () => {
        const v = pill.dataset.view;
        if (v === 'learn' || v === 'settings') showView(v);
    });
});

DOM.backBtn.addEventListener('click', () => {
    stopTimer();
    showView('learn');
});

// ============================================
// LESSON GRID
// ============================================
function buildLessonGrid() {
    DOM.lessonsGrid.innerHTML = '';
    const doneCount = LESSONS.filter(l => l.done).length;
    const pct = Math.round((doneCount / LESSONS.length) * 100);

    DOM.progressFill.style.width = pct + '%';
    DOM.progressPct.textContent = pct + '%';
    DOM.progressLessons.textContent = `${doneCount} / ${LESSONS.length} lessons`;

    LESSONS.forEach((lesson, idx) => {
        const card = document.createElement('button');
        card.className = 'lesson-card' +
            (lesson.done ? ' done-lesson' : '') +
            (lesson.current ? ' active-lesson' : '');

        const statusClass = lesson.done ? 'status-done' : lesson.current ? 'status-current' : 'status-locked';
        const keysHtml = lesson.keys.slice(0, 6).map(k =>
            `<span class="key-chip">${k.toUpperCase()}</span>`
        ).join('') + (lesson.keys.length > 6 ? `<span class="key-chip">+${lesson.keys.length - 6}</span>` : '');

        card.innerHTML = `
      <div class="card-top">
        <span class="card-num">Lesson ${lesson.id}</span>
        <span class="card-status ${statusClass}"></span>
      </div>
      <div class="card-title">${lesson.title}</div>
      <div class="card-keys">${keysHtml}</div>
    `;
        card.style.animationDelay = `${idx * 0.03}s`;
        card.addEventListener('click', () => launchLesson(idx));
        DOM.lessonsGrid.appendChild(card);
    });
}

// ============================================
// LAUNCH LESSON
// ============================================
function launchLesson(lessonIdx) {
    const lesson = LESSONS[lessonIdx];
    state.currentLesson = lesson;
    state.currentLessonIdx = lessonIdx;

    DOM.lessonBadge.textContent = `Lesson ${lesson.id}`;
    DOM.lessonNameSm.textContent = lesson.title;

    generateTypingText(lesson);
    resetTypingState();
    buildKeyboard();
    renderHands(null);
    showView('typing');

    setTimeout(() => {
        DOM.typingBox.focus();
        DOM.hiddenInput.focus();
        DOM.typingHint.classList.add('visible');
    }, 100);
}

// ============================================
// TEXT GENERATION
// ============================================
function generateTypingText(lesson) {
    const letters = lesson.keys.filter(k => /^[a-zA-Z]$/.test(k)).map(k => k.toLowerCase());
    const specials = lesson.keys.filter(k => /^[^a-zA-Z]$/.test(k));
    const allKeys = [...letters];

    let pool = [];

    if (letters.length > 0) {
        // Generate pseudo-words from the lesson keys
        const wordCount = 50;
        for (let i = 0; i < wordCount; i++) {
            const len = 2 + Math.floor(Math.random() * 5);
            let word = '';
            for (let j = 0; j < len; j++) {
                word += letters[Math.floor(Math.random() * letters.length)];
            }
            pool.push(word);
        }
        // Sprinkle in specials if any
        if (specials.length > 0) {
            for (let i = 0; i < 8; i++) {
                pool.splice(Math.floor(Math.random() * pool.length), 0, specials[Math.floor(Math.random() * specials.length)]);
            }
        }
    } else {
        // Number or special only lesson
        for (let i = 0; i < 60; i++) {
            pool.push(allKeys[Math.floor(Math.random() * allKeys.length)]);
        }
    }

    // Shuffle
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    state.typingText = pool.slice(0, 45).join(' ');
}

// ============================================
// TYPING STATE RESET
// ============================================
function resetTypingState() {
    stopTimer();
    state.typedInput = '';
    state.charStates = state.typingText.split('').map(() => 'pending');
    state.cursorIdx = 0;
    state.startTime = null;
    state.elapsedSeconds = 0;
    state.totalKeystrokes = 0;
    state.correctKeystrokes = 0;

    DOM.statWpm.textContent = '0';
    DOM.statAcc.textContent = '100%';
    DOM.statTime.textContent = '0s';
    DOM.statChars.textContent = '0';

    renderTypingText();
}

// ============================================
// RENDER TYPING TEXT
// ============================================
function renderTypingText() {
    const container = DOM.typingText;
    container.innerHTML = '';

    for (let i = 0; i < state.typingText.length; i++) {
        const span = document.createElement('span');
        span.className = 'char';
        const ch = state.typingText[i];

        if (i < state.cursorIdx) {
            span.classList.add(state.charStates[i]);
        } else if (i === state.cursorIdx) {
            span.classList.add('pending', 'cursor');
        } else {
            span.classList.add('pending');
        }

        // Space gets a middle dot for visibility when wrong
        if (ch === ' ' && state.charStates[i] === 'wrong') {
            span.textContent = '·';
        } else if (ch === ' ') {
            span.innerHTML = '&nbsp;';
        } else {
            span.textContent = ch;
        }

        container.appendChild(span);
    }

    // Auto-scroll cursor into view
    const cursor = container.querySelector('.cursor');
    if (cursor) {
        cursor.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }

    // Highlight the next key on keyboard
    const nextChar = state.typingText[state.cursorIdx];
    if (nextChar !== undefined) {
        highlightKey(nextChar.toLowerCase());
        renderHands(nextChar.toLowerCase());
    } else {
        highlightKey(null);
        renderHands(null);
    }
}

// ============================================
// INPUT HANDLING
// ============================================
DOM.typingBox.addEventListener('click', () => {
    DOM.hiddenInput.focus();
    DOM.typingHint.classList.remove('visible');
    DOM.typingBox.classList.add('has-focus');
});

DOM.hiddenInput.addEventListener('focus', () => {
    DOM.typingBox.classList.add('has-focus');
    DOM.typingHint.classList.remove('visible');
});

DOM.hiddenInput.addEventListener('blur', () => {
    DOM.typingBox.classList.remove('has-focus');
    if (state.cursorIdx === 0) DOM.typingHint.classList.add('visible');
});

DOM.hiddenInput.addEventListener('keydown', (e) => {
    // Block browser shortcuts that interfere
    if (e.key === 'Tab') { e.preventDefault(); return; }

    if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
        return;
    }
});

DOM.hiddenInput.addEventListener('input', (e) => {
    const val = DOM.hiddenInput.value;
    if (!val) return;
    DOM.hiddenInput.value = '';

    const ch = val[val.length - 1]; // last char typed
    handleChar(ch);
});

function handleChar(ch) {
    if (state.cursorIdx >= state.typingText.length) return;

    // Start timer on first keypress
    if (!state.startTime) {
        state.startTime = Date.now();
        state.timerHandle = setInterval(tickTimer, 500);
    }

    DOM.typingHint.classList.remove('visible');

    const expected = state.typingText[state.cursorIdx];
    state.totalKeystrokes++;

    if (ch === expected) {
        state.charStates[state.cursorIdx] = 'correct';
        state.correctKeystrokes++;
        flashKey(expected.toLowerCase(), true);
    } else {
        state.charStates[state.cursorIdx] = 'wrong';
        flashKey(expected.toLowerCase(), false);
        // Also flash the key they actually pressed
        if (ch !== expected) flashKey(ch.toLowerCase(), false);
    }

    state.cursorIdx++;
    updateStats();
    renderTypingText();

    // Check completion
    if (state.cursorIdx >= state.typingText.length) {
        stopTimer();
        setTimeout(showCompletionModal, 350);
    }
}

function handleBackspace() {
    if (state.cursorIdx === 0) return;
    state.cursorIdx--;
    state.charStates[state.cursorIdx] = 'pending';
    renderTypingText();
}

// ============================================
// TIMER
// ============================================
function tickTimer() {
    if (!state.startTime) return;
    state.elapsedSeconds = Math.round((Date.now() - state.startTime) / 1000);
    DOM.statTime.textContent = state.elapsedSeconds + 's';
    updateWpm();
}

function stopTimer() {
    if (state.timerHandle) {
        clearInterval(state.timerHandle);
        state.timerHandle = null;
    }
}

function updateWpm() {
    if (!state.startTime) return;
    const mins = (Date.now() - state.startTime) / 60000;
    if (mins < 0.01) return;
    const words = state.correctKeystrokes / 5;
    const wpm = Math.round(words / mins);
    DOM.statWpm.textContent = wpm;
}

function updateStats() {
    // WPM
    if (state.startTime) {
        const mins = (Date.now() - state.startTime) / 60000;
        if (mins > 0.01) {
            const words = state.correctKeystrokes / 5;
            DOM.statWpm.textContent = Math.round(words / mins);
        }
    }
    // Accuracy
    const acc = state.totalKeystrokes > 0
        ? Math.round((state.correctKeystrokes / state.totalKeystrokes) * 100)
        : 100;
    DOM.statAcc.textContent = acc + '%';
    // Chars
    DOM.statChars.textContent = state.cursorIdx;
}

// ============================================
// KEYBOARD BUILDER
// ============================================
function buildKeyboard() {
    DOM.keyboard.innerHTML = '';
    const colorize = state.colorFingers;

    KEYBOARD_LAYOUT.forEach(rowKeys => {
        const row = document.createElement('div');
        row.className = 'kb-row';

        rowKeys.forEach(k => {
            const el = document.createElement('div');
            const w = KEY_WIDTHS[k] || 'kw-1';
            el.className = `key ${w}`;
            el.dataset.key = k.toLowerCase();

            const finger = FINGER_MAP[k.toLowerCase()];
            if (finger && colorize) {
                const dot = document.createElement('div');
                dot.className = 'finger-dot';
                dot.style.background = FINGER_COLORS[finger];
                el.appendChild(dot);
            }

            const label = document.createElement('span');
            label.textContent = k;
            el.appendChild(label);
            row.appendChild(el);
        });

        DOM.keyboard.appendChild(row);
    });
}

function highlightKey(ch) {
    // Clear existing highlights
    document.querySelectorAll('.key.highlight').forEach(k => k.classList.remove('highlight'));
    if (!ch) return;

    const keyEl = document.querySelector(`.key[data-key="${CSS.escape(ch)}"]`);
    if (keyEl) keyEl.classList.add('highlight');
}

function flashKey(ch, correct) {
    const keyEl = document.querySelector(`.key[data-key="${CSS.escape(ch)}"]`);
    if (!keyEl) return;

    const cls = correct ? 'pressed-ok' : 'pressed-err';
    keyEl.classList.add(cls);
    setTimeout(() => keyEl.classList.remove(cls), 180);
}

// ============================================
// HAND SVG DIAGRAM
// ============================================
// Finger positions [cx, tip-y, base-y, width] for each hand
const LEFT_FINGERS = [
    { id: 'lp', cx: 22, ty: 18, by: 110, w: 18, label: 'Pinky' },
    { id: 'lr', cx: 48, ty: 10, by: 115, w: 18, label: 'Ring' },
    { id: 'lm', cx: 74, ty: 5, by: 118, w: 18, label: 'Middle' },
    { id: 'li', cx: 100, ty: 12, by: 115, w: 18, label: 'Index' },
    { id: 'th', cx: 128, ty: 60, by: 145, w: 18, label: 'Thumb' },
];
const RIGHT_FINGERS = [
    { id: 'th', cx: 32, ty: 60, by: 145, w: 18, label: 'Thumb' },
    { id: 'ri', cx: 60, ty: 12, by: 115, w: 18, label: 'Index' },
    { id: 'rm', cx: 86, ty: 5, by: 118, w: 18, label: 'Middle' },
    { id: 'rr', cx: 112, ty: 10, by: 115, w: 18, label: 'Ring' },
    { id: 'rp', cx: 138, ty: 18, by: 110, w: 18, label: 'Pinky' },
];

function buildHandSvg(svgEl, fingers, activeFingerId) {
    svgEl.innerHTML = '';

    // Palm
    const palm = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    palm.setAttribute('x', '10');
    palm.setAttribute('y', '110');
    palm.setAttribute('width', '140');
    palm.setAttribute('height', '75');
    palm.setAttribute('rx', '18');
    palm.setAttribute('fill', 'var(--surface)');
    palm.setAttribute('stroke', 'var(--border2)');
    palm.setAttribute('stroke-width', '1.5');
    svgEl.appendChild(palm);

    fingers.forEach(f => {
        const isActive = f.id === activeFingerId;
        const color = isActive ? FINGER_COLORS[f.id] : 'var(--surface)';
        const strokeColor = isActive ? FINGER_COLORS[f.id] : 'var(--border2)';

        // Finger body
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', f.cx - f.w / 2);
        rect.setAttribute('y', f.ty);
        rect.setAttribute('width', f.w);
        rect.setAttribute('height', f.by - f.ty);
        rect.setAttribute('rx', f.w / 2);
        rect.setAttribute('fill', color);
        rect.setAttribute('stroke', strokeColor);
        rect.setAttribute('stroke-width', '1.5');
        rect.style.transition = 'fill 0.15s, stroke 0.15s';

        // Fingertip glow when active
        if (isActive) {
            const glow = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            glow.setAttribute('x', f.cx - f.w / 2 - 2);
            glow.setAttribute('y', f.ty - 2);
            glow.setAttribute('width', f.w + 4);
            glow.setAttribute('height', f.w + 4);
            glow.setAttribute('rx', (f.w + 4) / 2);
            glow.setAttribute('fill', FINGER_COLORS[f.id]);
            glow.setAttribute('opacity', '0.25');
            svgEl.appendChild(glow);
        }

        svgEl.appendChild(rect);

        // Knuckle lines
        [0.4, 0.65].forEach(frac => {
            const y = f.ty + (f.by - f.ty) * frac;
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', f.cx - f.w / 2 + 2);
            line.setAttribute('y1', y);
            line.setAttribute('x2', f.cx + f.w / 2 - 2);
            line.setAttribute('y2', y);
            line.setAttribute('stroke', isActive ? 'rgba(0,0,0,0.25)' : 'var(--border)');
            line.setAttribute('stroke-width', '1');
            svgEl.appendChild(line);
        });
    });
}

function renderHands(activeKey) {
    if (!state.showHands) {
        DOM.handsRow.style.display = 'none';
        return;
    }
    DOM.handsRow.style.display = 'flex';

    const finger = activeKey ? FINGER_MAP[activeKey] : null;
    buildHandSvg(DOM.leftHandSvg, LEFT_FINGERS, finger);
    buildHandSvg(DOM.rightHandSvg, RIGHT_FINGERS, finger);
}

// ============================================
// COMPLETION MODAL
// ============================================
function showCompletionModal() {
    const mins = state.startTime ? (Date.now() - state.startTime) / 60000 : 0;
    const wpm = mins > 0 ? Math.round((state.correctKeystrokes / 5) / mins) : 0;
    const acc = state.totalKeystrokes > 0
        ? Math.round((state.correctKeystrokes / state.totalKeystrokes) * 100) : 100;

    DOM.modalWpm.textContent = wpm;
    DOM.modalAcc.textContent = acc + '%';
    DOM.modalTime.textContent = state.elapsedSeconds + 's';
    DOM.modalOverlay.classList.add('open');

    // Mark lesson done
    LESSONS[state.currentLessonIdx].done = true;
    LESSONS[state.currentLessonIdx].current = false;
    if (state.currentLessonIdx + 1 < LESSONS.length) {
        LESSONS[state.currentLessonIdx + 1].current = true;
    }
    buildLessonGrid();
}

DOM.modalRetry.addEventListener('click', () => {
    DOM.modalOverlay.classList.remove('open');
    restartLesson();
});

DOM.modalNext.addEventListener('click', () => {
    DOM.modalOverlay.classList.remove('open');
    goNextLesson();
});

DOM.modalOverlay.addEventListener('click', (e) => {
    if (e.target === DOM.modalOverlay) DOM.modalOverlay.classList.remove('open');
});

// ============================================
// LESSON CONTROLS
// ============================================
DOM.restartBtn.addEventListener('click', restartLesson);
DOM.nextBtn.addEventListener('click', goNextLesson);
DOM.prevBtn.addEventListener('click', goPrevLesson);

function restartLesson() {
    generateTypingText(state.currentLesson);
    resetTypingState();
    buildKeyboard();
    renderHands(null);
    setTimeout(() => { DOM.hiddenInput.focus(); }, 100);
}

function goNextLesson() {
    const next = state.currentLessonIdx + 1;
    if (next < LESSONS.length) launchLesson(next);
}

function goPrevLesson() {
    const prev = state.currentLessonIdx - 1;
    if (prev >= 0) launchLesson(prev);
}

// ============================================
// LANG SELECTOR
// ============================================
DOM.langItems.forEach(item => {
    item.addEventListener('click', () => {
        if (item.classList.contains('disabled')) return;
        DOM.langItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        // Future: swap lesson set per language
    });
});

// ============================================
// SETTINGS
// ============================================
DOM.toggleKeyboard.addEventListener('change', () => {
    state.showKeyboard = DOM.toggleKeyboard.checked;
    DOM.keyboard.closest('.keyboard-container').style.display = state.showKeyboard ? '' : 'none';
});

DOM.toggleHands.addEventListener('change', () => {
    state.showHands = DOM.toggleHands.checked;
    renderHands(state.typingText[state.cursorIdx]?.toLowerCase() || null);
});

DOM.toggleColors.addEventListener('change', () => {
    state.colorFingers = DOM.toggleColors.checked;
    buildKeyboard();
});

DOM.toggleSound.addEventListener('change', () => {
    state.soundEnabled = DOM.toggleSound.checked;
});

document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// ============================================
// KEYBOARD SHORTCUT HINT
// ============================================
document.addEventListener('keydown', (e) => {
    if (state.currentView === 'typing') {
        // Allow Tab as shortcut for restart
        if (e.key === 'Tab' && e.shiftKey) {
            e.preventDefault();
            restartLesson();
        }
    }
});

// ============================================
// INIT
// ============================================
function init() {
    buildLessonGrid();
    buildKeyboard();
    showView('learn');

    // Stagger card animation delays
    document.querySelectorAll('.lesson-card').forEach((card, i) => {
        card.style.animationDelay = `${i * 0.025}s`;
    });
}

init();