'use strict';

const LESSONS = [
  { id:1,  title:'Anchor Keys: F & J',  keys:['f','j'],                                done:false, current:true },
  { id:2,  title:'Middle Fingers: D & K',keys:['d','k'],                                done:false },
  { id:3,  title:'Ring Fingers: S & L',  keys:['s','l'],                                done:false },
  { id:4,  title:'Pinky Fingers: A & ;', keys:['a',';'],                                done:false },
  { id:5,  title:'Home Row: G & H',      keys:['g','h'],                                done:false },
  { id:6,  title:'Upper Row: R & U',     keys:['r','u'],                                done:false },
  { id:7,  title:'Upper Row: T & Y',     keys:['t','y'],                                done:false },
  { id:8,  title:'Upper Row: E & I',     keys:['e','i'],                                done:false },
  { id:9,  title:'Upper Row: W & O',     keys:['w','o'],                                done:false },
  { id:10, title:'Upper Row: Q & P',     keys:['q','p'],                                done:false },
  { id:11, title:'Home Row Review',      keys:['a','s','d','f','g','h','j','k','l',';'],done:false },
  { id:12, title:'Lower Row: V & M',     keys:['v','m'],                                done:false },
  { id:13, title:'Lower Row: C & ,',     keys:['c',','],                                done:false },
  { id:14, title:'Lower Row: X & .',     keys:['x','.'],                                done:false },
  { id:15, title:'Lower Row: Z & /',     keys:['z','/'],                                done:false },
  { id:16, title:'Bottom Row Review',    keys:['z','x','c','v','m',',','.','/'],        done:false },
  { id:17, title:'Numbers: 4 & 7',       keys:['4','7'],                                done:false },
  { id:18, title:'Numbers: 3 & 8',       keys:['3','8'],                                done:false },
  { id:19, title:'Numbers: 2 & 9',       keys:['2','9'],                                done:false },
  { id:20, title:'Numbers: 1 & 0',       keys:['1','0'],                                done:false },
  { id:21, title:'Numbers Review',       keys:['1','2','3','4','5','6','7','8','9','0'],done:false },
  { id:22, title:'Shift Caps A-F',       keys:['A','S','D','F','G'],                    done:false },
  { id:23, title:'Shift Caps J-L',       keys:['J','K','L'],                            done:false },
  { id:24, title:'Shift Upper Caps',     keys:['Q','W','E','R','T','Y','U','I','O','P'],done:false },
  { id:25, title:'Shift Lower Caps',     keys:['Z','X','C','V','B','N','M'],            done:false },
  { id:26, title:'Common Words I',       keys:['a','s','d','f','g','h','j','k','l','e','i','o','u'],done:false },
  { id:27, title:'Full Keyboard',        keys:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],done:false },
  { id:11, title:'Lower Row: V & M',    keys:['v','m'],                                done:false },
  { id:12, title:'Lower Row: C & ,',    keys:['c',','],                                done:false },
  { id:13, title:'Lower Row: X & .',    keys:['x','.'],                                done:false },
  { id:14, title:'Lower Row: Z & /',    keys:['z','/'],                                done:false },
  { id:15, title:'Review Lower Row',    keys:['z','x','c','v','b','n','m',',','.','/'],done:false },
  { id:16, title:'Numbers: 4 & 7',      keys:['4','7'],                                done:false },
  { id:17, title:'Numbers: 3 & 8',      keys:['3','8'],                                done:false },
  { id:18, title:'Numbers: 2 & 9',      keys:['2','9'],                                done:false },
  { id:19, title:'Numbers: 1 & 0',      keys:['1','0'],                                done:false },
  { id:20, title:'Review Numbers',      keys:['1','2','3','4','5','6','7','8','9','0'],done:false },
  { id:21, title:'Shift: Capitals A-F', keys:['A','S','D','F','G'],                    done:false },
  { id:22, title:'Shift: Capitals J-L', keys:['J','K','L'],                            done:false },
  { id:23, title:'Shift: Upper Caps',   keys:['Q','W','E','R','T','Y','U','I','O','P'],done:false },
  { id:24, title:'Shift: Lower Caps',   keys:['Z','X','C','V','B','N','M'],            done:false },
  { id:25, title:'Common Words I',      keys:['a','s','d','f','g','h','j','k','l','e','i','r','u'],done:false },
  { id:26, title:'Common Words II',     keys:['t','y','w','o','q','p','v','m','c','n','b'],done:false },
  { id:27, title:'Full Keyboard',       keys:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],done:false },
];
 
