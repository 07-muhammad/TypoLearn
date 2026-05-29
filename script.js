// ═══════════════════════════════════════════════════════
// RANDOM WORD GENERATION
// ═══════════════════════════════════════════════════════

function generateRandomWord(chars, minLen = 2, maxLen = 6) {
    const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    let word = '';
    for (let i = 0; i < len; i++) {
        word += chars[Math.floor(Math.random() * chars.length)];
    }
    return word;
}

function generateWordsForLesson(keys, count = 12) {
    const chars = keys.replace(/\s/g, '').split('');
    const words = [];
    for (let i = 0; i < count; i++) {
        words.push(generateRandomWord(chars, 2, 5));
    }
    return words.join(' ');
}

function generateRandomText(difficulty = 'medium', wordCount = 15) {
    const commonWords = ['the', 'and', 'to', 'of', 'a', 'in', 'is', 'that', 'it', 'for', 'you', 'on', 'be', 'this', 'with', 'have', 'from', 'or', 'by', 'an', 'as', 'are', 'but', 'not', 'your', 'all', 'can', 'her', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'my', 'we', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us'];
    
    const minWordLen = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 6;
    const maxWordLen = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 7 : 12;
    
    const words = [];
    for (let i = 0; i < wordCount; i++) {
        if (Math.random() < 0.7 && commonWords.length > 0) {
            words.push(commonWords[Math.floor(Math.random() * commonWords.length)]);
        } else {
            words.push(generateRandomWord('abcdefghijklmnopqrstuvwxyz', minWordLen, maxWordLen));
        }
    }
    return words.join(' ');
}

// DATA
const LESSONS = [
    { id: 0, title: "Home row", keys: "asdf jkl;", skill: "home", goal: 20 },
    { id: 1, title: "Add G & H", keys: "asdf ghjkl;", skill: "home", goal: 22 },
    { id: 2, title: "Top row E R", keys: "asdfer jkl;", skill: "top", goal: 22 },
    { id: 3, title: "Top row W O", keys: "asdfw ojkl;", skill: "top", goal: 24 },
    { id: 4, title: "Full top row", keys: "qwertyuiop", skill: "top", goal: 26 },
    { id: 5, title: "Bottom row", keys: "zxcvbnm", skill: "bot", goal: 24 },
    { id: 6, title: "Full alphabet", keys: "abcdefghijklmnopqrstuvwxyz", skill: "bot", goal: 28 },
    { id: 7, title: "Numbers", keys: "1234567890", skill: "num", goal: 22 },
    { id: 8, title: "Speed burst", keys: "abcdefghijklmnopqrstuvwxyz", skill: "home", goal: 35 },
];

// STATE
let S = {
    xp: 0, bestWPM: 0, wpmHistory: [], testCount: 0,
    completedLessons: new Set(),
    currentLesson: -1, currentMode: 'learn',
    learnKeyIdx: 0,
    repeatBoxes: [], repeatIdx: 0, repeatKey: '',
    wordsArr: [], wordIdx: 0, wordsStart: null, wordsTimer: null,
    wordsCorrect: 0, wordsErrors: 0, wordsCombo: 0,
    practiceWords: [], practiceIdx: 0, practiceStart: null, practiceCombo: 0, practiceCorrect: 0,
    testWords: [], testIdx: 0, testStart: null, testTimer: null, testTimeLeft: 60, testStarted: false, testCorrect: 0
};

// KEYBOARD BUILDER
const KB_ROWS = [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '⌫'], ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'], ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '↵'], ['⇧', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '⇧'], ['Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl']];
const WIDE = ['⌫', 'Tab', 'Caps', '↵']; const WIDER = ['⇧']; const SPACE = ['Space'];

function buildKB(id, highlight = []) {
    const c = document.getElementById(id); if (!c) return;
    c.innerHTML = '';
    KB_ROWS.forEach(row => {
        const div = document.createElement('div'); div.className = 'kb-row';
        row.forEach(k => {
            const el = document.createElement('div'); el.className = 'key';
            if (WIDE.includes(k)) el.classList.add('wide');
            if (WIDER.includes(k)) el.classList.add('wider');
            if (SPACE.includes(k)) el.classList.add('space');
            el.textContent = k; el.dataset.k = k.toLowerCase();
            const kl = k.toLowerCase();
            if (highlight.some(h => h === kl || (k === 'Space' && h === ' '))) { el.classList.add('hl'); }
            div.appendChild(el);
        });
        c.appendChild(div);
    });
}

function pressKB(id, key) {
    const c = document.getElementById(id); if (!c) return;
    c.querySelectorAll('.key').forEach(el => {
        if (el.dataset.k === key || (key === ' ' && el.textContent === 'Space')) {
            el.classList.add('pressed');
            setTimeout(() => el.classList.remove('pressed'), 120);
        }
    });
}

// FINGER GUIDE
const FINGER_MAP = { 'a': { hand: 'left', row: 2, col: 1 }, 's': { hand: 'left', row: 2, col: 2 }, 'd': { hand: 'left', row: 2, col: 3 }, 'f': { hand: 'left', row: 2, col: 4 }, 'g': { hand: 'left', row: 2, col: 5 }, 'q': { hand: 'left', row: 1, col: 1 }, 'w': { hand: 'left', row: 1, col: 2 }, 'e': { hand: 'left', row: 1, col: 3 }, 'r': { hand: 'left', row: 1, col: 4 }, 't': { hand: 'left', row: 1, col: 5 }, 'z': { hand: 'left', row: 3, col: 1 }, 'x': { hand: 'left', row: 3, col: 2 }, 'c': { hand: 'left', row: 3, col: 3 }, 'v': { hand: 'left', row: 3, col: 4 }, 'b': { hand: 'left', row: 3, col: 5 }, 'h': { hand: 'right', row: 2, col: 1 }, 'j': { hand: 'right', row: 2, col: 2 }, 'k': { hand: 'right', row: 2, col: 3 }, 'l': { hand: 'right', row: 2, col: 4 }, ';': { hand: 'right', row: 2, col: 5 }, 'y': { hand: 'right', row: 1, col: 1 }, 'u': { hand: 'right', row: 1, col: 2 }, 'i': { hand: 'right', row: 1, col: 3 }, 'o': { hand: 'right', row: 1, col: 4 }, 'p': { hand: 'right', row: 1, col: 5 }, 'n': { hand: 'right', row: 3, col: 1 }, 'm': { hand: 'right', row: 3, col: 2 }, ',': { hand: 'right', row: 3, col: 3 }, '.': { hand: 'right', row: 3, col: 4 }, '/': { hand: 'right', row: 3, col: 5 } };
const FINGER_NAMES = { left: { 1: 'pinky', 2: 'ring', 3: 'middle', 4: 'index', 5: 'index' }, right: { 1: 'index', 2: 'index', 3: 'middle', 4: 'ring', 5: 'pinky' } };

function getFingerInstruction(key) {
    const k = key.toLowerCase();
    const info = FINGER_MAP[k];
    if (!info) return `Press the <span class="key-chip">${key.toUpperCase()}</span> key`;
    const fname = FINGER_NAMES[info.hand][info.col];
    return `Press the <span class="key-chip">${key.toUpperCase()}</span> key using your ${info.hand} ${fname} finger`;
}

// LESSON GRID
function buildLessonGrid() {
    const g = document.getElementById('lesson-grid'); g.innerHTML = '';
    LESSONS.forEach((l, i) => {
        const d = document.createElement('div');
        d.className = 'lcard' + (S.completedLessons.has(i) ? ' done' : '');
        d.innerHTML = `<div class="lcard-num">Lesson ${i + 1}</div><div class="lcard-title">${l.title}</div><div class="lcard-keys">${l.keys}</div><div class="lcard-bar"><div class="lcard-bar-fill" style="width:${S.completedLessons.has(i) ? 100 : 0}%"></div></div>`;
        d.onclick = () => startLesson(i);
        g.appendChild(d);
    });
}

// START LESSON
function startLesson(idx) {
    S.currentLesson = idx;
    document.getElementById('lesson-list').style.display = 'none';
    document.getElementById('lesson-area').style.display = 'block';
    document.getElementById('lesson-heading').textContent = `Lesson ${idx + 1}: ${LESSONS[idx].title}`;
    setMode('learn', document.querySelectorAll('.mode-tab')[0]);
}

function closeLesson() {
    document.getElementById('lesson-area').style.display = 'none';
    document.getElementById('lesson-list').style.display = 'block';
    clearInterval(S.wordsTimer);
    buildLessonGrid();
}

function retryLesson() { startLesson(S.currentLesson); }
function nextLesson() {
    const n = S.currentLesson + 1;
    if (n < LESSONS.length) startLesson(n); else closeLesson();
}

// MODES
function setMode(mode, btn) {
    S.currentMode = mode;
    document.querySelectorAll('.mode-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    ['learn', 'repeat', 'words'].forEach(m => {
        document.getElementById('mode-' + m).style.display = m === mode ? 'block' : 'none';
    });
    clearInterval(S.wordsTimer);
    if (mode === 'learn') initLearn();
    if (mode === 'repeat') initRepeat();
    if (mode === 'words') initWords();
}

