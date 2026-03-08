// ===== GAME STATE =====
const SCREENS = [
  'screen-welcome', 'screen-hidden', 'screen-riddle1', 'screen-catch',
  'screen-puzzle', 'screen-riddle2', 'screen-riddle3', 'screen-memory',
  'screen-mystery', 'screen-assembly', 'screen-final'
];
let currentScreenIndex = 0;
let piecesCollected = 0;

// ===== PETALS (Canvas) =====
const canvas = document.getElementById('petals-canvas');
const ctx = canvas.getContext('2d');
const petals = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Petal {
  constructor(randomY) {
    this.reset();
    if (randomY) this.y = Math.random() * canvas.height;
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -20;
    this.size = Math.random() * 8 + 4;
    this.speedY = Math.random() * 1.5 + 0.5;
    this.speedX = Math.random() * 1 - 0.5;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.03;
    this.opacity = Math.random() * 0.4 + 0.25;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
    this.rotation += this.rotSpeed;
    if (this.y > canvas.height + 20) this.reset();
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = '#b39ddb';
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size * 0.5, this.size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 30; i++) petals.push(new Petal(true));

(function animatePetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animatePetals);
})();

// ===== PARALLAX =====
document.addEventListener('mousemove', (e) => {
  const mx = (e.clientX / window.innerWidth - 0.5) * 2;
  const my = (e.clientY / window.innerHeight - 0.5) * 2;
  document.body.style.backgroundPosition = `${mx * 10}px ${my * 10}px`;
});

// ===== PARTICLES =====
function createSparkles(x, y) {
  const colors = ['#9575cd', '#b39ddb', '#d1c4e9', '#7e57c2', '#fff'];
  for (let i = 0; i < 8; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.style.left = (x + (Math.random() - 0.5) * 50) + 'px';
    s.style.top = (y + (Math.random() - 0.5) * 50) + 'px';
    s.style.background = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 600);
  }
}

function createHeartParticle(x, y) {
  const h = document.createElement('div');
  h.className = 'heart-particle';
  h.innerHTML = ['\u2764\uFE0F', '\uD83D\uDC95', '\uD83D\uDC96', '\uD83D\uDC97'][Math.floor(Math.random() * 4)];
  h.style.left = (x + (Math.random() - 0.5) * 60) + 'px';
  h.style.top = y + 'px';
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 1200);
}

function heartBurst(x, y, count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => createHeartParticle(x + (Math.random() - 0.5) * 80, y + (Math.random() - 0.5) * 80), i * 60);
  }
}

// ===== SCREEN NAVIGATION =====
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  currentScreenIndex = SCREENS.indexOf(id);

  // Show progress bar on game screens (not welcome or final)
  const bar = document.getElementById('progress-bar');
  if (id === 'screen-welcome' || id === 'screen-final') {
    bar.classList.add('hidden');
  } else {
    bar.classList.remove('hidden');
  }

  // Initialize screens that need setup
  const inits = {
    'screen-hidden': initHiddenObject,
    'screen-catch': initCatchHearts,
    'screen-puzzle': initPuzzle,
    'screen-memory': initMemory,
    'screen-mystery': initMystery,
    'screen-assembly': initAssembly
  };
  if (inits[id]) inits[id]();
}

function nextScreen() {
  const next = SCREENS[currentScreenIndex + 1];
  if (next) showScreen(next);
}

// ===== PROGRESS =====
function updateProgress() {
  document.getElementById('pieces-count').textContent = piecesCollected;
  const hearts = document.querySelectorAll('.p-heart');
  hearts.forEach((h, i) => {
    h.classList.toggle('filled', i < piecesCollected);
  });
}

function addPieceAndContinue() {
  piecesCollected++;
  updateProgress();

  // Show overlay
  const overlay = document.getElementById('piece-overlay');
  overlay.classList.remove('hidden');
  createSparkles(window.innerWidth / 2, window.innerHeight / 2);

  setTimeout(() => {
    overlay.classList.add('hidden');
    nextScreen();
  }, 1400);
}

// ===== START =====
document.getElementById('btn-start').addEventListener('click', () => {
  showScreen('screen-hidden');
});

