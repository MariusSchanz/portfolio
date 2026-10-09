// =========================================================
// Player-Logik: läuft automatisch für JEDEN .player-Block
// auf der Seite. Beim Duplizieren eines Track-Blocks muss
// hier nichts angepasst werden.
// =========================================================

const BAR_WIDTH = 3;  // px, muss zum width-Wert von .player__waveform .bar in style.css passen
const BAR_GAP = 3;    // px, muss zum gap-Wert von .player__waveform in style.css passen

// Initialisierung erfolgt ganz am Ende der Datei (siehe unten),
// nachdem alle Funktionen und Konstanten definiert sind.

function initPlayer(playerEl) {
  const audio = playerEl.querySelector('[data-audio]');
  const toggleBtn = playerEl.querySelector('[data-toggle]');
  const waveform = playerEl.querySelector('[data-waveform]');

  const bars = buildWaveform(waveform);

  // --- Play / Pause ---
  toggleBtn.addEventListener('click', () => {
    if (audio.paused) {
      // Andere laufende Player pausieren, damit nicht mehrere gleichzeitig spielen
      document.querySelectorAll('[data-audio]').forEach(a => {
        if (a !== audio) a.pause();
      });
      audio.play().catch((error) => {
        console.error('Wiedergabe konnte nicht gestartet werden:', error);
        setPlayingState(false);
      });
      setPlayingState(true);
    } else {
      audio.pause();
      setPlayingState(false);
    }
  });

  // Hält Icon-Zustand und Audio-Zustand zusätzlich synchron (z. B. falls ein
  // anderer Player gestartet wird und dieser hier automatisch pausiert wird)
  audio.addEventListener('play', () => setPlayingState(true));
  audio.addEventListener('pause', () => setPlayingState(false));

  function setPlayingState(isPlaying) {
    toggleBtn.classList.toggle('is-playing', isPlaying);
    toggleBtn.setAttribute('aria-label', isPlaying ? 'Pausieren' : 'Abspielen');
  }

  audio.addEventListener('ended', () => {
    setPlayingState(false);
    updateProgress(0);
  });

  // --- Fortschrittsanzeige in der Waveform ---
  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    updateProgress(audio.currentTime / audio.duration);
  });

  // --- Klick/Tastatur auf Waveform = an Position springen ---
  waveform.addEventListener('click', (event) => {
    seekFromEvent(event);
  });

  waveform.addEventListener('keydown', (event) => {
    if (!audio.duration) return;
    const step = 5; // Sekunden
    if (event.key === 'ArrowRight') {
      audio.currentTime = Math.min(audio.duration, audio.currentTime + step);
    } else if (event.key === 'ArrowLeft') {
      audio.currentTime = Math.max(0, audio.currentTime - step);
    } else {
      return;
    }
    event.preventDefault();
  });

  function seekFromEvent(event) {
    if (!audio.duration) return;
    const rect = waveform.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
    updateProgress(ratio);
  }

  function updateProgress(ratio) {
    const filledCount = Math.round(ratio * bars.length);
    bars.forEach((bar, index) => {
      bar.classList.toggle('is-played', index < filledCount);
    });
    waveform.setAttribute('aria-valuenow', Math.round(ratio * 100));
  }
}

// Fester Balken-Rhythmus, der bei jedem Player identisch aussieht —
// wie ein Waveform-Symbol, nicht wie echte Peak-Daten pro Track.
// Werte in Prozent (Balkenhöhe relativ zur Player-Höhe).
const WAVEFORM_PATTERN = [
  35, 65, 50, 80, 55, 30, 70, 45, 60, 85,
  50, 25, 65, 55, 40, 75, 60, 45, 70, 50,
  35, 65, 55, 80, 45, 60, 40, 70, 50, 30,
  55, 75, 45, 60, 35, 65, 50, 80, 55, 40
];

// Baut die Waveform-Balken auf Basis des festen Musters auf.
// Die Anzahl der Balken wird aus der tatsächlichen Breite des Containers
// berechnet, damit die Waveform bei jeder Blockgröße sauber bis zum Rand reicht.
function buildWaveform(container) {
  const containerWidth = container.clientWidth;
  const barCount = Math.max(10, Math.floor(containerWidth / (BAR_WIDTH + BAR_GAP)));

  const bars = [];
  for (let i = 0; i < barCount; i++) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${WAVEFORM_PATTERN[i % WAVEFORM_PATTERN.length]}%`;
    container.appendChild(bar);
    bars.push(bar);
  }
  return bars;
}

// Erst jetzt sind alle Funktionen und Konstanten (inkl. WAVEFORM_PATTERN)
// bereit — deshalb wird die eigentliche Initialisierung erst hier ausgelöst.
document.querySelectorAll('[data-player]').forEach(initPlayer);