// LEARN MODE
function initLearn() {
    const l = LESSONS[S.currentLesson];
    const keys = l.keys.replace(/\s/g, '').split('');
    const unique = [...new Set(keys)];
    S.learnKeyIdx = 0;
    buildLearnDots(unique.length);
    showLearnKey(unique, 0);

    document.addEventListener('keydown', learnKeyHandler);
}

function buildLearnDots(n) {
    const c = document.getElementById('learn-dots'); c.innerHTML = '';
    for (let i = 0; i < Math.min(n, 8); i++) {
        const d = document.createElement('div'); d.className = 'pdot' + (i === 0 ? ' active' : ''); d.id = 'pdot-' + i; c.appendChild(d);
    }
}

function showLearnKey(keys, idx) {
    if (idx >= keys.length) { document.removeEventListener('keydown', learnKeyHandler); return; }
    const k = keys[idx];
    document.getElementById('learn-key-title').textContent = `Learn: ${k}`;
    document.getElementById('learn-instruction').innerHTML = getFingerInstruction(k);
    buildKB('learn-kb', [k.toLowerCase()]);
    // update dots
    document.querySelectorAll('.pdot').forEach((d, i) => {
        d.className = 'pdot' + (i === idx ? ' active' : i < idx ? ' done' : '');
    });
    S.learnCurrentKey = k;
    S.learnKeys = keys;
    S.learnKeyIdx = idx;

    const learnOnKey = (e) => {
        if (e.key.toLowerCase() === k.toLowerCase() || (k === ' ' && e.key === ' ')) {
            pressKB('learn-kb', k.toLowerCase());
            document.removeEventListener('keydown', learnOnKey);
            setTimeout(() => showLearnKey(keys, idx + 1), 300);
        }
    };
    document.addEventListener('keydown', learnOnKey);
    window._learnKeyHandler = learnOnKey;
}

