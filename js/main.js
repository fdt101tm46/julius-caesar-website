/* ============================================================
   JULIUS CAESAR — Imperial Portfolio · main.js
   ============================================================ */

/* ── NAV: active link + hamburger + scroll shadow ────────────── */
(function initNav() {
  const nav    = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  const navAs  = document.querySelectorAll('.nav-links a');

  // Mark active link by matching filename
  const file = location.pathname.split('/').pop() || 'index.html';
  navAs.forEach(a => {
    if (a.getAttribute('href') === file) a.classList.add('active');
  });

  // Hamburger toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      const spans = toggle.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    navAs.forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }));
  }

  // Scroll shadow
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('nav--scrolled', window.scrollY > 20);
  }, { passive: true });
})();


/* ── SCROLL REVEAL ───────────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();


/* ── STAGGER GALLERY CAROUSEL ────────────────────────────────── */
(function initGallery() {
  const container = document.getElementById('gc-cards');
  const btnPrev   = document.getElementById('gc-prev');
  const btnNext   = document.getElementById('gc-next');
  if (!container) return;

  const SQRT_5000 = Math.sqrt(5000);

  const items = [
    { title: 'Tusculum Portrait Bust', description: 'One of the most realistic surviving likenesses of Julius Caesar, dated c. 50–40 BC. The bust shows Caesar in middle age with a receding hairline — a detail no Roman artist would include unless ordered to, suggesting authenticity.', caption: 'Archaeological Museum, Turin · c. 50–40 BC', category: 'Portrait', imgSrc: 'gallery/portrait-tusculum.jpg' },
    { title: 'Vercingetorix Surrenders', description: 'Painted by Lionel Royer in 1899, this dramatic work depicts Vercingetorix — the Gaulish chieftain who nearly defeated Caesar — throwing down his weapons at Caesar\'s feet after the decisive Siege of Alesia in 52 BC.', caption: 'Lionel Royer, 1899 · Musée Crozatier, Le Puy-en-Velay', category: 'Battle', imgSrc: 'gallery/vercingetorix.jpg' },
    { title: 'Rome at Caesar\'s Death', description: 'A map of the city of Rome as it stood in 44 BC at the moment of Caesar\'s assassination. The city he had begun transforming from brick to marble — his ambitious building programme left unfinished at the Ides of March.', caption: 'City of Rome · 44 BC', category: 'Rome', imgSrc: 'gallery/rome-44bc.jpg' },
    { title: 'Gallic War Campaigns', description: 'A detailed map tracing Caesar\'s eight years of campaigning across Gaul from 58 to 50 BC. The campaigns brought modern-day France, Belgium, and parts of Germany under Roman control, laying the cultural foundation for Western Europe.', caption: 'Caesar\'s Gallic War Campaigns · 58–50 BC', category: 'Map', imgSrc: 'gallery/gallic-wars-map.svg' },
    { title: 'Silver Denarius — 44 BC', description: 'The silver denarius of Julius Caesar, minted in 44 BC, made him the first living Roman to appear on a coin. The portrait — showing his laurel wreath — was a bold assertion of power that shocked Roman republican tradition.', caption: 'Silver Denarius · First Roman on a coin · 44 BC', category: 'Portrait', imgSrc: 'gallery/denarius.png' },
    { title: 'Siege of Alesia', description: 'Caesar\'s greatest military engineering achievement. At Alesia in 52 BC, he built two parallel fortification walls totalling over 35 km — one containing Vercingetorix, one repelling a relief army of 250,000. He won both battles simultaneously.', caption: 'Siege of Alesia · 52 BC · Caesar\'s Masterpiece', category: 'Battle', imgSrc: 'gallery/siege-alesia.png' },
    { title: 'The Roman Senate', description: 'The Senate of Rome — the institution Caesar spent his life navigating and ultimately overturning. The senators who conspired to kill him feared the end of the Republic. Their act, intended to save it, destroyed it.', caption: 'Cicero Denounces Catiline · Fresco by Cesare Maccari, 1880', category: 'Rome', imgSrc: 'gallery/roman-senate.png' },
    { title: 'Roman Republic — 44 BC', description: 'The extent of the Roman Republic at the time of Caesar\'s death. Caesar\'s campaigns dramatically expanded Roman territory. His heir Octavian would transform this Republic into the Roman Empire — the unintended consequence of the Ides of March.', caption: 'Roman Republic Territory · 44 BC', category: 'Map', imgSrc: 'gallery/roman-republic-map.svg' },
    { title: 'Vatican Portrait Bust', description: 'A marble portrait bust of Julius Caesar housed in the Vatican Museums, Rome. Carved in the 1st century BC, this is one of several claimants to being the most authentic likeness of Rome\'s greatest general and statesman.', caption: 'Portrait Bust · Vatican Museums, Rome · 1st century BC', category: 'Portrait', imgSrc: 'gallery/portrait-vatican.jpg' },
    { title: 'Caesar\'s Rhine Bridge', description: 'An illustration of Caesar\'s famous Rhine Bridge, constructed in just ten days in 55 BC. Caesar crossed into Germanic territory, demonstrated Roman engineering supremacy, then dismantled the bridge — deliberate psychological warfare.', caption: 'Caesar\'s Rhine Bridge · Roman Engineering · 55 BC', category: 'Battle', imgSrc: 'gallery/rhine-bridge.jpg' },
    { title: 'Brutus and the Ghost', description: 'An 1802 engraving depicting Brutus confronted by Caesar\'s ghost before the Battle of Philippi. According to legend, Caesar\'s apparition said: "We shall meet again at Philippi." Brutus died there — and the Republic died with him.', caption: 'Brutus and the Ghost of Caesar · Edward Scriven, 1802', category: 'Rome', imgSrc: 'gallery/brutus-ghost.jpg' },
    { title: 'The Ides of March', description: 'The Death of Caesar by Vincenzo Camuccini (1804–1825). On 15 March 44 BC, senators led by Brutus and Cassius stabbed Caesar 23 times at the Theatre of Pompey. His body lay where it fell for three hours before servants carried it home.', caption: 'La morte di Cesare · Vincenzo Camuccini, 1804–1825', category: 'Portrait', imgSrc: 'gallery/ides-of-march.jpg' },
  ];

  let list     = [...items];
  let cardSize = window.innerWidth >= 640 ? 365 : 290;

  function getPos(i) {
    const n = list.length;
    return n % 2 ? i - (n + 1) / 2 : i - n / 2;
  }

  function buildCard(item, pos) {
    const isCenter = pos === 0;
    const tx  = (cardSize / 1.15) * pos;
    const ty  = isCenter ? -65 : (pos % 2 !== 0 ? 15 : -15);
    const rot = isCenter ? 0   : (pos % 2 !== 0 ? 2.5 : -2.5);

    const card = document.createElement('div');
    card.className = 'gc-card' + (isCenter ? ' gc-card--center' : '');
    card.style.cssText = [
      `width:${cardSize}px`,
      `height:${cardSize}px`,
      `transform:translate(-50%,-50%) translateX(${tx}px) translateY(${ty}px) rotate(${rot}deg)`,
      `z-index:${isCenter ? 10 : 0}`,
      `clip-path:polygon(50px 0%,calc(100% - 50px) 0%,100% 50px,100% 100%,calc(100% - 50px) 100%,50px 100%,0 100%,0 0)`,
      `box-shadow:${isCenter ? '0px 8px 0px 4px rgba(201,168,76,0.35)' : 'none'}`,
    ].join(';');

    card.innerHTML = `
      <span class="gc-corner-cut" style="width:${SQRT_5000}px"></span>
      <img src="${item.imgSrc}" alt="${item.title}" class="gc-img${isCenter ? ' gc-img--center' : ''}" loading="lazy" />
      <div class="gc-overlay ${isCenter ? 'gc-overlay--center' : 'gc-overlay--side'}"></div>
      <div class="gc-badge">${item.category}</div>
      <div class="gc-content">
        <h3 class="gc-title${isCenter ? ' gc-title--center' : ''}">${item.title}</h3>
        ${isCenter
          ? `<p class="gc-desc">${item.description}</p><p class="gc-caption">${item.caption}</p>`
          : `<p class="gc-hint">Click to view</p>`}
      </div>
      ${isCenter ? '<div class="gc-bar"></div>' : ''}`;

    if (pos !== 0) card.addEventListener('click', () => move(pos));
    return card;
  }

  function render() {
    container.innerHTML = '';
    list.forEach((item, i) => container.appendChild(buildCard(item, getPos(i))));
  }

  function move(steps) {
    if (steps > 0) {
      for (let i = 0; i < steps; i++)          list.push(list.shift());
    } else {
      for (let i = 0; i < Math.abs(steps); i++) list.unshift(list.pop());
    }
    render();
  }

  btnPrev && btnPrev.addEventListener('click', () => move(-1));
  btnNext && btnNext.addEventListener('click', () => move(1));

  window.addEventListener('resize', () => {
    const next = window.innerWidth >= 640 ? 365 : 290;
    if (next !== cardSize) { cardSize = next; render(); }
  }, { passive: true });

  render();
})();