// ===== 2. HIDDEN OBJECT =====
function initHiddenObject() {
  const field = document.getElementById('hidden-field');
  field.innerHTML = '';

  const decoys = ['\uD83C\uDF38', '\uD83C\uDF3A', '\uD83C\uDF3B', '\u2B50', '\u2728', '\u2601\uFE0F', '\uD83C\uDF43', '\uD83C\uDF3F', '\uD83E\uDD8B', '\uD83C\uDF37'];
  const w = window.innerWidth;
  const h = window.innerHeight;

  for (let i = 0; i < 28; i++) {
    const el = document.createElement('div');
    el.className = 'hidden-item';
    el.textContent = decoys[Math.floor(Math.random() * decoys.length)];
    el.style.left = (Math.random() * (w - 50) + 10) + 'px';
    el.style.top = (Math.random() * (h - 80) + 50) + 'px';
    el.style.fontSize = (1.4 + Math.random() * 1.2) + 'rem';
    const rot = Math.random() * 30 - 15;
    el.style.setProperty('--rot', rot + 'deg');
    el.style.animationDelay = (Math.random() * 2) + 's';
    field.appendChild(el);
  }

  // Hidden heart
  const heart = document.createElement('div');
  heart.className = 'hidden-item heart-target';
  heart.textContent = '\u2764\uFE0F';
  heart.style.left = (Math.random() * (w - 80) + 30) + 'px';
  heart.style.top = (Math.random() * (h - 120) + 80) + 'px';
  heart.style.fontSize = '1.5rem';
  heart.style.setProperty('--rot', (Math.random() * 20 - 10) + 'deg');
  heart.style.animationDelay = (Math.random() * 2) + 's';
  heart.addEventListener('click', (e) => {
    if (heart.classList.contains('found')) return;
    heart.classList.add('found');
    createSparkles(e.clientX, e.clientY);
    setTimeout(() => addPieceAndContinue(), 600);
  });
  field.appendChild(heart);
}

// ===== 3/6/7. RIDDLES =====
document.querySelectorAll('.option').forEach(btn => {
  btn.addEventListener('click', () => {
    const screenId = btn.dataset.screen;
    const isCorrect = btn.dataset.correct === 'true';

    if (isCorrect) {
      btn.classList.add('correct');
      createSparkles(
        btn.getBoundingClientRect().left + btn.offsetWidth / 2,
        btn.getBoundingClientRect().top + btn.offsetHeight / 2
      );
      // Disable all options
      btn.closest('.riddle-options').querySelectorAll('.option').forEach(o => { o.disabled = true; });
      setTimeout(() => addPieceAndContinue(), 700);
    } else {
      btn.classList.add('wrong');
      const hint = document.getElementById('hint-' + screenId);
      if (hint) hint.classList.remove('hidden');
      setTimeout(() => btn.classList.remove('wrong'), 400);
    }
  });
});

// ===== 4. CATCH HEARTS =====
let catchCount = 0;
let catchActive = false;
let catchTimer = null;

function initCatchHearts() {
  catchCount = 0;
  catchActive = true;
  document.getElementById('catch-count').textContent = '0';
  document.getElementById('catch-field').innerHTML = '';
  spawnFallingHeart();
}

function spawnFallingHeart() {
  if (!catchActive) return;

  const field = document.getElementById('catch-field');
  const heart = document.createElement('div');
  heart.className = 'falling-heart';
  heart.textContent = '\u2764\uFE0F';
  heart.style.left = (Math.random() * (window.innerWidth - 50) + 15) + 'px';

  heart.addEventListener('click', (e) => {
    if (heart.classList.contains('popped')) return;
    heart.classList.add('popped');
    createSparkles(e.clientX, e.clientY);
    catchCount++;
    document.getElementById('catch-count').textContent = catchCount;
    setTimeout(() => heart.remove(), 300);

    if (catchCount >= 5) {
      catchActive = false;
      clearTimeout(catchTimer);
      setTimeout(() => addPieceAndContinue(), 500);
    }
  });

  // Remove when animation ends (fell off screen)
  heart.addEventListener('animationend', () => {
    if (!heart.classList.contains('popped')) heart.remove();
  });

  field.appendChild(heart);

  if (catchActive) {
    catchTimer = setTimeout(spawnFallingHeart, 600 + Math.random() * 500);
  }
}

// ===== 5. PUZZLE =====
const PUZZLE_COLORS = ['#ede7f6', '#d1c4e9', '#b39ddb', '#9575cd', '#7e57c2', '#673ab7'];
const PUZZLE_EMOJI = ['\uD83D\uDC97', '\uD83D\uDC96', '\uD83D\uDC95', '\uD83D\uDC98', '\uD83D\uDC9D', '\uD83D\uDC9E'];
let selectedPuzzlePiece = null;