function learnKeyHandler() { }

// REPEAT MODE
function initRepeat() {
    const l = LESSONS[S.currentLesson];
    const keys = l.keys.replace(/\s/g, '').split('');
    const unique = [...new Set(keys)];
    // pick a key to repeat
    const k = unique[Math.floor(Math.random() * unique.length)];
    S.repeatKey = k;
    S.repeatBoxes = Array(6).fill(null);
    S.repeatIdx = 0;

    renderRepeatBoxes();
    buildKB('repeat-kb', [k.toLowerCase()]);
    document.getElementById('repeat-input').value = '';
    document.getElementById('repeat-input').focus();
}

function renderRepeatBoxes() {
    const c = document.getElementById('repeat-boxes'); c.innerHTML = '';
    S.repeatBoxes.forEach((v, i) => {
        const el = document.createElement('div');
        el.className = 'rbox';
        if (i === S.repeatIdx) el.classList.add('current');
        if (v === 'correct') el.classList.add('done');
        if (v === 'wrong') el.classList.add('wrong');
        el.textContent = v ? S.repeatKey.toUpperCase() : S.repeatKey.toUpperCase();
        if (i > S.repeatIdx && v === null) el.style.color = 'var(--text3)';
        c.appendChild(el);
    });
}

document.addEventListener('input', e => {
    if (e.target.id === 'repeat-input') {
        const v = e.target.value;
        if (!v) return;
        const correct = v.toLowerCase() === S.repeatKey.toLowerCase();
        S.repeatBoxes[S.repeatIdx] = correct ? 'correct' : 'wrong';
        pressKB('repeat-kb', v.toLowerCase());
        renderRepeatBoxes();
        e.target.value = '';
        if (correct) S.repeatIdx++;
        if (S.repeatIdx >= 6) {
            const all = S.repeatBoxes.every(b => b === 'correct');
            setTimeout(() => {
                if (all) initRepeat(); else { S.repeatIdx = 0; S.repeatBoxes = Array(6).fill(null); renderRepeatBoxes(); }
            }, 400);
        }
    }

    if (e.target.id === 'words-input') handleWordsInput(e.target);
    if (e.target.id === 'practice-input') handlePracticeInput(e.target);
    if (e.target.id === 'test-input') handleTestInput(e.target);
});

// WORDS MODE
function initWords() {
    const l = LESSONS[S.currentLesson];
    const generatedWords = generateWordsForLesson(l.keys, 12);
    S.wordsArr = generatedWords.trim().split(/\s+/);
    S.wordIdx = 0; S.wordsStart = null; S.wordsCorrect = 0; S.wordsErrors = 0; S.wordsCombo = 0;
    clearInterval(S.wordsTimer);
    renderWords();
    document.getElementById('words-input').value = '';
    document.getElementById('words-input').focus();
    document.getElementById('w-wpm').textContent = '0';
    document.getElementById('w-acc').textContent = '100%';
    document.getElementById('w-combo').textContent = '0';
    document.getElementById('w-time').textContent = '0s';
}

function renderWords() {
    const c = document.getElementById('words-display');
    c.innerHTML = S.wordsArr.map((w, i) => {
        if (i < S.wordIdx) return `<span class="w-correct">${w}</span>`;
        if (i === S.wordIdx) return `<span class="w-cur">${w}</span>`;
        return `<span>${w}</span>`;
    }).join(' ');
}