const KEYBOARD_LAYOUT = [
  ['`','1','2','3','4','5','6','7','8','9','0','-','=','⌫'],
  ['⇥','q','w','e','r','t','y','u','i','o','p','[',']','\\'],
  ['⇪','a','s','d','f','g','h','j','k','l',';',"'",'↩'],
  ['⇧','z','x','c','v','b','n','m',',','.','/','⇧'],
  ['fn','⌃','⌥','⌘',' ','⌘','⌥','◀','▲','▼','▶'],
];
 
const KEY_WIDTHS = {
  '⌫':'kw-175','⇥':'kw-15','\\':'kw-175','⇪':'kw-2','↩':'kw-225',
  '⇧':'kw-275','fn':'kw-15','⌃':'kw-15','⌥':'kw-15','⌘':'kw-2',
  ' ':'kw-sp',
};
 
const FINGER_MAP = {
  '`':'lp','1':'lp','2':'lr','3':'lm','4':'li','5':'li',
  '6':'ri','7':'ri','8':'rm','9':'rr','0':'rp','-':'rp','=':'rp',
  'q':'lp','w':'lr','e':'lm','r':'li','t':'li',
  'y':'ri','u':'ri','i':'rm','o':'rr','p':'rp','[':'rp',']':'rp','\\':'rp',
  'a':'lp','s':'lr','d':'lm','f':'li','g':'li',
  'h':'ri','j':'ri','k':'rm','l':'rr',';':'rp',"'":'rp',
  'z':'lp','x':'lr','c':'lm','v':'li','b':'li',
  'n':'ri','m':'ri',',':'rm','.':'rr','/':'rp',
  ' ':'th','⌘':'th','⌥':'th','⌃':'th','fn':'lp',
  '⇥':'lp','⇪':'lp','⇧':'lp','⌫':'rp','↩':'rp',
};
 
// Maps finger code → CSS variable
const FINGER_COLORS = {
  'lp':'var(--f-lp)','lr':'var(--f-lr)','lm':'var(--f-lm)','li':'var(--f-li)',
  'ri':'var(--f-ri)','rm':'var(--f-rm)','rr':'var(--f-rr)','rp':'var(--f-rp)',
  'th':'var(--f-th)',
};
 
// Word banks for text generation
const WORD_BANKS = {
  home:   ['ask','dad','fall','add','slag','flash','glad','flask','hall','lad','flag','lass','glass'],
  upper:  ['ripe','tire','wire','euro','tour','your','poet','quit','wipe','trio','pour','rope'],
  lower:  ['verb','cave','move','zinc','flex','vibe','vent','corn','comb','dove','civic','exam'],
  common: ['the','and','for','are','but','not','you','all','can','her','was','one','our','out',
           'day','get','has','him','his','how','man','new','now','old','see','two','way','who'],
  full:   ['quick','brown','fox','jumps','over','lazy','dog','pack','my','box','with','five','dozen',
           'liquor','jugs','how','vexingly','bright','quiz','gawked','jumbo','sphinx'],
};

const LESSON_WORD_BANK = [
  'faj', 'jaf', 'fade', 'safe', 'jazz', 'mask', 'task',
  'desk', 'desk', 'desk', 'milk', 'dill', 'kill', 'skill', 'dusk',
  'lass', 'sell', 'less', 'sill', 'sell', 'alls', 'lass',
  'sass', 'alfa', 'fall', 'jail', 'jazz', 'gala', 'halo', 'joke',
  'have', 'tape', 'type', 'your', 'tour', 'home', 'word', 'high',
  'made', 'take', 'note', 'time', 'tone', 'zone', 'made', 'mine',
  'road', 'pray', 'pack', 'quay', 'quit', 'rope', 'your', 'work',
  'move', 'come', 'zone', 'nice', 'code', 'safe', 'case', 'mice', 'vase',
];
 
// ============================================
// STATE
// ============================================
let state = {
  currentView: 'learn',
  currentLesson: null,
  currentLessonIdx: 0,
 
  // typing state
  typingText: '',
  typedInput: '',
  charStates: [],       // 'pending' | 'correct' | 'wrong'
  cursorIdx: 0,
  errorState: false,    // true = waiting for correct key, cursor stays put
 
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
  soundEnabled: true,  // ON by default
};
 