function initPuzzle() {
  selectedPuzzlePiece = null;
  const grid = document.getElementById('puzzle-grid');
  const piecesEl = document.getElementById('puzzle-pieces');
  grid.innerHTML = '';
  piecesEl.innerHTML = '';

  // Create slots
  for (let i = 0; i < 6; i++) {
    const slot = document.createElement('div');
    slot.className = 'puzzle-slot';
    slot.dataset.pos = i;
    slot.style.backgroundColor = PUZZLE_COLORS[i] + '22';
    slot.addEventListener('click', () => placePuzzlePiece(i));
    grid.appendChild(slot);
  }

  // Create shuffled pieces
  const indices = [0, 1, 2, 3, 4, 5];
  shuffle(indices);

  indices.forEach(i => {
    const piece = document.createElement('div');
    piece.className = 'puzzle-piece';
    piece.dataset.pos = i;
    piece.style.backgroundColor = PUZZLE_COLORS[i];
    piece.textContent = PUZZLE_EMOJI[i];
    piece.addEventListener('click', () => selectPuzzlePiece(piece));
    piecesEl.appendChild(piece);
  });
}

function selectPuzzlePiece(piece) {
  if (piece.classList.contains('placed')) return;
  document.querySelectorAll('.puzzle-piece.selected').forEach(p => p.classList.remove('selected'));
  document.querySelectorAll('.puzzle-slot.highlight').forEach(s => s.classList.remove('highlight'));
  piece.classList.add('selected');
  selectedPuzzlePiece = piece;
  // Highlight available slots
  document.querySelectorAll('.puzzle-slot:not(.filled)').forEach(s => s.classList.add('highlight'));
}

function placePuzzlePiece(slotIndex) {
  if (!selectedPuzzlePiece) return;
  const slot = document.querySelectorAll('.puzzle-slot')[slotIndex];
  if (slot.classList.contains('filled')) return;

  if (parseInt(selectedPuzzlePiece.dataset.pos) === slotIndex) {
    // Correct placement
    slot.style.backgroundColor = PUZZLE_COLORS[slotIndex];
    slot.textContent = PUZZLE_EMOJI[slotIndex];
    slot.classList.add('filled');
    selectedPuzzlePiece.classList.add('placed');
    selectedPuzzlePiece.classList.remove('selected');
    selectedPuzzlePiece = null;
    document.querySelectorAll('.puzzle-slot.highlight').forEach(s => s.classList.remove('highlight'));

    createSparkles(
      slot.getBoundingClientRect().left + slot.offsetWidth / 2,
      slot.getBoundingClientRect().top + slot.offsetHeight / 2
    );

    if (document.querySelectorAll('.puzzle-slot.filled').length === 6) {
      setTimeout(() => addPieceAndContinue(), 600);
    }
  } else {
    // Wrong
    slot.classList.add('shake-slot');
    setTimeout(() => slot.classList.remove('shake-slot'), 400);
  }
}

// ===== 8. MEMORY GAME =====
const MEMORY_SYMBOLS = ['\u2764\uFE0F', '\uD83C\uDF38', '\u2B50', '\uD83D\uDC8C', '\uD83D\uDC8D', '\uD83D\uDE0A'];
let flippedCards = [];
let matchedPairs = 0;
let memoryLocked = false;

function initMemory() {
  flippedCards = [];
  matchedPairs = 0;
  memoryLocked = false;

  const grid = document.getElementById('memory-grid');
  grid.innerHTML = '';

  const symbols = [...MEMORY_SYMBOLS, ...MEMORY_SYMBOLS];
  shuffle(symbols);

  symbols.forEach((sym, i) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.symbol = sym;
    card.innerHTML = `
      <div class="memory-card-inner">
        <div class="memory-card-face memory-card-back"></div>
        <div class="memory-card-face memory-card-front">${sym}</div>
      </div>
    `;
    card.addEventListener('click', () => flipCard(card));
    grid.appendChild(card);
  });
}

function flipCard(card) {
  if (memoryLocked) return;
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    memoryLocked = true;
    const [a, b] = flippedCards;

    if (a.dataset.symbol === b.dataset.symbol) {
      a.classList.add('matched');
      b.classList.add('matched');
      matchedPairs++;
      flippedCards = [];
      memoryLocked = false;

      const rect = a.getBoundingClientRect();
      createSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);

      if (matchedPairs === 6) {
        setTimeout(() => addPieceAndContinue(), 600);
      }
    } else {
      setTimeout(() => {
        a.classList.remove('flipped');
        b.classList.remove('flipped');
        flippedCards = [];
        memoryLocked = false;
      }, 900);
    }
  }
}

// ===== 9. MYSTERY BOX =====
let mysteryReward = -1;