function handleWordsInput(inp) {
    const v = inp.value;
    if (!S.wordsStart && v.length > 0) {
        S.wordsStart = Date.now();
        S.wordsTimer = setInterval(() => {
            const s = Math.round((Date.now() - S.wordsStart) / 1000);
            document.getElementById('w-time').textContent = s + 's';
            document.getElementById('w-wpm').textContent = calcWPM(S.wordsCorrect, Date.now() - S.wordsStart);
        }, 500);
    }
    if (v.endsWith(' ')) {
        const typed = v.trim();
        const target = S.wordsArr[S.wordIdx];
        if (typed === target) { S.wordsCorrect += typed.length + 1; S.wordsCombo++; }
        else { S.wordsErrors++; S.wordsCombo = 0; }
        document.getElementById('w-acc').textContent = calcAcc(S.wordsCorrect, S.wordsCorrect + S.wordsErrors) + '%';
        document.getElementById('w-combo').textContent = S.wordsCombo;
        S.wordIdx++;
        inp.value = '';
        if (S.wordIdx >= S.wordsArr.length) {
            clearInterval(S.wordsTimer);
            const wpm = calcWPM(S.wordsCorrect, Date.now() - S.wordsStart);
            const acc = calcAcc(S.wordsCorrect, S.wordsCorrect + S.wordsErrors);
            S.completedLessons.add(S.currentLesson);
            S.wpmHistory.push(wpm);
            if (wpm > S.bestWPM) S.bestWPM = wpm;
            S.xp += Math.round(wpm * (acc / 100) * 2);
            document.getElementById('total-xp').textContent = S.xp;
            showResult(wpm, acc, LESSONS[S.currentLesson].goal);
            updateProgress();
            return;
        }
        renderWords();
    }
}

// PRACTICE
let practiceText = '';
function initPractice() { newPractice(); }
function newPractice() {
    const diff = document.getElementById('p-diff').value;
    const wordCount = diff === 'easy' ? 12 : diff === 'medium' ? 18 : 24;
    practiceText = generateRandomText(diff, wordCount);
    S.practiceWords = practiceText.split(/\s+/);
    S.practiceIdx = 0; S.practiceStart = null; S.practiceCombo = 0; S.practiceCorrect = 0;
    renderPractice();
    document.getElementById('practice-input').value = '';
    document.getElementById('p-wpm').textContent = '0';
    document.getElementById('p-acc').textContent = '100%';
    document.getElementById('p-combo').textContent = '0';
    document.getElementById('p-chars').textContent = '0';
}

function renderPractice() {
    const c = document.getElementById('practice-display');
    c.innerHTML = S.practiceWords.map((w, i) => {
        if (i < S.practiceIdx) return `<span class="w-correct">${w}</span>`;
        if (i === S.practiceIdx) return `<span class="w-cur">${w}</span>`;
        return `<span>${w}</span>`;
    }).join(' ');
}

function handlePracticeInput(inp) {
    const v = inp.value;
    if (!S.practiceStart && v.length > 0) S.practiceStart = Date.now();
    if (v.endsWith(' ')) {
        const typed = v.trim();
        const target = S.practiceWords[S.practiceIdx];
        if (typed === target) { S.practiceCorrect += typed.length + 1; S.practiceCombo++; }
        else S.practiceCombo = 0;
        document.getElementById('p-acc').textContent = calcAcc(S.practiceCorrect, S.practiceCorrect + (S.practiceIdx - S.practiceCorrect)) + '%';
        document.getElementById('p-combo').textContent = S.practiceCombo;
        document.getElementById('p-chars').textContent = S.practiceCorrect;
        if (S.practiceStart) document.getElementById('p-wpm').textContent = calcWPM(S.practiceCorrect, Date.now() - S.practiceStart);
        S.practiceIdx++; inp.value = '';
        if (S.practiceIdx >= S.practiceWords.length) {
            const wpm = calcWPM(S.practiceCorrect, Date.now() - S.practiceStart);
            S.wpmHistory.push(wpm); if (wpm > S.bestWPM) S.bestWPM = wpm;
            updateProgress();
            setTimeout(newPractice, 600);
        } else renderPractice();
    }
}

// SPEED TEST
function initTest() {
    const generatedText = generateRandomText('medium', 160);
    const words = generatedText.trim().split(/\s+/);
    S.testWords = words.slice(0, 80);
    renderTest();
}

function renderTest() {
    const c = document.getElementById('test-display');
    c.innerHTML = S.testWords.map((w, i) => {
        if (i < S.testIdx) return `<span class="tc">${w}</span>`;
        if (i === S.testIdx) return `<span class="tk">${w}</span>`;
        return `<span>${w}</span>`;
    }).join(' ');
}