// ============================================
// DOM REFS
// ============================================
const $ = id => document.getElementById(id);
 
const DOM = {
  views:          document.querySelectorAll('.view'),
  navPills:       document.querySelectorAll('.nav-pill'),
  langItems:      document.querySelectorAll('.lang-item'),
  lessonsGrid:    $('lessons-grid'),
  keyboard:       $('keyboard'),
  typingBox:      $('typing-box'),
  typingText:     $('typing-text'),
  hiddenInput:    $('hidden-input'),
  typingHint:     $('typing-hint'),
  statWpm:        $('stat-wpm'),
  statAcc:        $('stat-acc'),
  statTime:       $('stat-time'),
  statChars:      $('stat-chars'),
  lessonBadge:    $('lesson-badge'),
  lessonNameSm:   $('lesson-name-sm'),
  backBtn:        $('back-btn'),
  restartBtn:     $('restart-btn'),
  prevBtn:        $('prev-lesson-btn'),
  nextBtn:        $('next-lesson-btn'),
  handsRow:       $('hands-row'),
  sidebar:        $('sidebar'),
  sidebarToggleBtn:$('sidebar-toggle-btn'),
  leftHandSvg:    $('left-hand-svg'),
  rightHandSvg:   $('right-hand-svg'),
  modalOverlay:   $('modal-overlay'),
  modalWpm:       $('modal-wpm'),
  modalAcc:       $('modal-acc'),
  modalTime:      $('modal-time'),
  modalRetry:     $('modal-retry'),
  modalNext:      $('modal-next'),
  progressFill:   $('progress-fill'),
  progressPct:    $('progress-pct'),
  progressLessons:$('progress-lessons'),
  toggleKeyboard: $('toggle-keyboard'),
  toggleHands:    $('toggle-hands'),
  toggleColors:   $('toggle-colors'),
  toggleSound:    $('toggle-sound'),
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
    showView(v);
  });
});

function isSidebarOpen() {
  if (!DOM.sidebar) return false;
  if (window.innerWidth <= 768) {
    return DOM.sidebar.classList.contains('open');
  }
  return !DOM.sidebar.classList.contains('closed');
}

function setSidebarOpen(open) {
  if (!DOM.sidebar || !DOM.sidebarToggleBtn) return;
  if (window.innerWidth <= 768) {
    DOM.sidebar.classList.toggle('open', open);
    DOM.sidebar.classList.toggle('closed', !open);
  } else {
    DOM.sidebar.classList.toggle('closed', !open);
    DOM.sidebar.classList.remove('open');
  }
  DOM.sidebarToggleBtn.setAttribute('aria-expanded', String(open));
}

DOM.sidebarToggleBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  setSidebarOpen(!isSidebarOpen());
});