function initMystery() {
  mysteryReward = Math.floor(Math.random() * 3);
  const boxes = document.querySelectorAll('.mystery-box');
  boxes.forEach((box, i) => {
    box.className = 'mystery-box';
    box.dataset.box = i;
    box.innerHTML = '<span>\uD83C\uDF81</span>';
    box.onclick = () => openMysteryBox(i);
  });
}

function openMysteryBox(index) {
  const boxes = document.querySelectorAll('.mystery-box');
  const box = boxes[index];
  if (box.classList.contains('opened')) return;

  box.classList.add('opened');

  if (index === mysteryReward) {
    box.innerHTML = '<span>\uD83D\uDC9D</span>';
    box.classList.add('reward');
    const rect = box.getBoundingClientRect();
    heartBurst(rect.left + rect.width / 2, rect.top, 10);
    setTimeout(() => addPieceAndContinue(), 1000);
  } else {
    box.innerHTML = '<span>\uD83D\uDCE6</span>';
    box.classList.add('empty');
    // If 2 wrong, only reward remains — auto-open it
    const opened = document.querySelectorAll('.mystery-box.opened').length;
    if (opened === 2) {
      setTimeout(() => openMysteryBox(mysteryReward), 600);
    }
  }
}

// ===== 10. HEART ASSEMBLY =====
function initAssembly() {
  const area = document.getElementById('assembly-area');
  area.innerHTML = '';
  area.classList.remove('assembled');
  document.getElementById('assembly-text').classList.add('hidden');
  document.getElementById('btn-to-final').classList.add('hidden');

  // Target positions forming a heart shape (% of area)
  const targets = [
    { x: 30, y: 15 }, { x: 70, y: 15 },
    { x: 15, y: 35 }, { x: 85, y: 35 },
    { x: 25, y: 55 }, { x: 75, y: 55 },
    { x: 38, y: 75 }, { x: 62, y: 75 }
  ];

  // Big heart (hidden initially)
  const bigHeart = document.createElement('div');
  bigHeart.className = 'assembly-big-heart';
  bigHeart.textContent = '\u2764\uFE0F';
  area.appendChild(bigHeart);

  // Create 8 pieces at random edge positions
  for (let i = 0; i < 8; i++) {
    const piece = document.createElement('div');
    piece.className = 'assembly-piece';
    piece.textContent = '\u2764\uFE0F';

    // Start from random edge
    const edge = Math.floor(Math.random() * 4);
    let sx, sy;
    if (edge === 0) { sx = Math.random() * 100; sy = -15; }
    else if (edge === 1) { sx = Math.random() * 100; sy = 115; }
    else if (edge === 2) { sx = -15; sy = Math.random() * 100; }
    else { sx = 115; sy = Math.random() * 100; }

    piece.style.left = sx + '%';
    piece.style.top = sy + '%';
    area.appendChild(piece);

    // Animate to target
    setTimeout(() => {
      piece.style.left = targets[i].x + '%';
      piece.style.top = targets[i].y + '%';
    }, 200 + i * 150);
  }

  // After all pieces arrive
  setTimeout(() => {
    area.classList.add('assembled');
    createSparkles(window.innerWidth / 2, window.innerHeight / 2);
    heartBurst(window.innerWidth / 2, window.innerHeight / 2 - 40, 15);

    setTimeout(() => {
      document.getElementById('assembly-text').classList.remove('hidden');
    }, 600);
    setTimeout(() => {
      document.getElementById('btn-to-final').classList.remove('hidden');
    }, 1200);
  }, 2800);
}

document.getElementById('btn-to-final').addEventListener('click', () => {
  showScreen('screen-final');
});

// ===== 11. FINAL =====
document.getElementById('btn-love').addEventListener('click', function () {
  this.classList.add('hidden');
  document.getElementById('love-message').classList.remove('hidden');

  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  heartBurst(cx, cy, 25);
  createSparkles(cx, cy);
});

// ===== EASTER EGG =====
let bgClicks = 0;
let bgClickTimer = null;

document.addEventListener('click', (e) => {
  if (e.target.closest('.btn, .option, .hidden-item, .falling-heart, .mystery-box, .memory-card, .puzzle-piece, .puzzle-slot')) return;

  bgClicks++;
  clearTimeout(bgClickTimer);
  bgClickTimer = setTimeout(() => { bgClicks = 0; }, 3000);

  if (bgClicks >= 10) {
    bgClicks = 0;
    const egg = document.getElementById('easter-egg');
    egg.classList.remove('hidden');
    // Small heart rain
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        createHeartParticle(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight * 0.5
        );
      }, i * 100);
    }
    setTimeout(() => egg.classList.add('hidden'), 3000);
  }
});

// ===== UTILITY =====
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