function handleTestInput(inp) {
    const v = inp.value;
    if (!S.testStarted && v.trim().length > 0) {
        S.testStarted = true;
        const dur = parseInt(document.getElementById('test-dur').value);
        S.testTimeLeft = dur;
        S.testStart = Date.now();
        S.testTimer = setInterval(() => {
            S.testTimeLeft--;
            document.getElementById('t-timer').textContent = S.testTimeLeft;
            document.getElementById('t-wpm').textContent = calcWPM(S.testCorrect, Date.now() - S.testStart);
            if (S.testTimeLeft <= 0) endTest();
        }, 1000);
    }
    if (v.endsWith(' ')) {
        const typed = v.trim();
        const target = S.testWords[S.testIdx];
        if (typed === target) S.testCorrect += typed.length + 1;
        document.getElementById('t-acc').textContent = calcAcc(S.testCorrect, S.testCorrect + (S.testIdx + 1) * 4) + '%';
        S.testIdx++; inp.value = ''; renderTest();
    }
}

function endTest() {
    clearInterval(S.testTimer);
    const dur = parseInt(document.getElementById('test-dur').value);
    const wpm = calcWPM(S.testCorrect, dur * 1000);
    const acc = parseInt(document.getElementById('t-acc').textContent) || 100;
    if (wpm > S.bestWPM) S.bestWPM = wpm;
    S.wpmHistory.push(wpm); S.testCount++;
    document.getElementById('t-best').textContent = S.bestWPM;
    document.getElementById('test-input').disabled = true;
    S.xp += Math.round(wpm * 3); document.getElementById('total-xp').textContent = S.xp;
    showResult(wpm, acc, 50, 'test');
    updateProgress();
}

function resetTest() {
    clearInterval(S.testTimer);
    S.testStarted = false; S.testCorrect = 0; S.testIdx = 0;
    const dur = parseInt(document.getElementById('test-dur').value);
    S.testTimeLeft = dur;
    document.getElementById('t-timer').textContent = dur;
    document.getElementById('t-wpm').textContent = '0';
    document.getElementById('t-acc').textContent = '100%';
    document.getElementById('test-input').value = '';
    document.getElementById('test-input').disabled = false;
    initTest();
}

// RESULT POPUP
let resultMode = 'lesson';
function showResult(wpm, acc, goal, mode = 'lesson') {
    resultMode = mode;
    const pct = wpm / goal;
    const emoji = pct >= 1 ? '🎉' : pct >= .8 ? '👍' : '💪';
    const title = pct >= 1 ? 'Excellent!' : pct >= .8 ? 'Well done!' : 'Keep going!';
    document.getElementById('res-emoji').textContent = emoji;
    document.getElementById('res-title').textContent = title;
    document.getElementById('res-wpm').textContent = wpm;
    document.getElementById('res-acc').textContent = acc + '%';
    document.getElementById('res-goal').textContent = 'Goal: ' + goal;
    document.getElementById('result-overlay').classList.add('show');
}
function closeResult() {
    document.getElementById('result-overlay').classList.remove('show');
}

// PROGRESS PAGE
function updateProgress() {
    const bySkill = { home: 0, top: 0, bot: 0, num: 0 };
    const maxSkill = { home: 4, top: 3, bot: 2, num: 1 };
    S.completedLessons.forEach(i => { const s = LESSONS[i].skill; if (bySkill[s] !== undefined) bySkill[s]++; });
    ['home', 'top', 'bot', 'num'].forEach(s => {
        const pct = Math.min(100, Math.round((bySkill[s] / maxSkill[s]) * 100));
        document.getElementById('sk-' + s).style.width = pct + '%';
        document.getElementById('sk-' + s + '-v').textContent = pct + '%';
    });
    const spd = Math.min(100, Math.round((S.bestWPM / 80) * 100));
    document.getElementById('sk-spd').style.width = spd + '%';
    document.getElementById('sk-spd-v').textContent = spd + '%';
    const avg = S.wpmHistory.length ? Math.round(S.wpmHistory.reduce((a, b) => a + b, 0) / S.wpmHistory.length) : 0;
    document.getElementById('pr-best').textContent = S.bestWPM;
    document.getElementById('pr-avg').textContent = avg;
    document.getElementById('pr-done').textContent = S.completedLessons.size;
    document.getElementById('pr-tests').textContent = S.testCount;
    renderBadges(); renderChart();
}

function renderBadges() {
    const BADGES = [
        { l: 'First step', e: S.completedLessons.size >= 1 },
        { l: 'Half way', e: S.completedLessons.size >= 5 },
        { l: 'All lessons', e: S.completedLessons.size >= LESSONS.length },
        { l: '30 WPM', e: S.bestWPM >= 30 },
        { l: '50 WPM', e: S.bestWPM >= 50 },
        { l: '70 WPM', e: S.bestWPM >= 70 },
        { l: '5 tests', e: S.testCount >= 5 },
        { l: 'Speed demon', e: S.bestWPM >= 90 },
    ];
    document.getElementById('badges').innerHTML = BADGES.map(b => `<div class="badge${b.e ? ' earned' : ''}">${b.e ? '✓ ' : ''}${b.l}</div>`).join('');
}

