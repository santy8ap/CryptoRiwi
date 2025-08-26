
(function(){
  'use strict';

  /* Config */
  const LESSON_ID = 'lesson_4_8';          // identificador para persistencia
  const AWARD_COINS = 50;                  // coins a otorgar al completar
  const SIM_DURATION = 60;                 // segundos para simulación si no hay video

  /* RWC helpers (persistente en localStorage) */
  const RWC_KEY = 'cryptoriwi_rwc';
  function getRwc(){
    const s = localStorage.getItem(RWC_KEY);
    if (s !== null) return Number(s);
    const nav = document.querySelector('.navbar-text');
    if (nav){
      const m = (nav.textContent||'').match(/([\d,]+)/);
      if (m) {
        const n = Number(m[1].replace(/,/g,''));
        localStorage.setItem(RWC_KEY,String(n));
        return n;
      }
    }
    localStorage.setItem(RWC_KEY,'0');
    return 0;
  }
  function setRwc(n){
    localStorage.setItem(RWC_KEY,String(n));
    const nav = document.querySelector('.navbar-text');
    if (nav) nav.innerHTML = `<i class="bi bi-coin"></i> ${n.toLocaleString()} RWC`;
  }

  /* UI refs */
  const videoContainer = document.querySelector('.video-player');
  if (!videoContainer) return;
  const playButton = videoContainer.querySelector('.play-button');
  const progressFill = document.querySelector('.practice-card .progress-bar-custom .progress-fill');
  const progressCardSmall = document.querySelectorAll('.practice-card small.text-muted'); // last one shows remaining
  const lessonProgressSmall = progressCardSmall && progressCardSmall.length ? progressCardSmall[progressCardSmall.length-1] : null;

  /* State */
  let awarded = localStorage.getItem(LESSON_ID + '_awarded') === '1';
  let currentRwc = getRwc();

  /* Utility: create Completed button */
  function showCompletedButton(targetContainer){
    if (targetContainer.querySelector('.lesson-completed-btn')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-course lesson-completed-btn mt-3';
    btn.textContent = 'Completado';
    btn.setAttribute('aria-pressed','true');
    btn.disabled = true;
    targetContainer.appendChild(btn);
  }

  /* Award function: idempotent */
  function awardCoins(){
    if (awarded) return;
    currentRwc += AWARD_COINS;
    setRwc(currentRwc);
    awarded = true;
    localStorage.setItem(LESSON_ID + '_awarded','1');
    // alert creative message
    alert(`¡Lección completada!\nHas ganado ${AWARD_COINS} RWC 🎉\nTotal: ${currentRwc.toLocaleString()} RWC`);
  }

  /* Update visual progress (0..100) */
  function setProgress(pct){
    pct = Math.max(0, Math.min(100, Math.round(pct)));
    if (progressFill) progressFill.style.width = pct + '%';
    if (lessonProgressSmall){
      // approximate remaining time by percentage of SIM_DURATION
      const remainingSec = Math.ceil((100 - pct) / 100 * SIM_DURATION);
      lessonProgressSmall.textContent = remainingSec > 0 ? `${remainingSec} min restantes` : '0 min restantes';
    }
    // accessible attrs on wrapper
    const pb = document.querySelector('.practice-card .progress-bar-custom');
    if (pb){
      pb.setAttribute('role','progressbar');
      pb.setAttribute('aria-valuemin','0');
      pb.setAttribute('aria-valuemax','100');
      pb.setAttribute('aria-valuenow', String(pct));
    }
  }

  /* If there's an actual data-video attribute -> create video element */
  const realSrc = videoContainer.dataset?.video || null;
  if (realSrc){
    // create <video> element and swap UI
    const video = document.createElement('video');
    video.controls = true;
    video.preload = 'metadata';
    video.style.width = '100%';
    video.style.height = '100%';
    video.setAttribute('playsinline','');
    video.innerHTML = `<source src="${realSrc}">Tu navegador no soporta video HTML5.`;
    // replace play-button with video element (keep play-button as overlay for first click)
    videoContainer.appendChild(video);

    // when user plays, start syncing progress
    video.addEventListener('timeupdate', () => {
      if (!video.duration || isNaN(video.duration)) return;
      const pct = (video.currentTime / video.duration) * 100;
      setProgress(pct);
    });

    video.addEventListener('ended', () => {
      setProgress(100);
      showCompletedButton(videoContainer.parentElement || videoContainer);
      awardCoins();
    });

    // connect overlay play button to video.play()
    if (playButton){
      playButton.addEventListener('click', () => {
        video.play().catch(()=>{ /* autoplay blocked */ });
        playButton.style.display = 'none';
      });
    }

    // if user had already completed before, reflect UI
    if (localStorage.getItem(LESSON_ID + '_awarded') === '1'){
      setProgress(100);
      showCompletedButton(videoContainer.parentElement || videoContainer);
    }

    return;
  }

  /* No real video -> simulated watcher */
  (function simulatedWatcher(){
    let running = false;
    let elapsed = Number(localStorage.getItem(LESSON_ID + '_elapsed')) || 0; // seconds
    const total = SIM_DURATION;
    // If already completed, show completed state
    if (localStorage.getItem(LESSON_ID + '_awarded') === '1'){
      setProgress(100);
      showCompletedButton(videoContainer.parentElement || videoContainer);
    } else {
      setProgress((elapsed/total)*100);
    }

    // UI: make playButton toggle
    let timerId = null;
    function tick(){
      elapsed++;
      localStorage.setItem(LESSON_ID + '_elapsed', String(elapsed));
      const pct = (elapsed / total) * 100;
      setProgress(pct);
      if (elapsed >= total){
        clearInterval(timerId);
        running = false;
        // show completed and award
        setProgress(100);
        showCompletedButton(videoContainer.parentElement || videoContainer);
        awardCoins();
      }
    }

    function start(){
      if (running) return;
      running = true;
      playButton.innerHTML = '<i class="bi bi-pause-fill"></i>';
      // small visual pulse
      playButton.classList.add('playing');
      timerId = setInterval(tick, 1000);
    }
    function pause(){
      if (!running) return;
      running = false;
      playButton.innerHTML = '<i class="bi bi-play-fill"></i>';
      playButton.classList.remove('playing');
      clearInterval(timerId);
    }

    // click handler
    if (playButton){
      playButton.style.cursor = 'pointer';
      playButton.addEventListener('click', () => {
        // if already finished do nothing
        if (elapsed >= total){
          setProgress(100);
          showCompletedButton(videoContainer.parentElement || videoContainer);
          return;
        }
        running ? pause() : start();
      });
      // keyboard accessibility
      playButton.setAttribute('tabindex','0');
      playButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playButton.click(); }
      });
    }

    // expose pause on page unload to persist
    window.addEventListener('beforeunload', () => {
      if (timerId) clearInterval(timerId);
      localStorage.setItem(LESSON_ID + '_elapsed', String(elapsed));
    });
  })();

})();