document.addEventListener('click', (event) => {
  if (!DOM.sidebar || !DOM.sidebarToggleBtn) return;
  if (!isSidebarOpen()) return;
  if (DOM.sidebar.contains(event.target) || DOM.sidebarToggleBtn.contains(event.target)) return;
  setSidebarOpen(false);
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
    card.addEventListener('click', () => {
      if (!lesson.current && !lesson.done) return;
      launchLesson(idx);
    });
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
  const practiceLines = [];

  if (letters.length <= 2) {
    practiceLines.push(...buildFamiliaritySteps(letters));
    practiceLines.push(...buildCombinationSteps(letters));
  } else {
    practiceLines.push(...buildFamiliaritySteps(letters));
    practiceLines.push(...buildCombinationSteps(letters));
    const wordPractice = buildWordPractice(letters, 6);
    if (wordPractice.length > 0) {
      practiceLines.push(...wordPractice);
    } else {
      practiceLines.push(...buildCombinationSteps(letters, 4, true));
    }
  }

  if (specials.length > 0 && practiceLines.length < 12) {
    practiceLines.push(...specials.map(ch => `${ch} ${ch} ${ch}`).slice(0, 3));
  }

  state.typingText = practiceLines.slice(0, 45).join(' ');
}

function buildFamiliaritySteps(keys) {
  if (keys.length === 0) return [];
  if (keys.length === 1) {
    const k = keys[0];
    return [
      `${k.repeat(4)}`,
      `${k.repeat(5)}`,
      `${k.repeat(3)} ${k.repeat(3)}`,
      `${k.repeat(4)} ${k.repeat(4)}`,
    ];
  }
  if (keys.length === 2) {
    const [a, b] = keys;
    return [
      `${a.repeat(4)}`,
      `${b.repeat(4)}`,
      `${a.repeat(2)}${b.repeat(2)}`,
      `${b.repeat(2)}${a.repeat(2)}`,
      `${a.repeat(3)}${b.repeat(2)}`,
      `${b.repeat(3)}${a.repeat(2)}`,
    ];
  }

  const [a, b, c] = keys;
  return [
    `${a.repeat(4)}`,
    `${b.repeat(4)}`,
    `${c.repeat(4)}`,
    `${a.repeat(2)}${b.repeat(2)}`,
    `${a}${b}${c}${b}`,
    `${a}${b}${c}`,
  ];
}

function buildCombinationSteps(keys, count = 6, allowLonger = false) {
  const patterns = [];
  const base = keys.slice(0, Math.min(keys.length, 4));

  if (keys.length === 1) {
    const k = keys[0];
    patterns.push(`${k.repeat(4)}`);
    patterns.push(`${k.repeat(5)}`);
    patterns.push(`${k.repeat(3)} ${k.repeat(2)}`);
    patterns.push(`${k.repeat(2)} ${k.repeat(3)}`);
  } else if (keys.length === 2) {
    const [a, b] = keys;
    patterns.push(`${a.repeat(4)}`);
    patterns.push(`${b.repeat(4)}`);
    patterns.push(`${a.repeat(3)}${b}`);
    patterns.push(`${b.repeat(3)}${a}`);
    patterns.push(`${a.repeat(2)}${b.repeat(2)}`);
    patterns.push(`${a.repeat(3)}${b.repeat(2)}`);
    patterns.push(`${b.repeat(3)}${a.repeat(2)}`);
    patterns.push(`${a.repeat(4)}${b}`);
    patterns.push(`${b.repeat(4)}${a}`);
  } else {
    patterns.push(base.join(''));
    patterns.push(base.slice().reverse().join(''));
    patterns.push(`${base[0].repeat(3)}${base[1] || ''}`);
    if (base[1]) patterns.push(`${base[1].repeat(3)}${base[0]}`);
    if (base.length >= 3) patterns.push(`${base[0]}${base[1]}${base[2]}${base[1]}`);
    if (base.length >= 4) patterns.push(`${base[0]}${base[1]}${base[2]}${base[3]}${base[2]}`);
  }

  while (patterns.length < count) {
    const next = keys.slice(0, Math.min(keys.length, 4)).map((k, idx) => k.repeat(idx + 2)).join('');
    if (!patterns.includes(next)) patterns.push(next);
    else break;
  }

  return patterns.slice(0, count);
}

function buildWordPractice(keys, maxCount = 6) {
  const allowed = new Set(keys);
  const validWords = LESSON_WORD_BANK.filter(word => {
    return word.length >= 3 && word.length <= 4 && [...new Set(word)].every(ch => allowed.has(ch));
  });
  if (validWords.length === 0) return [];
  return validWords.slice(0, maxCount);
}
 
// ============================================
// TYPING STATE RESET
// ============================================
function resetTypingState() {
  stopTimer();
  state.typedInput = '';
  state.charStates = state.typingText.split('').map(() => 'pending');
  state.cursorIdx = 0;
  state.errorState = false;
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
      // In error state: cursor char turns red to signal the expected key
      span.classList.add(state.errorState ? 'wrong' : 'pending', 'cursor');
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
// ============================================
// AUDIO ENGINE — Mechanical Keyboard Sounds
// Uses Web Audio API to synthesize realistic
// click sounds. Zero latency, zero dependencies.
// ============================================
const AudioEngine = (() => {
  let ctx = null;
 
  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
 
  // Synthesize a mechanical key click
  // correct=true → crisp click; correct=false → thud + noise burst
  function playClick(correct = true) {
    try {
      const ac = getCtx();
      const now = ac.currentTime;
 
      if (correct) {
        // --- Click transient ---
        const bufLen = ac.sampleRate * 0.045;
        const buf = ac.createBuffer(1, bufLen, ac.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < bufLen; i++) {
          // Sharp attack, fast exponential decay
          const env = Math.exp(-i / (ac.sampleRate * 0.006));
          data[i] = (Math.random() * 2 - 1) * env;
        }
        const src = ac.createBufferSource();
        src.buffer = buf;
 
        // Bandpass filter → gives "tock" character
        const bp = ac.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 3200;
        bp.Q.value = 0.8;
 
        const gain = ac.createGain();
        gain.gain.setValueAtTime(0.38, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
 
        src.connect(bp);
        bp.connect(gain);
        gain.connect(ac.destination);
        src.start(now);
        src.stop(now + 0.05);
 
        // Low-freq thunk body
        const osc = ac.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.025);
        const oscGain = ac.createGain();
        oscGain.gain.setValueAtTime(0.18, now);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.connect(oscGain);
        oscGain.connect(ac.destination);
        osc.start(now);
        osc.stop(now + 0.035);
 
      } else {
        // --- Error thud — lower, duller ---
        const bufLen = ac.sampleRate * 0.06;
        const buf = ac.createBuffer(1, bufLen, ac.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < bufLen; i++) {
          const env = Math.exp(-i / (ac.sampleRate * 0.018));
          data[i] = (Math.random() * 2 - 1) * env;
        }
        const src = ac.createBufferSource();
        src.buffer = buf;
 
        const lp = ac.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 700;
 
        const gain = ac.createGain();
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
 
        src.connect(lp);
        lp.connect(gain);
        gain.connect(ac.destination);
        src.start(now);
        src.stop(now + 0.07);
 
        // Slight pitch drop "bonk"
        const osc = ac.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.04);
        const og = ac.createGain();
        og.gain.setValueAtTime(0.22, now);
        og.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
        osc.connect(og);
        og.connect(ac.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch (e) { /* AudioContext not supported */ }
  }
 
  // Rate-limit: don't let sounds pile up beyond 3 pending
  let pending = 0;
  const MAX_PENDING = 3;
 
  return {
    keyClick(correct = true) {
      if (!state.soundEnabled) return;
      if (pending >= MAX_PENDING) return;
      pending++;
      playClick(correct);
      setTimeout(() => { pending = Math.max(0, pending - 1); }, 80);
    }
  };
})();
 
// ============================================
// INPUT HANDLING (STRICT — NO BACKSPACE)
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
  // Block Tab (unless Shift+Tab for restart)
  if (e.key === 'Tab') {
    e.preventDefault();
    if (e.shiftKey) restartLesson();
    return;
  }
  // Completely swallow Backspace — no correction allowed
  if (e.key === 'Backspace') {
    e.preventDefault();
    return;
  }
});
 
DOM.hiddenInput.addEventListener('input', (e) => {
  const val = DOM.hiddenInput.value;
  if (!val) return;
  DOM.hiddenInput.value = '';
  const ch = val[val.length - 1];
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
  const isCorrect = (ch === expected);
 
  if (state.errorState) {
    // ── RECOVERY MODE: cursor is frozen, waiting for the correct key ──
    if (isCorrect) {
      // Correct key pressed — clear error, mark char correct, advance
      state.errorState = false;
      state.charStates[state.cursorIdx] = 'correct';
      state.correctKeystrokes++;
      state.totalKeystrokes++;
      flashKey(expected.toLowerCase(), true);
      AudioEngine.keyClick(true);
      state.cursorIdx++;
      updateStats();
      renderTypingText();
      if (state.cursorIdx >= state.typingText.length) {
        stopTimer();
        setTimeout(showCompletionModal, 350);
      }
    } else {
      // Still wrong — play error sound again, re-shake, stay frozen
      state.totalKeystrokes++;
      AudioEngine.keyClick(false);
      shakeCurrentChar();
      updateStats();
    }
    return;
  }
 
  // ── NORMAL MODE ──
  state.totalKeystrokes++;
 
  if (isCorrect) {
    state.charStates[state.cursorIdx] = 'correct';
    state.correctKeystrokes++;
    flashKey(expected.toLowerCase(), true);
    AudioEngine.keyClick(true);
    state.cursorIdx++;
    updateStats();
    renderTypingText();
    if (state.cursorIdx >= state.typingText.length) {
      stopTimer();
      setTimeout(showCompletionModal, 350);
    }
  } else {
    // Enter error state — cursor stays, expected char goes red
    state.errorState = true;
    flashKey(expected.toLowerCase(), false);
    AudioEngine.keyClick(false);
    updateStats();
    renderTypingText();   // re-render so cursor char shows red
    shakeCurrentChar();
  }
}
 
// Shake animation on the current cursor character (errorState position)
function shakeCurrentChar() {
  const idx = state.cursorIdx; // cursor hasn't moved — shake it
  requestAnimationFrame(() => {
    const chars = DOM.typingText.querySelectorAll('.char');
    const target = chars[idx];
    if (!target) return;
    target.classList.remove('shake');
    // Force reflow so re-shake works on repeated wrong presses
    void target.offsetWidth;
    target.classList.add('shake');
    target.addEventListener('animationend', () => target.classList.remove('shake'), { once: true });
  });
}
 
// handleBackspace removed — strict no-backspace mode
 
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
  { id:'lp', cx:22,  ty:18, by:110, w:18, label:'Pinky'  },
  { id:'lr', cx:48,  ty:10, by:115, w:18, label:'Ring'   },
  { id:'lm', cx:74,  ty:5,  by:118, w:18, label:'Middle' },
  { id:'li', cx:100, ty:12, by:115, w:18, label:'Index'  },
  { id:'th', cx:128, ty:60, by:145, w:18, label:'Thumb'  },
];
const RIGHT_FINGERS = [
  { id:'th', cx:32,  ty:60, by:145, w:18, label:'Thumb'  },
  { id:'ri', cx:60,  ty:12, by:115, w:18, label:'Index'  },
  { id:'rm', cx:86,  ty:5,  by:118, w:18, label:'Middle' },
  { id:'rr', cx:112, ty:10, by:115, w:18, label:'Ring'   },
  { id:'rp', cx:138, ty:18, by:110, w:18, label:'Pinky'  },
];
 
function buildHandSvg(svgEl, fingers, activeFingerId) {
  svgEl.innerHTML = '';
 
  // Palm
  const palm = document.createElementNS('http://www.w3.org/2000/svg','rect');
  palm.setAttribute('x','10');
  palm.setAttribute('y','110');
  palm.setAttribute('width','140');
  palm.setAttribute('height','75');
  palm.setAttribute('rx','18');
  palm.setAttribute('fill','var(--surface)');
  palm.setAttribute('stroke','var(--border2)');
  palm.setAttribute('stroke-width','1.5');
  svgEl.appendChild(palm);
 
  fingers.forEach(f => {
    const isActive = f.id === activeFingerId;
    const color = isActive ? FINGER_COLORS[f.id] : 'var(--surface)';
    const strokeColor = isActive ? FINGER_COLORS[f.id] : 'var(--border2)';
 
    // Finger body
    const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('x', f.cx - f.w/2);
    rect.setAttribute('y', f.ty);
    rect.setAttribute('width', f.w);
    rect.setAttribute('height', f.by - f.ty);
    rect.setAttribute('rx', f.w/2);
    rect.setAttribute('fill', color);
    rect.setAttribute('stroke', strokeColor);
    rect.setAttribute('stroke-width','1.5');
    rect.style.transition = 'fill 0.15s, stroke 0.15s';
 
    // Fingertip glow when active
    if (isActive) {
      const glow = document.createElementNS('http://www.w3.org/2000/svg','rect');
      glow.setAttribute('x', f.cx - f.w/2 - 2);
      glow.setAttribute('y', f.ty - 2);
      glow.setAttribute('width', f.w + 4);
      glow.setAttribute('height', f.w + 4);
      glow.setAttribute('rx', (f.w + 4) / 2);
      glow.setAttribute('fill', FINGER_COLORS[f.id]);
      glow.setAttribute('opacity','0.25');
      svgEl.appendChild(glow);
    }
 
    svgEl.appendChild(rect);
 
    // Knuckle lines
    [0.4, 0.65].forEach(frac => {
      const y = f.ty + (f.by - f.ty) * frac;
      const line = document.createElementNS('http://www.w3.org/2000/svg','line');
      line.setAttribute('x1', f.cx - f.w/2 + 2);
      line.setAttribute('y1', y);
      line.setAttribute('x2', f.cx + f.w/2 - 2);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', isActive ? 'rgba(0,0,0,0.25)' : 'var(--border)');
      line.setAttribute('stroke-width','1');
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
  saveLessonProgress();
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
// FREE PRACTICE MODE
// ============================================
const FREE_MODE_WORDS = {
  home:    ['ask','dad','fall','add','slag','flash','glad','flask','hall','lad','flag','lass','glass','fads','gash','lash','half','dash','safe','alas','salad','shall','falls','deals','folds'],
  common:  ['the','and','for','are','but','not','you','all','can','her','was','one','our','out','day','get','has','him','his','how','man','new','now','old','see','two','way','who','time','year','work','make','life','good','just','into','over','also','back','after','most','come','will','your','with','from','they','know','take','than','them','some','this','have','that','when','what','said','each','been','she','would','there','their','these','which','about','would','could','other','more','only','very','even','many'],
  full:    ['quick','brown','fox','jumps','over','lazy','dog','pack','box','five','dozen','liquor','jugs','sphinx','vexingly','bright','quiz','gawked','jumbo','waltz','nymph','lynx','fjord','glyph','crux','blaze','dwarf','expunge','kayak','oxygen','plumb','squid','vortex'],
  pangram: ['the quick brown fox jumps over the lazy dog','sphinx of black quartz judge my vow','pack my box with five dozen liquor jugs','how vexingly quick daft zebras jump','the five boxing wizards jump quickly'],
};
 
const FREE_MODE_LABELS = { home:'Home Row', common:'Common Words', full:'Full Keyboard', pangram:'Pangrams' };
 
let fpState = {
  mode: null,
  text: '',
  charStates: [],
  cursorIdx: 0,
  errorState: false,    // true = waiting for correct key
  startTime: null,
  timerHandle: null,
  elapsedSeconds: 0,
  totalKeystrokes: 0,
  correctKeystrokes: 0,
};
 
function startFreeMode(mode) {
  fpState.mode = mode;
  document.querySelectorAll('.practice-mode-card').forEach(c => c.classList.remove('selected'));
  document.querySelector(`.practice-mode-card[data-mode="${mode}"]`).classList.add('selected');
  document.getElementById('free-mode-label').textContent = FREE_MODE_LABELS[mode];
  document.getElementById('free-practice-area').style.display = 'block';
  generateFreePracticeText(mode);
  resetFpState();
  setTimeout(() => {
    const inp = document.getElementById('fp-hidden-input');
    if (inp) inp.focus();
  }, 80);
}
 
function generateFreePracticeText(mode) {
  const words = FREE_MODE_WORDS[mode];
  if (mode === 'pangram') {
    const picked = words[Math.floor(Math.random() * words.length)];
    fpState.text = picked + ' ' + picked; // repeat for length
  } else {
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    fpState.text = shuffled.slice(0, 40).join(' ');
  }
}
 
function refreshFreePractice() {
  if (!fpState.mode) return;
  generateFreePracticeText(fpState.mode);
  resetFpState();
  setTimeout(() => document.getElementById('fp-hidden-input').focus(), 80);
}
 
function resetFpState() {
  if (fpState.timerHandle) { clearInterval(fpState.timerHandle); fpState.timerHandle = null; }
  fpState.charStates = fpState.text.split('').map(() => 'pending');
  fpState.cursorIdx = 0;
  fpState.errorState = false;
  fpState.startTime = null;
  fpState.elapsedSeconds = 0;
  fpState.totalKeystrokes = 0;
  fpState.correctKeystrokes = 0;
  document.getElementById('fp-wpm').textContent = '0';
  document.getElementById('fp-acc').textContent = '100%';
  document.getElementById('fp-time').textContent = '0s';
  document.getElementById('fp-chars').textContent = '0';
  renderFpText();
}
 
function renderFpText() {
  const container = document.getElementById('fp-typing-text');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < fpState.text.length; i++) {
    const span = document.createElement('span');
    span.className = 'char';
    const ch = fpState.text[i];
    if (i < fpState.cursorIdx) {
      span.classList.add(fpState.charStates[i]);
    } else if (i === fpState.cursorIdx) {
      span.classList.add('pending', 'cursor');
    } else {
      span.classList.add('pending');
    }
    if (ch === ' ' && fpState.charStates[i] === 'wrong') span.textContent = '·';
    else if (ch === ' ') span.innerHTML = '&nbsp;';
    else span.textContent = ch;
    container.appendChild(span);
  }
  const cursor = container.querySelector('.cursor');
  if (cursor) cursor.scrollIntoView({ block: 'nearest', inline: 'nearest' });
}
 
function handleFpChar(ch) {
  if (fpState.cursorIdx >= fpState.text.length) return;
  if (!fpState.startTime) {
    fpState.startTime = Date.now();
    fpState.timerHandle = setInterval(() => {
      fpState.elapsedSeconds = Math.round((Date.now() - fpState.startTime) / 1000);
      document.getElementById('fp-time').textContent = fpState.elapsedSeconds + 's';
      const mins = (Date.now() - fpState.startTime) / 60000;
      if (mins > 0.01) {
        document.getElementById('fp-wpm').textContent = Math.round((fpState.correctKeystrokes / 5) / mins);
      }
    }, 500);
  }
  const expected = fpState.text[fpState.cursorIdx];
  fpState.totalKeystrokes++;
  const isCorrect = (ch === expected);
  if (isCorrect) {
    fpState.charStates[fpState.cursorIdx] = 'correct';
    fpState.correctKeystrokes++;
    AudioEngine.keyClick(true);
  } else {
    fpState.charStates[fpState.cursorIdx] = 'wrong';
    AudioEngine.keyClick(false);
    // Shake wrong char
    requestAnimationFrame(() => {
      const chars = document.querySelectorAll('#fp-typing-text .char');
      const t = chars[fpState.cursorIdx];
      if (t) {
        t.classList.add('shake');
        t.addEventListener('animationend', () => t.classList.remove('shake'), { once: true });
      }
    });
  }
  fpState.cursorIdx++;
  const acc = fpState.totalKeystrokes > 0 ? Math.round((fpState.correctKeystrokes / fpState.totalKeystrokes) * 100) : 100;
  document.getElementById('fp-acc').textContent = acc + '%';
  document.getElementById('fp-chars').textContent = fpState.cursorIdx;
  renderFpText();
 
  // Auto-extend text near end
  if (fpState.cursorIdx >= fpState.text.length - 20 && fpState.mode !== 'pangram') {
    const words = FREE_MODE_WORDS[fpState.mode];
    const extra = [...words].sort(() => Math.random() - 0.5).slice(0, 15).join(' ');
    fpState.text += ' ' + extra;
    fpState.charStates.push(...extra.split('').map(() => 'pending'));
    fpState.charStates.push('pending'); // the space
  }
}
 
// Wire up free practice input
document.addEventListener('DOMContentLoaded', () => {});
// Use event delegation since #fp-hidden-input exists in DOM at parse time
const fpInput = document.getElementById('fp-hidden-input');
if (fpInput) {
  fpInput.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') { e.preventDefault(); refreshFreePractice(); return; }
    if (e.key === 'Backspace') { e.preventDefault(); return; } // no backspace
  });
  fpInput.addEventListener('input', () => {
    const val = fpInput.value;
    if (!val) return;
    fpInput.value = '';
    handleFpChar(val[val.length - 1]);
  });
  document.getElementById('fp-typing-box').addEventListener('click', () => {
    fpInput.focus();
    document.getElementById('fp-typing-box').classList.add('has-focus');
  });
  fpInput.addEventListener('blur', () => {
    document.getElementById('fp-typing-box').classList.remove('has-focus');
  });
}
document.addEventListener('keydown', (e) => {
  if (state.currentView === 'typing') {
    // Allow Tab as shortcut for restart
    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      restartLesson();
    }
  }
});
 
const PROGRESS_STORAGE_KEY = 'typingAppLessonProgress';

function loadLessonProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY));
    if (!Array.isArray(saved) || saved.length !== LESSONS.length) return;
    saved.forEach((entry, idx) => {
      if (entry && typeof entry.done === 'boolean') LESSONS[idx].done = entry.done;
      LESSONS[idx].current = !!entry.current;
    });
  } catch (err) {
    return;
  }
  ensureLessonProgressState();
}

function ensureLessonProgressState() {
  if (!LESSONS.some(l => l.current)) {
    const nextIdx = LESSONS.findIndex(l => !l.done);
    const idx = nextIdx >= 0 ? nextIdx : 0;
    LESSONS.forEach((lesson, i) => {
      lesson.current = i === idx;
    });
  }
  const currentCount = LESSONS.filter(l => l.current).length;
  if (currentCount > 1) {
    const firstCurrent = LESSONS.findIndex(l => l.current);
    LESSONS.forEach((lesson, i) => {
      lesson.current = i === firstCurrent;
    });
  }
}

function saveLessonProgress() {
  try {
    const data = LESSONS.map(({done,current}) => ({done,current}));
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    // ignore storage errors
  }
}

// ============================================
// INIT
// ============================================
function init() {
  loadLessonProgress();
  buildLessonGrid();
  buildKeyboard();
  showView('learn');
  if (window.innerWidth <= 768) setSidebarOpen(false);
 
  // Stagger card animation delays
  document.querySelectorAll('.lesson-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 0.025}s`;
  });
}
 
init();