let _chart = null;
function renderChart() {
    const canvas = document.getElementById('wpm-chart');
    if (!canvas || !window.Chart) return;
    const data = S.wpmHistory.slice(-12);
    if (_chart) _chart.destroy();
    _chart = new Chart(canvas, {
        type: 'line',
        data: { labels: data.map((_, i) => `#${S.wpmHistory.length - data.length + i + 1}`), datasets: [{ label: 'WPM', data, borderColor: '#4db8ff', backgroundColor: 'rgba(77,184,255,0.07)', tension: .35, pointRadius: 4, pointBackgroundColor: '#4db8ff', fill: true }] },
        options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#4a5568' } }, x: { grid: { display: false }, ticks: { color: '#4a5568' } } } }
    });
}

// SCREEN SWITCHER
function showScreen(name, btn) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    document.getElementById('screen-' + name).classList.add('active');
    if (btn) btn.classList.add('active');
    if (name === 'fingers') initFingers();
    if (name === 'practice') initPractice();
    if (name === 'test') { initTest(); resetTest(); }
    if (name === 'progress') updateProgress();
    if (name === 'lessons') buildLessonGrid();
}

// HELPERS
function calcWPM(chars, ms) { if (ms < 500) return 0; return Math.round((chars / 5) / (ms / 60000)); }
function calcAcc(correct, total) { if (total === 0) return 100; return Math.round((correct / total) * 100); }

// GLOBAL KEYDOWN for press feedback
document.addEventListener('keydown', e => {
    const active = document.activeElement;
    if (active && active.id === 'words-input') pressKB('learn-kb', e.key.toLowerCase());
});

// FINGER PLACEMENT FEATURE

// QWERTY finger map — data-finger attribute per key
const FP_KEY_MAP = {
    // Numbers row
    '`': 'L-pinky', '1': 'L-pinky', '2': 'L-ring', '3': 'L-middle', '4': 'L-index', '5': 'L-index',
    '6': 'R-index', '7': 'R-index', '8': 'R-middle', '9': 'R-ring', '0': 'R-pinky', '-': 'R-pinky', '=': 'R-pinky', '⌫': 'R-pinky',
    // Top row
    'Tab': 'L-pinky', 'q': 'L-pinky', 'w': 'L-ring', 'e': 'L-middle', 'r': 'L-index', 't': 'L-index',
    'y': 'R-index', 'u': 'R-index', 'i': 'R-middle', 'o': 'R-ring', 'p': 'R-pinky', '[': 'R-pinky', ']': 'R-pinky', '\\': 'R-pinky',
    // Home row
    'Caps': 'L-pinky', 'a': 'L-pinky', 's': 'L-ring', 'd': 'L-middle', 'f': 'L-index', 'g': 'L-index',
    'h': 'R-index', 'j': 'R-index', 'k': 'R-middle', 'l': 'R-ring', ';': 'R-pinky', "'": 'R-pinky', '↵': 'R-pinky',
    // Bottom row
    '⇧': 'L-pinky', 'z': 'L-pinky', 'x': 'L-ring', 'c': 'L-middle', 'v': 'L-index', 'b': 'L-index',
    'n': 'R-index', 'm': 'R-index', ',': 'R-middle', '.': 'R-ring', '/': 'R-pinky',
    // Space
    'Space': 'thumb', 'Ctrl': 'L-pinky', 'Alt': 'thumb'
};

const HOME_KEYS = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];

const FP_STEPS_DATA = [
    {
        id: 0, label: 'Overview',
        finger: null, // show all
        title: 'All fingers — At a glance',
        desc: 'Every color represents a different finger. 🟢 Index fingers (F and J) — these are the home positions, recognize them by the bumps. 🔵 Middle fingers D and K. 🟣 Ring fingers S and L. 🩷 Pinky fingers A and ;. 🟡 Thumbs are only for the Space bar. The F and J keys have a raised line — this is your home position, keep your hands there without looking.',
        stepColor: '#fbbf24'
    },
    {
        id: 1, label: 'Pinky fingers',
        finger: ['L-pinky', 'R-pinky'],
        title: 'Pinky finger — Pink keys',
        desc: 'Left pinky: A, Q, Z, Tab, Caps, Shift, 1, ` \nRight pinky: ;, P, /, Enter, Backspace, 0, -, =\n\nThe pinky is the weakest finger but very important. A and ; are your home positions. Don\'t stretch too far — move your hand a little toward the key.',
        stepColor: '#ff6b9d',
        drillKeys: ['a', 'a', 'a', ';', ';', ';', 'a', ';', 'a', ';']
    },
    {
        id: 2, label: 'Ring fingers',
        finger: ['L-ring', 'R-ring'],
        title: 'Ring finger — Purple keys',
        desc: 'Left ring: S, W, X, 2\nRight ring: L, O, ., 9\n\nS and L are the ring finger positions on the home row. These keys are one space ahead of A/;. Let the other fingers stay in place when the ring finger moves.',
        stepColor: '#c084fc',
        drillKeys: ['s', 's', 'l', 'l', 's', 'l', 's', 's', 'l', 's']
    },
    {
        id: 3, label: 'Middle fingers',
        finger: ['L-middle', 'R-middle'],
        title: 'Middle finger — Blue keys',
        desc: 'Left middle: D, E, C, 3\nRight middle: K, I, ,, 8\n\nD and K are the middle finger positions on the home row. The middle finger is naturally the longest, so reaching the top row is easier. C and , are on the bottom row.',
        stepColor: '#60a5fa',
        drillKeys: ['d', 'd', 'k', 'k', 'd', 'k', 'd', 'k', 'd', 'd']
    },
    {
        id: 4, label: 'Index fingers',
        finger: ['L-index', 'R-index'],
        title: 'Index finger — Green keys',
        desc: 'Left index: F, R, V, G, T, B, 4, 5\nRight index: J, U, M, H, Y, N, 6, 7\n\nIndex fingers cover the most keys! F and J are the home positions — feel them by the bumps. These fingers also handle the middle columns (G/H, T/Y, B/N).',
        stepColor: '#34d399',
        drillKeys: ['f', 'f', 'j', 'j', 'g', 'h', 'f', 'j', 'g', 'h']
    },
    {
        id: 5, label: 'Thumbs',
        finger: ['thumb'],
        title: 'Thumbs — Space bar',
        desc: 'Both thumbs are for the Space bar. Generally the right thumb is used more, but both can work.\n\nPress Space after every word — whenever you type any key with the left or right side, press Space with the thumb on that side. This creates rhythm.',
        stepColor: '#fbbf24',
        drillKeys: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    },
    {
        id: 6, label: 'Practice drill',
        finger: null,
        title: 'Set your hands — Practice!',
        desc: 'Now place your hands on ASDF JKL; — feel the bumps on F and J. Then press the highlighted key in the drill below. Do it without looking at the keyboard!',
        stepColor: 'var(--accent)',
        drillKeys: ['f', 'j', 'd', 'k', 's', 'l', 'a', ';', 'f', 'j', 'g', 'h', 'd', 'k', 's', 'l', 'a', ';', ' ', 'f']
    }
];

let fpState = { step: 0, drillIdx: 0, drillTotal: 0, drillCorrect: 0, showAll: false };

function fpBuildKeyboard() {
    const KB = [
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '⌫'],
        ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
        ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '↵'],
        ['⇧', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '⇧'],
        ['Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl']
    ];
    const WIDE_FP = ['⌫', 'Tab', 'Caps', '↵'];
    const WIDER_FP = ['⇧'];
    const SPACE_FP = ['Space'];

    const wrap = document.getElementById('fp-keyboard');
    if (!wrap) return;
    wrap.innerHTML = '';
    const kb = document.createElement('div');
    kb.id = 'fp-kb-inner';
    KB.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'kb-row';
        rowDiv.style.cssText = 'display:flex;flex-wrap:nowrap;justify-content:center;gap:4px;margin-bottom:4px';
        row.forEach(k => {
            const el = document.createElement('div');
            el.className = 'fp-key';
            if (WIDE_FP.includes(k)) el.classList.add('wide');
            if (WIDER_FP.includes(k)) el.classList.add('wider');
            if (SPACE_FP.includes(k)) el.classList.add('space-key');
            const finger = FP_KEY_MAP[k] || FP_KEY_MAP[k.toLowerCase()];
            if (finger) el.dataset.finger = finger;
            el.textContent = k;
            if (HOME_KEYS.includes(k.toLowerCase())) el.classList.add('home-dot');
            rowDiv.appendChild(el);
        });
        kb.appendChild(rowDiv);
    });
    wrap.appendChild(kb);
}

function fpSetStep(stepIdx) {
    fpState.step = stepIdx;
    // Update step buttons
    document.querySelectorAll('.fp-step').forEach((b, i) => {
        b.classList.toggle('active', i === stepIdx);
        const s = FP_STEPS_DATA[i];
        if (i === stepIdx) b.style.background = s.stepColor;
        else b.style.background = '';
    });

    const s = FP_STEPS_DATA[stepIdx];

    // Update keyboard highlight
    document.querySelectorAll('[data-finger]').forEach(el => {
        el.classList.remove('highlight', 'show-all');
        if (s.finger === null && stepIdx === 0) {
            el.classList.add('show-all');
        } else if (s.finger && s.finger.includes(el.dataset.finger)) {
            el.classList.add('highlight');
        }
    });

    // Update info
    document.getElementById('fp-info-title').textContent = s.title;
    document.getElementById('fp-info-desc').style.whiteSpace = 'pre-line';
    document.getElementById('fp-info-desc').textContent = s.desc;

    // Drill vs info
    const drillArea = document.getElementById('fp-drill-area');
    if (stepIdx === 6) {
        drillArea.style.display = 'block';
        fpStartDrill(s.drillKeys);
    } else {
        drillArea.style.display = 'none';
    }

    // Prev/next buttons
    document.getElementById('fp-prev-btn').style.opacity = stepIdx === 0 ? '0.3' : '1';
    document.getElementById('fp-next-btn').textContent = stepIdx === 6 ? '↺ Restart' : 'Next →';
}

function fpPrev() { if (fpState.step > 0) fpSetStep(fpState.step - 1); }
function fpNext() {
    if (fpState.step < 6) fpSetStep(fpState.step + 1);
    else fpSetStep(0);
}

function fpClickLegend(f1, f2) {
    document.querySelectorAll('[data-finger]').forEach(el => {
        el.classList.remove('highlight', 'show-all');
        if (el.dataset.finger === f1 || (f2 && el.dataset.finger === f2)) {
            el.classList.add('highlight');
        }
    });
    document.querySelectorAll('.fp-leg-item').forEach(item => item.classList.remove('active-leg'));
}

function fpStartDrill(keys) {
    fpState.drillIdx = 0;
    fpState.drillTotal = keys.length;
    fpState.drillCorrect = 0;
    const c = document.getElementById('fp-drill-keys');
    c.innerHTML = '';
    keys.forEach((k, i) => {
        const el = document.createElement('div');
        el.className = 'fp-drill-key';
        el.dataset.f = FP_KEY_MAP[k] || FP_KEY_MAP[k.toLowerCase()] || 'thumb';
        el.textContent = k === ' ' ? '␣' : k.toUpperCase();
        if (i === 0) el.classList.add('current');
        c.appendChild(el);
    });
    fpUpdateDrillMsg(keys[0]);
    document.getElementById('fp-drill-prog').style.width = '0%';
    document.getElementById('fp-drill-input').value = '';
    document.getElementById('fp-drill-input').focus();

    // Highlight keyboard
    const f = FP_KEY_MAP[keys[0]] || FP_KEY_MAP[keys[0].toLowerCase()] || 'thumb';
    fpHighlightDrillKey(keys[0]);
}

function fpHighlightDrillKey(k) {
    document.querySelectorAll('[data-finger]').forEach(el => {
        el.classList.remove('highlight', 'show-all');
    });
    const kl = k.toLowerCase();
    document.querySelectorAll('[data-finger]').forEach(el => {
        if (el.textContent.toLowerCase() === kl || (k === ' ' && el.textContent === 'Space')) {
            el.classList.add('highlight');
        }
    });
}

function fpUpdateDrillMsg(k) {
    const f = FP_KEY_MAP[k] || FP_KEY_MAP[(k || '').toLowerCase()] || 'thumb';
    const fNames = { 'L-pinky': 'left pinky', 'L-ring': 'left ring', 'L-middle': 'left middle', 'L-index': 'left index', 'R-pinky': 'right pinky', 'R-ring': 'right ring', 'R-middle': 'right middle', 'R-index': 'right index', 'thumb': 'thumb' };
    const key = k === ' ' ? 'Space' : k.toUpperCase();
    document.getElementById('fp-drill-msg').textContent = `Press "${key}" using your ${fNames[f] || f} finger`;
}

document.addEventListener('keydown', e => {
    if (document.activeElement.id === 'fp-drill-input') {
        e.preventDefault();
        const drillKeysEl = document.querySelectorAll('.fp-drill-key');
        const s = FP_STEPS_DATA[6];
        const allKeys = s.drillKeys;
        if (fpState.drillIdx >= allKeys.length) return;

        const expected = allKeys[fpState.drillIdx];
        const pressed = e.key;
        const correct = (pressed === expected) || (expected === ' ' && pressed === ' ') || (pressed.toLowerCase() === expected.toLowerCase());

        const curEl = drillKeysEl[fpState.drillIdx];
        if (correct) {
            curEl.classList.remove('current');
            curEl.classList.add('done');
            fpState.drillCorrect++;
            fpState.drillIdx++;
            const pct = Math.round((fpState.drillIdx / fpState.drillTotal) * 100);
            document.getElementById('fp-drill-prog').style.width = pct + '%';
            if (fpState.drillIdx >= fpState.drillTotal) {
                document.getElementById('fp-drill-msg').textContent = `✓ All correct! ${fpState.drillCorrect}/${fpState.drillTotal} correct. Try again!`;
                fpHighlightDrillKey('');
                setTimeout(() => fpStartDrill(allKeys), 1200);
                return;
            }
            const next = allKeys[fpState.drillIdx];
            drillKeysEl[fpState.drillIdx].classList.add('current');
            fpUpdateDrillMsg(next);
            fpHighlightDrillKey(next);
        } else {
            curEl.classList.add('wrong-flash');
            setTimeout(() => curEl.classList.remove('wrong-flash'), 220);
        }
    }
});

function initFingers() {
    fpBuildKeyboard();
    fpSetStep(0);
}

// INIT 
buildLessonGrid();